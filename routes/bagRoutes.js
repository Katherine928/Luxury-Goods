const express = require('express');
const bagController = require('./../controllers/bagController');

const router = express.Router();

router.param('id', bagController.checkID);

router.route('/').get(bagController.getAllBags).post(bagController.creatBag);
router
  .route('/:id')
  .get(bagController.getBag)
  .patch(bagController.updateBag)
  .delete(bagController.deleteBag);

module.exports = router;
