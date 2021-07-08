const express = require('express');
const { APP_PORT, DB_URL } = require('./config');
const { errorHandler } = require('./middlewares/errorHandler');
const { router } = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false })
const db = mongoose.connection;
db.on('error', ()=> {
    console.log(new Error('error while connection'))
})
db.once('open', ()=> {
    console.log('Database Connected')
})

const app = express();
app.use(express.json());
app.use('/api' , router);


app.use(errorHandler)
app.listen(APP_PORT , ()=>{
    console.log('Listeing on port',APP_PORT);
})