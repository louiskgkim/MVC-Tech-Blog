const path = require('path');
require('dotenv').config();

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 
  cookie: 
  resave: 
  saveUninitialized: 
  store: 
    db:
  })
};

// sets up express app
const app = express();
const PORT = process.env.PORT || 3001;
