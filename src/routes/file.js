const router = require('express').Router();
const FileController = require('../controllers/FileController');
const multer  = require('multer');
const authorized = require('../middlewares/auth.middleware');
const upload = multer({ dest: './uploads/' });

router.post('/upload', authorized, upload.single('file'), FileController.upload);
router.get('/:id', authorized, FileController.findById);

module.exports = router;
