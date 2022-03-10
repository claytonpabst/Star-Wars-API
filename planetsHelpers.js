const axios = require('axios');

const {getAllPeople} = require('./peopleHelpers');

async function replaceResidentURLsWithNames(swPlanets) {
  const swPeople = await getAllPeople();

  return swPlanets.map((planet) => {
    planet.residents = planet.residents.map((residentURL) => {
      const person = swPeople.find((person) => {
        return person.url === residentURL;
      })
      return person.name;
    })
    return planet;
  })
}

async function getAllPlanets() {
  let planets = [];

  await (async function getNextPage(page = 1){
    let {data} = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
    planets.push(...data.results);
    console.log(planets.length);
    if(data.next) return await getNextPage(page += 1);
    return;
  })()

  return planets;
}

module.exports = {
  getAllPlanets,
  replaceResidentURLsWithNames
}