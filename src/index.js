const express = require('express');
const morgan = require('morgan');
const path = require('path'); //para unir directorios
const {mongoose} = require('./database');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000); //para manipular el puerto en otros entornos sino 3000

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); //para enviar y recibir datos json

//Router
app.use('/api/tareas', require('./routes/tarea.routes'));//peticiones http

//Static files
app.use(express.static(path.join(__dirname, 'public')));//para ubicar el archivo static que esta en la carpeta public

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`El servidor escuchando en el puerto ${app.get('port')}`);
})