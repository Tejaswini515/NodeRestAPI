const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Country = require('../models/country');

router.get('/', (req,res,next)=> {
    Country.find()
           .exec()
           .then((result) => {
                res.status(200).json(result);
           })
           .catch(err => {
               res.status(500).json({error: err});
           });
});

router.post('/', (req,res,next)=> {
    const country = new Country({
        _id: new mongoose.Types.ObjectId(),
        countryName: req.body.countryName,
        continent: req.body.continent
    });
    country.save()
    .then(result => {
        res.status(200).json({
            message: 'Country Added by POST Request',
            countryAdded: country
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err,
        });
    });
});

router.get('/:countryId', (req,res,next)=> {
    const id = req.params.countryId;
    Country.findById({_id: id})
           .exec()
           .then((result) => {
                res.status(200).json(result);
           })
           .catch(err => {
               res.status(500).json({error: err});
           });
});

router.put('/:countryId', (req,res,next)=> {
    const id = req.params.countryId;

    Country.update({_id: id}, {$set: {countryName: req.body.countryName }})
           .exec()
           .then((result) => {
                res.status(200).json(result);
           })
           .catch(err => {
               res.status(500).json({error: err});
           });
});

router.delete('/:countryId', (req,res,next)=> {
    const id = req.params.countryId;
    Country.remove({_id: id})
            .exec()
            .then((result) => {
                    res.status(200).json(result);
                })
            .catch(err => {
                res.status(500).json({error: err});
            });
});


module.exports = router;

