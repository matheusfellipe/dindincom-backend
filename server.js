// const dbCon = require('./db');
const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3333;
const app = express();
const routes = require('./src/routes/usuario')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(routes)


app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})

