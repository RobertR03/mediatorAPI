const { Router } = require('express');
const router = new Router();

// error 404 function
async function notFound(pagina) {
    let error = new Error();
    error.status = 404;
    message = {
        'error':'la página ' + pagina + ' no existe', 'status': error.status
    };
    const jsonError = message;
    return jsonError;
}

// process nonexistent urls
router.get(
    '/', async (req, res) => {
        let thisUrl = req.originalUrl;
        let i = thisUrl.search('/notfound'); // check if the link is caused by the intentional redirection of other routes
        if (i >= 0) {
            thisUrl = thisUrl.replace('/notfound', ''); // save only the searched URL
        }
        let error = await notFound(thisUrl); // prepare the error message
        res.json(error);
    }
);

module.exports = router;
