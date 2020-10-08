const request = require('postman-request')

const forecast = (lat, log, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb9cca97e2da5d70e41ed2b30b17556c&query=' + lat + ',' + log + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('No hay conexion a internet', undefined)
        } else if (body.error) {
            callback('No se encontro la localizacion', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' Temperatura: ' + body.current.temperature + ' Feelslike: ' + body.current.feelslike+' humedad: '+body.current.humidity+'%')
        }
    })
}

module.exports = forecast