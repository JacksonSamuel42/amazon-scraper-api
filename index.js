const express = require('express')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = `435cb63024169f3d3057318f46559006`;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to amazon scrapper api')
})

// Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err);
    }
})

// Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err);
    }
})

// Get Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err);
    }
})

// Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err);
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))