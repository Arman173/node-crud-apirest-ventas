require('dotenv').config();
const mongoose = require('mongoose');
const Server = require('./models/server');

const server = new Server();


/***  CONECTAMOS LA APLICACION DE NODE CON NUESTRA BASE DE DATOS DE MONGODB  ***/

mongoose.Promise = global.Promise;
// en la url de mongodb, el puerto del localhost por defecto de mongo es el "27017"
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then( () => {
        console.log("Conexion a la base de datos establecida con exito!");

        // Creacion del servidor
        server.listen();

    })
    .catch( err => console.log( err ) );

/***  ---------------------------------------------------------------------  ***/
