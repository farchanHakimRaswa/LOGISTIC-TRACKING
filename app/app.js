const {
    express,
    cors,
    logger,
    path,
    fs
} = require('./include')

const {

    staffRouter,
    locationRouter,
    customerRouter,
    koliRouter,
    connoteRouter,
    packageRouter

} = require('./routes/index')

const { handlePathNotFound } = require('./constant')

// Initialize watchers
require('./utils/watcher')

// Initialize DB
require('./database')

// Initalize app
const app = express();

app.use(cors())
app.disable('etag');

/**
 * Log to console then log to file: access.log
 * 
 * Did not log to console in production
 */
if (process.env.NODE_ENV !== 'production') app.use(logger('dev'));
app.use(logger('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/staff', staffRouter);
app.use('/location', locationRouter);
app.use('/customer', customerRouter);
app.use('/koli', koliRouter);
app.use('/connote', connoteRouter);
app.use('/package', packageRouter);
app.use('*', handlePathNotFound)



app.use((err, req, res, next) => {
    res.status(500).json({ pesan: "Terjadi kesalahan: " + err.message });
})

module.exports = app;