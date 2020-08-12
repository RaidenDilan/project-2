// require our modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const { port, env, dbURI, dbOPS, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

// create an express app
const app = express();

// set up out template engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// set up our static files folder
app.use(express.static(`${__dirname}/public`));

// connect to our database
mongoose
  .connect(dbURI, dbOPS)
  .then(res => console.log('DB Connected'))
  .catch(err => console.log('Db Connection Failed '));

// set up middleware
if (env !== 'test') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// set up our sessions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// set up flash message AFTER sessions
app.use(flash());

// set up custom middleware - requires flash
app.use(customResponses);

// set up authentication middleware - requires flash
app.use(authentication);

// set up our routes - just BEFORE our error handler
app.use(routes);

// set up errorHandler - our LAST peie of middleare
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening to port ${port}`));
