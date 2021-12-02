const { Router } = require('express');

const { test, addSale, getSale, getSales, updateSale, deleteSale } = require('../controllers/sales.controller');

const router = Router();

router.get('/test', test);

router.post('/add-sale', addSale);

router.get('/get-sale/:id', getSale);

router.get('/', getSales);

router.put('/update-sale', updateSale);

router.delete('/delete-sale/:id', deleteSale)

module.exports = router;
