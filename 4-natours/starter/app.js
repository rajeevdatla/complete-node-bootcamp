const fs = require('fs');
const express = require('express');
const shortId = require('shortid');
const morgan = require('morgan');

const app = express();

//Middleware
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Route Handeller

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tours: tourData,
    },
  });
};

const getTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      Message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newTour = Object.assign({ id: shortId.generate() }, req.body);
  tourData.push(newTour);
  console.log(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tourData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      Message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      Message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'Success',
    message: `Delete ID(${id}) successfull!`,
    data: null,
  });
};

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Router

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(8000, () => {
  console.log('Server Started!');
});
