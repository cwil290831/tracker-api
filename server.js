require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');


// eslint-disable-next-line import/extensions
const { connectToDb } = require('./db.js');
// eslint-disable-next-line import/extensions
const { installHandler } = require('./api_handler.js');
// eslint-disable-next-line import/extensions
const auth = require('./auth.js');

const app = express();

app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());