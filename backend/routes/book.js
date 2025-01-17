const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBooks);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/',  bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);


module.exports = router;