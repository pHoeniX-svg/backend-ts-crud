import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { connectDB, corsOptions } from './config';
import { credentials, errorHandler, logger, verifyJWT } from './middleware';

dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

connectDB();

//custom middleware logger
app.use(logger);

// handle options credentials check - before CORS!!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle json data
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
} else {
  // serve static files from the public directory
  app.use('/', express.static(path.join(__dirname, '/public')));
}

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(colors.enabled);
  console.log(
    `Connected to MongoDB: ${mongoose.connection.host}`.cyan.underline
  );
  console.log(`NODE_ENV=${process.env.NODE_ENV}`.yellow.bold);

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
