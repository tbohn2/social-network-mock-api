const { connect, connection } = require('mongoose');

// Creates connection string for mongo database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

// Mongoose function to connect to database
connect(connectionString);

module.exports = connection;
