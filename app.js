const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send("There's nothing header, go to /users/")
});

app.use('/users', require('./routes/users-route'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
