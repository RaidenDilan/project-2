const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@resorts.tszio.mongodb.net/${process.env.DB_NAME}-${env}?retryWrites=true&w=majority`;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';
const dbOPS = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = { port, env, dbURI, dbOPS, sessionSecret };
