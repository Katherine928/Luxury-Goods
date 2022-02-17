const express = require('express');
const bagController = require('./../controllers/bagController');

const router = express.Router();

router.route('/').get(bagController.getAllBags).post(bagController.creatBag);
router
  .route('/:id')
  .get(bagController.getBag)
  .patch(bagController.updateBag)
  .delete(bagController.deleteBag);

module.exports = router;
