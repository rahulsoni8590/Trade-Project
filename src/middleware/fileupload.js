import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/downloads")
    },
    filename: function (req, file, cb) {
      const name =  new Date().toISOString().replace(/:/g, '_') + file.originalname
      cb(null, name)
    }
  })
  
  const fileUpload = multer({ storage: storage })

  export default fileUpload;