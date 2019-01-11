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
    res.redirect('/categorias')
})

app.get('/categorias', async(req, res) => {
    const content = await axios.get('https://como-fazer-pestudo.firebaseio.com/teste.json')
    if(content.data){
        const categorias = Object
                                .keys(content.data)
                                .map(key => {
                                    return {
                                        id: key,
                                        ...content.data[key]
                                    }
                                })
        res.render('categorias/index', { categorias: categorias })
    }else{
        res.render('categorias/index', { categorias: [] })
    }
})

app.get('/categorias/excluir/:id', async(req, res) => {
    await axios.delete(`https://como-fazer-pestudo.firebaseio.com/teste/${req.params.id}.json`)
    res.redirect('/categorias')
})

app.post('/categorias/editar/:id', async(req, res) =>{
    await axios.put(`https://como-fazer-pestudo.firebaseio.com/teste/${req.params.id}.json`,  {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
})

app.get('/categorias/editar/:id', async(req, res) => {
    const content = await axios.get(`https://como-fazer-pestudo.firebaseio.com/teste/${req.params.id}.json`)
    res.render('categorias/editar', {
        categoria: {
            id: req.params.id,
            ...content.data
        }
    })
})

app.listen(port, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log("Como-fazer Server is Running...")
    }
})