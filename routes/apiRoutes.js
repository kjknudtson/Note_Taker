var fs = require("fs");



module.exports = function(app) {

        

        app.get("/api/notes", function(req, res) {
            fs.readFile("./db/db.json", function (err, data) {

                
                if (err) throw err;
                var notes = JSON.parse(data);
                res.json(notes);
            
            });
        });

        app.post("/api/notes", function(req, res) {
            fs.readFile("./db/db.json", function (err, data) {
                
                if (err) throw err;
                var notes = JSON.parse(data);
                var newNote = req.body;
                var ID = (notes.length).toString();
                newNote.id = ID
                notes.push(newNote);
                fs.writeFileSync("./db/db.json", JSON.stringify(notes));
                res.json(notes);
            });            

        });

        
        
       
        

        app.delete("/api/notes/:id", function(req, res) {
            fs.readFile("./db/db.json", function (err, data) {
                var notes = JSON.parse(data);
                var noteID = req.params.id;
                if (err) throw err;
                notes = notes.filter(function(note) {
                    return note.id != noteID;
                });

                var value = 0;
                notes.forEach(note => {
                    note.id = value;
                    value++;
                });

                fs.writeFileSync("./db/db.json", JSON.stringify(notes));
                res.json(notes);
                
            });       
            
        });


        
       








}