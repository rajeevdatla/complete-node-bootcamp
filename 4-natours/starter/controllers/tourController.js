const fs = require('fs');

const tourData = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

exports.deleteTour = (req, res) => {
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
