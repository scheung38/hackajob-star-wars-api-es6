var express = require('express');
var router = express.Router();

const getContent = async function (url) {

    // filmsAndCharacters = null
    // return filmsAndCharacters;

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


// getContent('https://challenges.hackajob.co/swapi/api/films')
// https://challenges.hackajob.co/swapi/api/films/?format=json
// https://challenges.hackajob.co/swapi/api/people/?format=json
async function run(film_title, character) {

    // const descriptor1 = Object.getOwnPropertyDescriptor(object1, film);

    let res1 = await getContent('https://challenges.hackajob.co/swapi/api/films/?format=json')
    // .then(films => console.log("this is films html :", Object.getOwnPropertyDescriptor(films['results'][0]['characters'], film_title).value))
        .then(films => JSON.parse(films))
        .then(res => console.log("typeof :", typeof(res['results'][0])))
        // .then(res => res['results'].forEach(function (res) {
        //     if (['results'][0]['title'] === film_title) {
        //         console.log("filtered output ", res['results'][0]['characters'])
        //     }
        //
        // }))
        // // .then(res => console.log("parsed characters in this film :", res))
            .catch(err => console.error(err))

    let res2 = await getContent('https://challenges.hackajob.co/swapi/api/people/?format=json')
        .then(people => JSON.parse(people))
        .then(res => res['results'].forEach(res['results'][0]['name'] === character ? res['results'][0]['films'] : null))
        .then(res => console.log("parsed film this character appeared in :", res))
        .catch(err => console.error(err))

    return await Promise.all([res1, res2]);
//
}

film_list = ["A New Hope", "The Empire Strikes Back", "The Force Awakens"];
character_list = ["Luke Skywalker", "Raymus Antilles", "Poggle the Lesser"]
console.log(run(film_list[1], character_list[0]));


/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({ 'name': 'Zahara', 'age': 0, 'color': 'pink' })
});


module.exports = router;
