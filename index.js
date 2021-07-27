const { query } = require('express');
const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.API
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome')
})

app.get(`/product/:value`,async(req,res)=>{
    try {
       
        const {value} = req.params;

        console.log(value)

      /*   const amazonresponse = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${value}`) */
        const flipkartresponse = await request(`${baseUrl}&url=https://www.flipkart.com/${value}`)
/*         res.json(JSON.parse(amazonresponse))
        res.send(`--------------------------------------------------------------------------------------`) */
        res.json(JSON.parse(flipkartresponse))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));