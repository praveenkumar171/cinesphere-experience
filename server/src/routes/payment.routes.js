const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createPayment } = require('../controllers/payment.controller');

// POST /api/payments - requires auth
router.post('/', auth, createPayment);

module.exports = router;

