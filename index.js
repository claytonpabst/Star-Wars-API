// require('dotenv').config()
const express = require('express');

const {setSortByValue, sortPeople, getAllPeople} = require('./peopleHelpers');
const {getAllPlanets, replaceResidentURLsWithNames} = require('./planetsHelpers');

const app = module.exports = express();

app.use(express.json());

app.get('/people/:sortBy?', async (req, res) => {
  try {
    let sortBy = setSortByValue(req);
    let people = await getAllPeople();
    people = sortPeople(people, sortBy);

    res.status(200).send(people);
  }
  catch (err) {
    console.log(err);
  }
});

app.get('/planets', async (req, res) => {
  try {
    let planets = await getAllPlanets();
    planets = await replaceResidentURLsWithNames(planets);
    
    res.status(200).send(planets);
  }
  catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
    console.log('server running');
})