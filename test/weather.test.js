const sendHttpRequest = require('../sendHttpRequest');
const axios = require('axios');
const oneHourJsonSchema = require('../testData/oneHourSchema.json');
const alertsSchema = require('../testData/alertsSchema.json');
const hourlySchema = require('../testData/hourlySchema.json');
const currentSchema = require('../testData/currentSchema.json');


describe('new tests', () => {

    let response;
//1 Hour / Minutely Forecast (Nowcast)
    test('1 Hour / Minutely Forecast (Nowcast) - Check status code', async () => {
        response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely', {
                params: {lat: '35.5', lon: '-78.5'},
                headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        })
        await expect(response.status).toEqual(200);
    });

    // По ходу в этом тесте постоянно меняется json схема, потому что если сгенерить схему и сразу
    // же тест заранать, то он успешно пройдет; а если еще раз запустить его через пару минут, то тест зафейлится
    test('1 Hour / Minutely Forecast (Nowcast) - Json schema validation', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf);
        await expect(response).toBeValidSchema(oneHourJsonSchema);
    })

    test('1 Hour / Minutely Forecast (Nowcast) - 403 error', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '-'
                }
        }
        response = await sendHttpRequest(conf, 'GET');
        await expect(response).toBeValidStatusCode(403);
        await expect(response.data.message).toEqual('You are not subscribed to this API.');
    })


// Severe Weather Alerts
    test('Severe Weather Alerts - Check status code', async () => {
        response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/alerts', {
                params: {lat: '35.5', lon: '-78.5'},
                headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        })
        await expect(response.status).toEqual(200);
    });

    test('Severe Weather Alerts - Json schema validation', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/alerts',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf);
        await expect(response).toBeValidSchema(alertsSchema);
    })

    test('Severe Weather Alerts - 403 error', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/alerts',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '-'
                }
        }
        response = await sendHttpRequest(conf, 'GET');
        await expect(response).toBeValidStatusCode(403);
        await expect(response.data.message).toEqual('You are not subscribed to this API.');
    })


// 120 Hour Forecast
    test('120 Hour Forecast - Check status code', async () => {
        response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly', {
                params: {lat: '35.5', lon: '-78.5'},
                headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        })
        await expect(response.status).toEqual(200);
    });

    test('120 Hour Forecast - Json schema validation', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf);
        await expect(response).toBeValidSchema(hourlySchema);
    })

    test('120 Hour Forecast - 400 error', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: '35.5blabla', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf, 'GET');
        await expect(response).toBeValidStatusCode(400);
        await expect(response.data.error).toEqual('Invalid lat/lon supplied.');
    })

// Current Weather Data of a location
    test('Current Weather Data of a location. - Check status code', async () => {
        response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/current', {
                params: {lat: '35.5', lon: '-78.5'},
                headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        })
        await expect(response.status).toEqual(200);
    });

    test('Current Weather Data of a location. - Json schema validation', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {lat: '35.5', lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf);
        await expect(response).toBeValidSchema(currentSchema);
    })

    test('Current Weather Data of a location. - 400 error', async() => {
        const conf = {
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {lon: '-78.5'},
            headers: {
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                    'X-RapidAPI-Key': '1290691584mshd4aab12ad62957ep17f125jsn7a1f40b5395a'
                }
        }
        response = await sendHttpRequest(conf, 'GET');
        await expect(response).toBeValidStatusCode(400);
        await expect(response.data.error).toEqual('Invalid Parameters supplied.');
    })
});