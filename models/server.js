const express = require('express')
const cors = require('cors')
const Socket = require("./socket");
const http = require("http");
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        // this.luxandPath = '/api/luxand';
        this.chatgpt = '/api/chatgpt';
        this.vision = '/api/vision';
        this.auth = '/api/auth'
        this.reclamos = '/api/reclamos'
        this.funcionarios = '/api/funcionarios'
        //Middlewares
        this.middlewares();
        //socket
        this.ServerSocket();
        //rutas
        this.routes();
    }

    middlewares(){
        //CORS
         // this.app.use(cors())
        const whiteList = ['http://localhost:4200',
                            'https://astounding-chebakia-00722d.netlify.app',
                            'http://localhost:80',
                            'http://localhost'];
        this.app.use(cors({
            origin : whiteList
        }))
        // const whiteList = ['http://localhost:4200'];
        // const corsOptions = {
        //     origin: function (origin, callback) {
        //       if (whitelist.indexOf(origin) !== -1) {
        //         callback(null, true)
        //       } else {
        //         callback(new Error('Not allowed by CORS'))
        //       }
        //     }
        //   }
        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use( express.static('public'));
    }

    routes(){
        // this.app.use(this.luxandPath, require('../routes/luxand'));
        this.app.use(this.auth,require('../routes/auth'));
        this.app.use(this.chatgpt, require('../routes/chatgpt'));
        this.app.use(this.vision, require('../routes/vision'));
        this.app.use(this.reclamos, require('../routes/reclamos'));
        this.app.use(this.funcionarios, require('../routes/funcionarios'));
    }
    ServerSocket() {
        new Socket(this.server)
    }

    listen (){
        this.server.listen( this.port, ()=>{
            console.log('servidor corriendo en puerto',this.port);
        })
    }
}

module.exports = Server
