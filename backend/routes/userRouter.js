const express = require('express')
const router = express.Router();
const {
    userRegister, 
    userLogin, 
    logout, 
    forgotPassword, 
    resetPassword, 
    userDetails, 
    userPasswordUpdate,
    updateUserProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controller/userController')
const { userAuthenticated,authorizeRoles } = require('../middleware/isAuthentiCated');


router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(userAuthenticated,userDetails);
router.route('/password/update').put(userAuthenticated,userPasswordUpdate);
router.route('/me/update').put(userAuthenticated,updateUserProfile);
router.route('/admin/users').get(userAuthenticated,authorizeRoles("admin"),getAllUser);
router
.route('/admin/user/:id')
.get(userAuthenticated,authorizeRoles('admin'),getSingleUser)
.put(userAuthenticated,authorizeRoles('admin'),updateUserRole)
.delete(userAuthenticated,authorizeRoles('admin'),deleteUser)


module.exports = router