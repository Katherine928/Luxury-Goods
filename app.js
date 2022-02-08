const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const bags = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bag-simple.json`)
);
app.get('/api/v1/bags', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: bags.length,
    data: {
      bags: bags,
    },
  });
});

app.post('/api/v1/bags', (req, res) => {
  const newId = bags[bags.length - 1].id + 1;
  const newBag = Object.assign({ id: newId }, req.body);
  bags.push(newBag);

  fs.writeFile(
    `${__dirname}/dev-data/data/bag-simple.json`,
    JSON.stringify(bags),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          bag: newBag,
        },
      });
    }
  );
});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
