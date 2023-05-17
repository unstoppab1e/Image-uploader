const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storageEngines = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}__${file.originalname}`)
    },
});

const checkFileType = (file, cb) => {
    return cb(null, true);
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);
    console.log(extName);
    console.log(mimeType);

    if(mimeType && extName){
        return cb(null, true);
    }else{
        cb("Error: You can only upload Image!");
    }
}

const upload = multer({
    storage: storageEngines,
    limits: {fileSize: 10000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('successful');
});

app.post('/upload', upload.any(), (req,res) =>{
    console.log(req.files);
    if(req.files){
        res.send("File uploaded successfully!")
    }else{
        res.status(400).send("Please upload a valid image");
    }
});

app.listen(3000, () => console.log("Port is listening on 3000"));