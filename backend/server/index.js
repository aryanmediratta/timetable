const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express!!!' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  const data = {
    text: req.body.post,
  };
  saveDataInDatabase('testing-db', 'testing-db', data);
  res.send({
    success: true,
    message: `I received your POST request. This is what you sent me: ${req.body.post}`,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));