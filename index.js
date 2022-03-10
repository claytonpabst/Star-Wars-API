// require('dotenv').config()
const express = require('express');

const {setSortByValue, sortPeople, getAllPeople} = require('./peopleHelpers');
const {getAllPlanets, replaceResidentURLsWithNames} = require('./planetsHelpers');

const app = module.exports = express();

app.use(express.json());

app.get('/people/:sortBy?', async (req, res) => {
  try {
    let sortBy = setSortByValue(req);
    let swPeople = await getAllPeople();
    swPeople = sortPeople(swPeople, sortBy);

    res.status(200).send(swPeople);
  }
  catch (err) {
    console.log(err);
  }
});

app.get('/planets', async (req, res) => {
  try {
    let swPlanets = await getAllPlanets();
    swPlanets = await replaceResidentURLsWithNames(swPlanets);
    
    res.status(200).send(swPlanets);
  }
  catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
    console.log('server running');
})