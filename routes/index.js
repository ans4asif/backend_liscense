var express = require('express');
var router = express.Router();
const mainController = require('../controllers/index');

const regular_handler = (params, req, res, next) => {
  return res.status(params?.code).send(params);
};

router.get('/perms', mainController.getPermissions);

router.post('/sign-in', mainController.signIn, regular_handler);
router.post('/sign-up', mainController.signUp, regular_handler);
router.post('/delete-admin', mainController.deleteAdmin, regular_handler);
router.post('/create-user', mainController.createUser, regular_handler);
router.patch('/edit-user/:id', mainController.editUser, regular_handler);
router.delete('/delete-user/:id', mainController.deleteUser, regular_handler);
router.get('/get-users', mainController.getUsers, regular_handler);
router.get('/get-attendence', mainController.getAttendence, regular_handler);
router.get('/get-student-list', mainController.getStudentList, regular_handler);
router.get('/download-pdf-doc', mainController.downloadPdf, regular_handler);
router.post('/create-attendence', mainController.createAttendance, regular_handler);
router.delete('/delete-attendece/:id', mainController.deleteAttendence, regular_handler);

module.exports = router;
