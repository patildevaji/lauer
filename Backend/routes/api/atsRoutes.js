const express = require('express');
const router = express.Router();
const atsController = require('../../controllers/atsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const bodyParser = require('body-parser');
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' }); 
const upload = multer({
    limits: {
      fieldSize: 10 * 1024 * 1024, 
      dest: 'uploads/'
    },
  });
router.use(bodyParser.urlencoded({ extended: true }));



// Add route for uploading CV
router.route('/uploadCV').post(upload.single('cv'), atsController.uploadCV);

router.route('/createUser').post(atsController.createUser);
router.route('/getUserID').get( atsController.getUserID);
router.route('/updateUserProfile').post(upload.single('cvfileList'), atsController.updateUserProfile);
// router.route('/updateUserProfile').post(upload.array('cvfileList', 2), atsController.updateUserProfile);
router.route('/updateUserPassword').post(atsController.updateUserPassword);
router.route('/getJobsDetails').get(atsController.getJobsDetails);
router.route('/postNewJob').post(atsController.postNewJob);    
router.route('/getAllAppliedJobs').get(atsController.fetchRecordsWithJobId);
 
router.route('/updateJob').put(atsController.updateJob);  


// router.route('/createUser').post(verifyRoles(ROLES_LIST.User), atsController.createUser);
router.route('/displayUserData').get(verifyRoles(ROLES_LIST.User), atsController.displayUserData);
router.route('/updataUserData/:id').put(verifyRoles(ROLES_LIST.User), atsController.updataUserData);

router.route('/getDashboard').get(verifyRoles(ROLES_LIST.User), atsController.getDashboard);
router.route('/getAdmin').get(verifyRoles(ROLES_LIST.Admin), atsController.getAdmin);                        //
router.route('/getOpenApplications').get(verifyRoles(ROLES_LIST.User), atsController.getOpenApplications);
router.route('/getAppliedJobs').get(verifyRoles(ROLES_LIST.User), atsController.getAppliedJobs);
router.route('/applyJob').post(verifyRoles(ROLES_LIST.User), atsController.applyJob);
router.route('/getApplicationStatus').get(verifyRoles(ROLES_LIST.User), atsController.getApplicationStatus);
router.route('/deleteUser/:id').delete(verifyRoles(ROLES_LIST.User), atsController.deleteUser);
router.route('/getApplicantData/:id').get(verifyRoles(ROLES_LIST.Admin), atsController.getApplicantData);    //
      
            // 


module.exports = router;