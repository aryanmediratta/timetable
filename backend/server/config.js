const dotenv = require('dotenv');
dotenv.config();

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

module.exports = {
  backendPort: process.env.BACKEND_PORT,
  uri: process.env.DB_URI,
  connectionParams,
};
