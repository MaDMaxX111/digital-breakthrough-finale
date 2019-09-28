const fs = require('fs');
const axios = require('axios');
const json = JSON.parse(fs.readFileSync('./parinatolis.json', 'utf8'));

const apiKey = 'd6275b07-cf2c-4573-8c0d-84e41030cb36';
// console.log(json);
(async function () {

    const saveRes = (res, name) => {
        fs.writeFileSync("./cliniks/" + name, res)
    }

    const parseItem = async (addres, name) => {
        // const href = `https://geocode-maps.yandex.ru/1.x/;

        const url = `https://geocode-maps.yandex.ru/1.x/apikey=${encodeURI(apiKey)}&geocode=${addres}&format=json`;

        let options = {
            url,
            method: 'get',
            responseType: "stream",
        }

        console.log(url);
        axios(options).then(function (response) {
            response.data.pipe(fs.createWriteStream('./addressInfo/' + name + '.html'));
        });
    }

    json.forEach((item, index) => {
        index === 0 && parseItem('423812 ТАТАРСТАН РЕСПУБЛИКА ГОРОД НАБЕРЕЖНЫЕ ЧЕЛНЫ ПРОСПЕКТ МИРА 2', index);
    })
}());
