const fs = require('fs');
const axios = require('axios');


const json = JSON.parse(fs.readFileSync('./parinatolis.json', 'utf8'));

// console.log(json);
(async function () {

    const saveRes = (res, name) => {
        fs.writeFileSync("./cliniks/" + name, res)
    }

    const parseItem = async (href, name) => {
        axios({
            method: "get",
            url: href,
            responseType: "stream"
        }).then(function (response) {
            response.data.pipe(fs.createWriteStream('./cliniks/' + name + '.html'));
        });
    }

    json.forEach((item, index) => {
        parseItem(item.href, index);
    })
}());
