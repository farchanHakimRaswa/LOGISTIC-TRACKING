#!/bin/bash

set -eEo pipefail

if [[ -z $1 ]]; then
  ARG1="start"
else
  ARG1=$1
fi

MONGO="/usr/bin/mongo"
MONGO_RESTORE="/usr/bin/mongorestore"

NODE_COUNT=0
for VAR in $(env | sort); do
  env_var=$(echo "$VAR" | sed -r "s/(.*)=.*/\1/g")
  env_host=$(echo "$VAR" | sed -r "s/.*=(.*):([0-9]+)/\1/g")
  env_port=$(echo "$VAR" | sed -r "s/.*=(.*):([0-9]+)/\2/g")
  if [[ $env_var =~ ^MONGO([0-9]+) ]]; then
    NODE_COUNT=$(($NODE_COUNT + 1))
    NODE_HOSTS[$NODE_COUNT]="${env_host}"
    NODE_PORTS[$NODE_COUNT]="${env_port}"
    if [[ $NODE_COUNT -eq 1 ]]; then
      PRIMARY_HOST=${env_host}
      PRIMARY_PORT=${env_port}
    fi
  fi
done

export NODE_HOSTS
export NODE_PORTS

case $ARG1 in
start)
  if [[ $NODE_COUNT -lt 1 ]]; then
    echo "At least one Mongo node must be defined in container links, starting with \"MONGO1\" for the primary node and continuing with \"MONGO2\", etc. for secondaries."
    exit 1
  fi
  if [[ -z "$REPLICASET" ]]; then
    echo "The name of the replica set must be defined with the \"REPLICASET\" environment variable"
    exit 1
  fi

  # Define the command that will connect the mongo shell to the primary node ...
  PRIMARY_MONGO="$MONGO --host $PRIMARY_HOST --port $PRIMARY_PORT --authenticationDatabase admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}"

  # Wait for the nodes to become available ...
  echo "Testing connection to MongoDB primary node at ${PRIMARY_HOST}:${PRIMARY_PORT} ..."
  TRY_COUNT=1
  until $PRIMARY_MONGO --eval db; do
    echo "Trying ${TRY_COUNT} ..."
    TRY_COUNT=$(($TRY_COUNT + 1))
  done

  # See if the replica set is not set up ...
  rsStatus=$($PRIMARY_MONGO --eval "rs.status()")
  if [[ $rsStatus =~ "no replset config has been received" ]]; then
    # Set up the replica set configuration document ...
    echo "Using MongoDB primary node to initiate replica set \"${REPLICASET}\" with:"
    CONFIGVAR="config= {_id: \"${REPLICASET}\", members:[ "
    hostNum=1
    while [[ $hostNum -le $NODE_COUNT ]]; do
      hostAndPort="${NODE_HOSTS[$hostNum]}:${NODE_PORTS[$hostNum]}"
      if [[ $hostNum -eq 1 ]]; then
        priority=2
        echo "- primary node:   ${hostAndPort}"
      else
        priority=1
        echo "- secondary node: ${hostAndPort}"
        CONFIGVAR="${CONFIGVAR},"
      fi
      CONFIGVAR="${CONFIGVAR} {_id: ${hostNum}, host: \"${hostAndPort}\", priority: ${priority} }"
      hostNum=$hostNum+1
    done
    CONFIGVAR="${CONFIGVAR} ] }"

    # Initiate the replica set with our document ...
    until [ $($PRIMARY_MONGO --eval "rs.status().ok" | tail -1) == "1" ]; do
      $PRIMARY_MONGO --eval "${CONFIGVAR};rs.initiate(config);"
    done
  else
    echo "Replica set \"${REPLICASET}\" is already initiated."
  fi
  echo ""
  echo "Replica set is ready"
  echo ""

  # Setup init DB
  echo "Setting up initial database user and password!"
  REPLICA_COMMAND="$MONGO --host $REPLICASET/$PRIMARY_HOST:$PRIMARY_PORT --authenticationDatabase admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD}"
  $REPLICA_COMMAND <<EOF
  use sim_rs
  db.createUser(
        {
            user: "${MONGO_USERNAME}",
            pwd: "${MONGO_PASSWORD}",
            roles: [
                {
                    role: "readWrite",
                    db: "${MONGO_DATABASE}"
                }
            ]
        }
);
EOF
  # Seeding
  echo "Seeding database ..."
  $MONGO_RESTORE --host $REPLICASET/$PRIMARY_HOST:$PRIMARY_PORT --authenticationDatabase admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --db sim_rs /seed
  
  exit 0
  ;;
esac

exec "$@"
