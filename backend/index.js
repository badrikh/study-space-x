const express = require('express');
const app = express();

const menuRoutes = require('./routes/menuRoutes.js');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/menu', menuRoutes);
app.use('/user', userRoutes);

let port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});