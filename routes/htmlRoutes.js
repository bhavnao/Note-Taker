const router = require('express').Router();
const path = require("path");

    
    router.get('/notes', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    router.get('*', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/index.html'));
    });

    module.exports = router;