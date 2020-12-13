const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/auth-routes');

require('dotenv').config({
  path: './config/.env'
});

const passportSetup = require('./config/passport-setup'); //runs the new google strategy and now it knows what 'google' strategy is being used in auth-routes

const app = express();

app.use(cors());
app.use(express.json());

//configure for development
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))

  app.use(morgan('dev'))
  // Morgan gives information about each request
  //Cors allows us to connect with react at port 3000 without cross origin request sharing (CORS) issues
}

//setup auth-routes
app.use('/auth', authRoutes);

//setup database
const uri = process.env.ATLAS_URI;
const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }); //for multiple instance of connection we use mongoose.createConnection(), .connect() works fine here too

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
