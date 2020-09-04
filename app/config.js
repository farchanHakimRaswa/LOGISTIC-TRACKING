require('custom-env').env(true)

if (process.env.NODE_ENV == 'development') {
    console.log('\x1b[33m%s\x1b[0m', "# Please add `127.0.0.1 mongo-primary mongo-worker-1 mongo-worker-2` in your hosts file.")
    console.log('\x1b[33m%s\x1b[0m', "/etc/hosts (Linux/Mac)\nc:\\Windows\\System32\\Drivers\\etc\\hosts (Windows)")
    console.log('\x1b[33m%s\x1b[0m', "\n# If it is the first time you are running development server, then you must wait some time more to wait for database to be seeded fully.")
    console.log('\x1b[33m%s\x1b[0m', "# For more verbose log, you can run `docker ps` and check if the cluster is healthy")
}

module.exports = {
    SECRET: process.env.SECRET,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    LIS_SHARED_FOLDER: process.env.LIS_SHARED_FOLDER,
    URL: `http://${process.env.HOST}:${process.env.PORT}`,
    UPLOAD_PATH: process.env.UPLOAD_PATH,
};