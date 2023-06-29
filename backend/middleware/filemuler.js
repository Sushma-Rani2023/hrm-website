const multer = require('multer')
try{
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var upload =multer({storage:storage});
}
catch(err){
    console.log('err is',err)
}

module.exports=upload


