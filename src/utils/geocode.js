
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZnJhbmdtIiwiYSI6ImNrZnVqcmFuYjBrbm4ycm1mdnYweG5rMzAifQ.6APfZt6LmIaav_P3crrdrQ'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('No hay internet', undefined)

        } else if (body.features.length === 0) {
            callback('Mala longitud', undefined)
        } else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode