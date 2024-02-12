// Import the necessary modules
const express = require('express');
const { join } = require('path');
const { create } = require('express-handlebars');
const { Store } = require('connect-session-sequelize')(require('express-session'));
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize an instance of express
const app = express();
// Set the port to the environment variable PORT or default to 3001
const PORT = process.env.PORT || 3001;

// Configure the session object
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the session middleware
app.use(require('express-session')(sess));
// Parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Set up Handlebars.js as the default templating engine, with custom helpers
app.engine('handlebars', create({ helpers }).engine);
app.set('view engine', 'handlebars');

// Use the routes defined in the 'controllers' directory
app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});