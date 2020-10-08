const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//define partes para las configurar expresiones
const port=process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// app.get('', (req, res) => {
//     res.send('<h1>Hola express!!!</h1>')

// })
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'frang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me',
        name: 'mi page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        helpTitle: 'aiuda',
        title: 'about',
        name: 'frnag'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitud, longitud, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitud, longitud, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    

    // res.send({
    //     forecasts: 'algo',
    //     localition: 'filadelfia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.buscar) {
        return res.send({
            error: 'la cantio'
        })
    }
    console.log(req.query.buscar)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'frang',
        errorMensage: 'nada hijo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        mane: 'frang',
        errorMensage: 'No funciona la page'
    })
})

app.listen(port, () => {
    console.log('servidor funca en puerto '+port)
})