const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database;
connectDB();
app.get('/', (req, res) => {
  res.send('Hello');
});

//Init Middleware
app.use(express.json({
  extended: false
}));

//Define Routes
app.use('/api/users', require('./route/api/users'));
app.use('/api/profile', require('./route/api/profile'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/posts', require('./route/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});