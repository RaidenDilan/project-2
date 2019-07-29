// const dotenv = require('dotenv');
// dotenv.config();
// console.log(`Your OPENWEATHER_API_KEY is ${process.env.OPENWEATHER_API_KEY}`); // 8626

const port 					= process.env.PORT || 3000;
const env 					= process.env.NODE_ENV || 'development';
const dbURI 				= process.env.MONGODB_URI || `mongodb://localhost/project-2-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';
// const apiKey        = dotenv.config('OPENWEATHER_API_KEY');
// console.log('apiKey ------------', apiKey);

module.exports = { port, env, dbURI, sessionSecret };
