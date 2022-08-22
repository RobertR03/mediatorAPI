const { Router } = require('express');
const router = new Router();

// import the node-fetch package using a dynamic import
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * USERS SCHEME
 * 
 * @swagger
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: id de usuario
 *        name:
 *          type: string
 *          description: usuario
 *        username:
 *          type: string
 *          description: nombre de usuario
 *        email:
 *          type: string
 *          description: email del usuario
 *        address:
 *          type: object
 *          title: ubicación
 *          properties:
 *            street: 
 *              type: string
 *              description: calle
 *            suite:
 *              type: string
 *              description: apartamento
 *            city: 
 *              type: string
 *              description: ciudad
 *            zipcode:
 *              type: string
 *              description: código postal
 *            geo:
 *              type: object
 *              title: coordenadas
 *              properties:
 *                lat:
 *                  type: string
 *                  description: latitud
 *                lng:
 *                  type: string
 *                  description: longitud
 *            phone: 
 *              type: string
 *              description: número de teléfono
 *            website:
 *              type: string
 *              description: sitio web
 *            company:
 *              type: object
 *              title: compañia
 *              properties:
 *                name:
 *                  type: string
 *                  description: nombre de la compañía
 *                catchPhrase:
 *                  type: string
 *                  description: slogan
 *                bs:
 *                  type: string
 *                  description: areas de trabajo
 * 
 * 
 *      example:
 *        id: 1
 *        name: Leanne Graham
 *        username: Bret
 *        email: Sincere@april.biz
 *        address:
 *          street: Kulas Light
 *          suite: Apt. 556
 *          city: Gwenborough
 *          zipcode: 92998-3874
 *          geo:
 *            lat: -37.3159
 *            lng: 81.1496
 *        phone: 1-770-736-8031 x56442
 *        website: hildegard.org
 *        company:
 *          name: Romaguera-Crona
 *          catchPhrase: Multi-layered client-server neural-net
 *          bs: harness real-time e-markets
 *          
*/

// get users from jsonplaceholder API

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios.
 *     tags: [users]
 *     requestbody:
 *       content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: Devuelve un JSON con todos los datos de los usuarios.
*/

router.get(
    '/', async (req, res) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users') ;
        const users = await response.json();
        res.json(users);
    }
);

// get a user with a parameter

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Obtiene todos los datos de un usuario específico.
 *    tags: [users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: Id de un usuario.
 *    responses:
 *      200:
 *        description: Devuelve un JSON con los datos de un usuario en specífico.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/users'
 *      200 - 404 request not found:
 *        content:
 *          application/json:
 *            type: object
 *            $ref: '#/components/schemas/errors'
*/

router.get(
    '/:key', async (req, res) => {
        const {key} = req.params;
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + key);
        const users = await response.json();
        if (JSON.stringify(users) === '{}') {
            let thisUrl = req.originalUrl;
            res.redirect(thisUrl + '/notfound');
        }else{
            res.json(users);
        }
    }
);

module.exports = router;
