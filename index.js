const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())


const port = process.env.PORT || 3000


app.get('/', async(reqquest, response) => {
    const content = await axios.get('https://como-fazer-pestudo.firebaseio.com/teste.json')
    console.log(content.data)
    response.render('index', { i: content.data })
})

app.get('/categorias/nova', (req, res) => {
    res.render('categorias/nova')
})

app.post('/categorias/nova', async(req, res) =>{
    await axios.post('https://como-fazer-pestudo.firebaseio.com/teste.json',  {
        categoria: req.body.categoria
    })
    res.send(req.body)
})

app.listen(port, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log("Como-fazer Server is Running...")
    }
})