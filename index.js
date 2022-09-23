// Dependencies to install:
// $ npm install node-fetch --save

require('dotenv').config();

const fetch = require('node-fetch');

async function sendSecretMessage() {
    const morse_options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const original_message = "hey%20secret%20agent%20x%20this%20is%20your%20message%20from%20the%20future";
    const morse_endpoint = "https://api.funtranslations.com/translate/morse.json?text=" + original_message

    const morse_response = await fetch(morse_endpoint, morse_options)
    // .then(response => response.json())
    // .then(response => console.log(response.contents.translated))
    // .catch(err => console.error(err));
    const translation = await morse_response.json();
    const message = translation.contents.translated
    console.log(message)

    const courier_options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.APIKEY,
        },
        body: JSON.stringify({
            "message": {
                "to": {
                    "email": process.env.EMAIL,
                    "phone_number": process.env.PHONENUMBER
                },
                "content": {
                    "title": "Codementor Workshop",
                    "body": message
                },
                "data": {
                    "name": "Vrushali"
                },
                "routing": {
                    "method": "all",
                    "channels": ["email", "sms"]
                }
            }
        })
    };

    fetch('https://api.courier.com/send', courier_options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    // console.log(response);
}

sendSecretMessage();
