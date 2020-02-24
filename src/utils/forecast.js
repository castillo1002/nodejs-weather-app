const request = require('request')

const forecast = (lat, long, callback) => {
    url = `https://api.darksky.net/forecast/772f03f5ba7c5acb93e1997e37edc66a/${lat},${long}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Cannot reach weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location, try again', undefined)
        } else {
            console.log(body)
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees, with a %${body.currently.precipProbability} chance of rain.
            The humidity is ${body.currently.humidity * 100}
            The daily forecast: ${body.daily.summary}`)
        }
    })
}

module.exports = forecast