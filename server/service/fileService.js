const Grid = require('gridfs-stream'); 
const mongoose = require('mongoose');
const connection = require("../db/db-connection");
const { ObjectId } = require('mongodb');

// init gfs
let gfs;
let gridFSBucket;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
      });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

class FileService {
    async upload(req, res) {
        if (req.file === undefined) return res.send("you must select a file.");
        return {file: req.file}
    }

    async getAll(req, res) {     
        gfs.files.find().toArray((err, files) => {
            if(!files || files.length === 0) {
                return {err: "No files found"};
            }
            return res.json(files);
        });
    }

    async getOne(req, res) {
        gfs.files.findOne({file: req.params._id}, (err, file) => {
            if(!file || file.length === 0) {
                return {
                    err: "File doesn\'t exists"
                };
            }
            return res.json(file);
        });
    }

    async displayOne(req, res) {
        gfs.files.findOne({filename: req.params.filename}, (err, file) => {

            if(!file || file.length === 0) {
                res.status(404).json({
                    err: "File doesn\'t exists"
                });
            }
    
            if(file.contentType === "image/png" || file.contentType === "image/jpeg") {
                const readStream = gridFSBucket.openDownloadStream(file._id);
                readStream.pipe(res);
            } else {
                res.status(404).json({
                    err: "It's not img file"
                });
            }
        });
    }

    async deleteOne(req, res) {
        gfs.files.deleteOne({_id: ObjectId(req.params.id)}, (err, file) => {
            if(err) {
                res.json(err)
            } else {
                res.json({deletedFile: file})
            }
        });
    }

}

module.exports = new FileService();