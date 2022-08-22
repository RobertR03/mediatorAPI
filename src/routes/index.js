const { Router } = require('express');
const router = new Router();

// get index server
router.get(
    '/', (req, res) => {
        const docURL = {
            name: 'Documentación',
            web: 'http://localhost:3030/api/doc'
        }
        res.json(docURL);
    }
);

// validation of possible errors
router.get(
    '/api', (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;
