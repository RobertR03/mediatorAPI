const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

// init swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDetails = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mediator API',
            description: 'Es una API que utiliza las publicaciones y usuarios de jsonplaceholder',
            contact: {
                name: 'API Support',
                url: 'https://robertromero.netlify.app/index.html',
                email: 'rjrch3@gmail.com'
            },
            version: '1.0.0',
        },
        components: {
            schemas: {
                errors: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'descripción del error'
                        },
                        status: {
                            type: 'integer',
                            description: 'código de error externo'
                        }
                    },
                    example: {
                        error: 'la página api/users/1000 no existe',
                        status: 404
                    }
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3030',
                description: 'Host local'
            },
        ],
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

// config
app.set('port', 3030);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerDetails)));

//routes
app.use(require('./routes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/*', require('./routes/error404'));


// run Server
app.listen(
    app.get('port'), () =>{
        console.log('Servidor en puerto ', app.get('port'));
    }
);
