const path = require('path');
const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Routes = require('hapi-routes');
const HapiAuthCookie = require('hapi-auth-cookie');
const EJS = require('ejs');
const mongoose = require('mongoose');

const routesPath = path.resolve(__dirname, 'routes', 'api');
const publicPath = path.resolve(__dirname, 'client', 'public');
const srcPath = path.resolve(__dirname, 'client', 'src');

const keys = require('./config/keys');

const db = keys.mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: {
    files: {
      relativeTo: publicPath
    }
  }
});

const provision = async () => {
  await server.register([
    Inert,
    Vision,
    HapiAuthCookie,
    {
      plugin: Routes,
      options: {
        dir: `${routesPath}/*`
      }
    }
  ]);

  server.views({
    engines: { ejs: EJS },
    relativeTo: srcPath,
    path: 'views'
  });

  server.auth.strategy('simple-cookie-strategy', 'cookie', {
    cookie: 'bsocial-cookie',
    password: keys.secret,
    isSecure: false
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return h.view('landing');
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.'
      }
    }
  });

  await server.start();
  console.log(`Server currently running on port ${server.settings.port}`)
};

provision();