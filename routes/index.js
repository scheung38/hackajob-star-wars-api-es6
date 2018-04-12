var express = require('express');
var router = express.Router();

// getContent('https://challenges.hackajob.co/swapi/api/films')
// https://challenges.hackajob.co/swapi/api/films/?format=json
// https://challenges.hackajob.co/swapi/api/people/?format=json

const getContent = async function (url) {

    return await new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code ' + response.statusCode));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        });
        request.on('error', (err) => reject(err))
    })
};

function run(film_title, character) {

    let res1 = getContent('https://challenges.hackajob.co/swapi/api/films/?format=json')
        .then(films => JSON.parse(films))
        .then(res_films => res_films['results'].filter(function (el) {
            if (el['title'] === film_title) {
                return console.log(el['characters'])
            }
        }))
        .catch(err => console.error(err));

    let res2 = getContent('https://challenges.hackajob.co/swapi/api/people/?format=json')
        .then(people => JSON.parse(people))
        .then(res_people => res_people['results'].filter(function (el) {
            if (el['name'] === character) {
                return console.log(el['films'])
            }
        }))
        .catch(err => console.error(err));

    return Promise.all([res1, res2]);
}

film_list = ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"];
character_list = ["Luke Skywalker", "C-3PO", "R2-D2", "Darth Vader", "Leia Organa", "Raymus Antilles", "Poggle the Lesser"];

console.log(run(film_list[2], character_list[4]));

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({ 'name': 'Zahara', 'age': 0, 'color': 'pink' })
});


module.exports = router;
