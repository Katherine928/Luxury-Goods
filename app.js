const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // middleware using app.use
app.use((req, res, next) => {
  console.log('Hello from the middleware❤️');
  next(); // never forget to use next in middleware in case the application stuch on here~
});
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });
  next();
});

// Get the data of bags from file
const bags = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bag-simple.json`)
);

// 2) ROUTE HANDLERS
const getAllBags = (req, res) => {
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

const getBag = (req, res) => {
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

const creatBag = (req, res) => {
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

const updateBag = (req, res) => {
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

const deleteBag = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const creatUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// app.get('/api/v1/bags', getAllBags);
// app.get('/api/v1/bags/:id', getBag);
// app.post('/api/v1/bags', creatBag);
// app.patch('/api/v1/bags/:id', updateBag);
// app.delete('/api/v1/bags/:id', deleteBag);

// 3) ROUTES
const bagRouter = express.Router();
const userRouter = express.Router();

bagRouter.route('/').get(getAllBags).post(creatBag);
bagRouter.route('/:id').get(getBag).patch(updateBag).delete(deleteBag);

userRouter.route('/').get(getAllUsers).post(creatUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/bags', bagRouter); // Middlerware function
app.use('/api/v1/users', userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
