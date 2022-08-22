const { Router } = require('express');
const router = new Router();

// import the node-fetch package using a dynamic import
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * PUBLICATIONS SCHEME
 * 
 * @swagger
 * components:
 *  schemas:
 *    posts:
 *      type: object
 *      properties:
 *        userId:
 *          type: integer
 *          description: id del usuario
 *        id:
 *          type: integer
 *          description: id del post
 *        title:
 *          type: string
 *          description: título
 *        body:
 *          type: string
 *          description: cuerpo de la públicación 
 * 
 *      example:
 *        userId: 1
 *        id: 1
 *        title: unt aut facere repellat provident occaecati excepturi optio reprehenderit
 *        body: uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto
 *          
*/

// get posts from jsonplaceholder API

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtiene todos los post.
 *     tags: [posts]
 *     requestbody:
 *       content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/posts'
 *     responses:
 *       200:
 *         description: Devuelve un JSON con todas las publicaciones.
*/

router.get(
    '/', async (req, res) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts') ;
        const posts = await response.json();
        res.json(posts);
    }
);

// get a post with a parameter

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    summary: Obtiene todos los datos de una publicación específica.
 *    tags: [posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: Id de una publicación.
 *    responses:
 *      200:
 *        description: Devuelve un JSON con los datos de una publicación en específica.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/posts'
 *      200 - 404 request not found:
 *        content:
 *          application/json:
 *            type: object
 *            $ref: '#/components/schemas/errors'
*/

router.get(
    '/:key', async (req, res) => {
        const {key} = req.params;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + key) ;
        const posts = await response.json();
        if (JSON.stringify(posts) === '{}') {
            let thisUrl = req.originalUrl;
            res.redirect(thisUrl + '/notfound');
        }else{
            res.json(posts);
        }
    }
);

module.exports = router;
