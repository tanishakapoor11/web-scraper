const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors())

const url = 'https://www.wionews.com/'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            
            $('.thumb-box', html).each(function() {
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))