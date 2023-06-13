
const multer = require('multer');
try{
    console.log('hiiiiiiiiiiiiii')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
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


