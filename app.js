const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/users', require('./routes/users-route'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
