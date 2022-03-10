const axios = require('axios');

function setSortByValue(req) {
  let sortBy = null;

  if(req.query.sortBy){
    sortBy = req.query.sortBy;
  }

  if(req.params.sortBy){
    sortBy = req.params.sortBy;
  }

  return sortBy
}

function sortPeople(people, sortBy) {
  if(!sortBy) return people;

  if(sortBy === "mass" || sortBy === "height") {
    return people.sort(function(a, b) { 
      return a[sortBy] - b[sortBy];
    })
  }

  if(sortBy === "name") {
    return people.sort(function(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
  }
}

async function getAllPeople() {
  let people = [];

  await (async function getNextPage(page = 1){
    let {data} = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    people.push(...data.results);
    console.log(people);
    if(data.next) return await getNextPage(page += 1);
    return;
  })()

  return people;
}

module.exports = {
  setSortByValue,
  sortPeople,
  getAllPeople
}