const fs = require('fs');

const bags = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/bag-simple.json`)
);

exports.getAllBags = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    result: bags.length,
    data: {
      bags: bags,
    },
  });
};

exports.getBag = (req, res) => {
  const id = req.params.id * 1;
  const bag = bags.find((el) => el.id === id);
  if (!bag) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      bag,
    },
  });
};

exports.creatBag = (req, res) => {
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
};

exports.updateBag = (req, res) => {
  console.log(req.params.id);
  if (req.params.id * 1 > bags.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      bag: '<Updated bag here...>',
    },
  });
};

exports.deleteBag = (req, res) => {
  console.log(req.params.id);
  if (req.params.id * 1 > bags.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
