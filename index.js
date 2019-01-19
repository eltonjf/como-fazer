
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const categorias = require('./routes/categorias')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async(reqquest, response) => {
    const content = await axios.get('https://como-fazer-pestudo.firebaseio.com/teste.json')
    console.log(content.data)
    response.render('index', { i: content.data })
})

app.use('/categorias', categorias)

app.listen(port, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log("Como-fazer Server is Running...")
    }
})