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

// handle oprions credentials check - before CORS!!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle json data
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
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
  console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
