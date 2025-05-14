require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./routes');

require('./jobs/processFile');

app.use(cors());
app.use(helmet());

// api logger for dev environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// middlewares: body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on the port: ${PORT}`);
});
