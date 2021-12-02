const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/sales';

        // middlewares
        this.middlewares();

        // app routes
        this.routes();
        
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // read and parse of body
        this.app.use( express.json() );

        // public directory
        this.app.use( express.static('public') );
        
    }

    routes() {
        this.app.use( this.userPath, require('../routes/sales.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'running server at port: http://localhost:'+this.port );
        });
    }

}

module.exports = Server;
