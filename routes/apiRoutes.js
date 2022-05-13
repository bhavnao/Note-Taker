const router = require('express').Router();
const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

router.get("/api/notes", (request, response) => {
        
    console.log("\n\nExecuting GET notes request");

    
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
    
    
    response.json(data);
});


// API POST Request
router.post("/api/notes", (request, response) => {

      
    const newNote = request.body;
    
    console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));

    
    newNote.id = uuid();
    
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    data.push(newNote);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    
    console.log("\nSuccessfully added new note to 'db.json' file!");
    
    response.json(data);
});


// API DELETE request
app.delete("/api/notes/:id", (request, response) => {

    
    let noteId = request.params.id.toString();    
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);
    
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    
    const newData = data.filter( note => note.id.toString() !== noteId );

    
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    
    console.log(`\nSuccessfully deleted note with id : ${noteId}`);

    
    response.json(newData);
});



module.exports = router;