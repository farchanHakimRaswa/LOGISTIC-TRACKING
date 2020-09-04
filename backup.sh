#!/bin/bash
# How to use
# Run crontab -e and add this entry
# 0 0 * * * /path/to/this/file/backup.sh
#
# That command means to backup every 00:00 midnight

echo "Making backup directory in $HOME/backups..."
mkdir -p $HOME/backups

echo "Dumping from database..."
docker exec mongo-primary sh -c 'exec mongodump -u sim_rs -p 7HAaupVcRSRLRz45HYHsTM -d sim_rs --archive --gzip' >$HOME/backups/backups-$(date +"%F").gz

echo "Uploading backups to remote database..."
# mongorestore --uri "URI" --archive --gzip <$HOME/backups/backups-$(date +"%F").gz
