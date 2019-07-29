const port 					= process.env.PORT || 3000;
const env 					= process.env.NODE_ENV || 'development';
const dbURI 				= process.env.MONGODB_URI || `mongodb://localhost/project-2-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';
const apiKey        = process.env.OPENWEATHER_API_KEY;

module.exports = { port, env, dbURI, sessionSecret, apiKey };
