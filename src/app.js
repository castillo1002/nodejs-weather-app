const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config:
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

// The res.render method allows us to render one of our view files and also specify what data our view should be able to access by using an object in the 2nd argument

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arturo Castillo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is my help message',
        title: 'Help',
        name: 'Arturo Castillo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Arturo Castillo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData, dailyForecast) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address,
                dailyForecast
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Arturo Castillo',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Arturo Castillo',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`The server is up and running on port ${port}`)
})