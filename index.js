const express = require('express');
const app =express()
const bodyParser = require('body-parser');
const multer =require('multer');
const path = require('path')
app.use(express.static('./public'));
app.use(bodyParser.json());

//Use of Multer Package

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
       cb(nll,file.filename+'_'+Date.now() + path.extname(file.originalname))
    }
})

let maxSize=2 * 1000 * 1000;
let upload=multer({
    storage:storage,
    limits:{
      fileSize:maxSize
    }
})

let uploadHandler = upload.single('file');

app.post('/upload',(req,res)=>{
      uploadHandler(req,res,function(err){
        if(err instanceof multer.MulterError){
            if(err.code == 'LIMIT_FILE_SIZE'){
                res.status(400).json({message:"Maximum File is 2mb."})
             }
            return;
        }
        if(!req.file){
            res.status(400).json({message:"No file !"});
        }else{
            res.status(200).json({message:"Uplaod to the server!"})
        }
         
      })
})

const PORT=process.env.PORT || 1996;
app.listen(PORT,()=>{
    console.log(`server is running at Port ${PORT}`)
})