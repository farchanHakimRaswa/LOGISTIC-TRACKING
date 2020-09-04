const { mongoose } = require('./include')

//* Connection String For MongoDB Atlas 
const { MONGO_URL } = require('./config')

// Reconnect Timeout
const reconnectTimeout = 5000;

const connect = () => {
    mongoose.connect(MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).catch(err => { })
}

const db = mongoose.connection;

db.on('connecting', () => {
    console.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.info('Connected to MongoDB!');
    console.info('Database: ' + MONGO_URL);
});

db.once('open', () => {
    console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
    console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
    console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
});

connect()