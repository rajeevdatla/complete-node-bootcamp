const fs = require('fs');
const shortId = require('shortid');

const tourData = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      Message: 'Invalid Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.price) {
    return res.status(404).json({
      status: 'Error',
      Message: 'name,price are mandatory fields!',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tours: tourData,
        },
    });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tourData.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  res.status(204).json({
    status: 'Success',
    message: `Delete ID(${id}) successfull!`,
    data: null,
  });
};
