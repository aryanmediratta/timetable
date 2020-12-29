const dotenv = require('dotenv');
dotenv.config();

// This is to fetch value of constants from .env file.

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

module.exports = {
  backendPort: process.env.BACKEND_PORT,
  uri: process.env.DB_URI,
  secretToken: process.env.TOKEN_SECRET,
  connectionParams,
};
