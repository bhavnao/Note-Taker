const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readAndAppend,
    readFromFile,
    writeToFile,
} = require("../helpers/fsUtils");

//Get route to retrieve data
router.get("/notes", (req, res) => {

    console.log("\nExecuting GET notes request");

    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

});


//  POST route to add new note
router.post("/notes", (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title, text, id: uuidv4(),
        };

        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: "success",
            body: newNote,
        };

        res.json(response);

    } else {
        res.json("Error in posting new note");

    }
});



// API DELETE route 
router.delete("/notes/:id", (req, res) => {
    readFromFile("./db/db.json")
        .then((data) => {
            const requestedId = req.params.id;
            let match = false;
            let noteData = JSON.parse(data);

            // This gets rid of the matching note id
            for (let i = 0; i < noteData.length; i++) {
                if (requestedId === noteData[i].id) {
                    match = true;
                    noteData.splice(i, 1);
                }
            }

            if (match) {
                // write to db.json
                writeToFile("./db/db.json", noteData);
                const response = {
                    status: "success",
                };
                res.json(response);
            } else {
                res.json("No id found");
            }
        })
        .catch((error) => console.log(error));

});

module.exports = router;