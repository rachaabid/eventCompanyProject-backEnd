const express = require('express');
const router = express.Router();
 const passport = require('passport');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve('./uploads')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname)
    const filename = Date.now() + fileExtension
    cb(null, filename)
  }
})

function fileFilter(req, file, cb) {
  const fileExtension = path.extname(file.originalname)
  const acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif']

  cb(null, acceptedExtensions.includes(fileExtension))
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fieldSize: 25*1024*1024} })

const { createCompany, getCompanies, getCompanyById, update, deleteCompany } = require('../Controlers/Company');


router.post('/Companies',
  [ passport.authenticate('bearer', {session: false}),
  upload.single('photo')], createCompany);

router.get('/Companies',
  passport.authenticate('bearer', {session: false}),
  getCompanies);

router.get('/Companies/:idCompany',
   passport.authenticate('bearer', {session: false}),
  getCompanyById);

router.put('/Companies/:idCompany',
  [ passport.authenticate('bearer', {session: false}),
  upload.single('photo')], update);

router.delete('/Companies/:idCompany',
   passport.authenticate('bearer', {session: false}),
  deleteCompany);

module.exports = router;
