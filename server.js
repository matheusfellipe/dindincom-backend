// const dbCon = require('./db');
const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3333;
const app = express();
const usuarioRota = require('./src/routes/usuario');
const cremosinhoRota = require('./src/routes/cremosinho');
const entregadorRota = require('./src/routes/entregador');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(usuarioRota);
app.use(cremosinhoRota);
app.use(entregadorRota);


app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})

