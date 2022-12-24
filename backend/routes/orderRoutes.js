const express = require('express');
const { 
    newOrder, 
    getSingleOrder, 
    myOrder ,
    getAllOrders ,
    updateOrder ,
    deleteOrder
} = require('../controller/orderController');
const router =express.Router();
const { userAuthenticated,authorizeRoles } = require('../middleware/isAuthentiCated');


router.route('/order/new').post(userAuthenticated,newOrder);

router.route('/order/:id').get(userAuthenticated,getSingleOrder);

router.route('/orders/me').get(userAuthenticated,myOrder);

router.route('/admin/orders').get(userAuthenticated,authorizeRoles('admin'),getAllOrders);

router.route('/admin/order/:id').put(userAuthenticated,authorizeRoles('admin'),updateOrder).delete(userAuthenticated,authorizeRoles('admin'),deleteOrder);

module.exports = router