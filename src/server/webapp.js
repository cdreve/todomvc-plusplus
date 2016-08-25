'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');

const addHeaderShenanigans = require('./middleware/add-header-shenanigans');
const removeHeaderPoweredBy = require('./middleware/remove-header-powered-by');

let app = express();

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('x-powered-by', false); -- Better solution
// app.disable('x-powered-by'); -- Even Better solution

// Configure middleware
app.use(morgan('combined'));

app.use(addHeaderShenanigans);
app.use(removeHeaderPoweredBy);

app.use(bodyParser.urlencoded({ extended: false }));

// Static file serving happens everywhere but in production
if (process.env.NODE_ENV !== 'production') {
  let staticPath = path.join(__dirname, '..', '..', 'public');
  app.use('/static', express.static(staticPath));
}

// Mount application routes
routes(app);

// Export Express webapp instance
module.exports = app;
