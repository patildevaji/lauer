const User = require('../models/usermodel');
const Job = require('../models/jobmodel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jobmodel = require('../models/jobmodel');
const { json } = require('body-parser');
const CV = require('../models/resume');


const createUser = asyncHandler(async (req, res) => {
    const { firstname,
        lastname,
        address,
        plz,
        city,
        country,
        email,
        phone } = req.body;

    const applicant =  User.create({

        firstname,
        lastname,
        address,
        plz,
        city,
        country,
        email,
        phone,
    });

    applicant.save();
    

    res.send(applicant);

    console.log('api connected');

});

const displayUserData = asyncHandler(async (req, res) => {
    res.json('display applicants data ');
});

const updataUserData = asyncHandler(async (req, res) => {
    const applicant = await User.findById(req.params.id);
    if (!applicant) {
        res.status(404);
        throw new Error('User not found');
    }


    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedUser);
});

const getDashboard = asyncHandler(async (req, res) => {
    console.log("hello");
    res.json('open dashboard');
});

const getAdmin = asyncHandler(async (req, res) => {
    
    res.json('open Admin dashboard');
});

const getOpenApplications = asyncHandler(async (req, res) => {
    res.json('display Open applications');
});

const getAppliedJobs = asyncHandler(async (req, res) => {
    res.json(' Display applied applications ');
});

const applyJob = asyncHandler(async (req, res) => {
    res.json(`Apply job with ID ${req.params.id}`);
});

const getApplicationStatus = asyncHandler(async (req, res) => {
    res.json('check application status ');
});

const deleteUser = asyncHandler(async (req, res) => {
    const loginuseruser = await User.findById(req.params.id);
    if (!loginuseruser) {
        res.status(404);
        throw new Error('User not found');
    }

    //if (loginuseruser.user_id.toString() !== req.loginuser.id){
    //     res.status(403);
    //    throw new Error('User not Authorized');}
    await User.deleteOne({ _id: req.params.id });
    res.json(loginuseruser);
});

const getApplicantData = asyncHandler(async (req, res) => {
    const applicant = await User.findById(req.params.id);
    if (!applicant) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(applicant);
});
const getUserID = asyncHandler( async (req, res) => {
    
    try {
        const { email } = req.query; 
    
        const userData = await User.findOne({ email });
    
        if (!userData) {
            res.status(404).json({ error: 'User not found' }); // Return error response if user is not found
            return;
        }
    
        res.json(userData); // Return user ID if found
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
      }
});
const updateUserProfileO = asyncHandler(async (req, res) => {
    const  email  = req.body.formData.email;
    const applicant = await User.findOne({ email });
    if (!applicant) {
        res.status(404);
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(
        applicant.id,
        req.body.formData,
        { new: true }
    );
    res.json(updatedUser);
});

const updateUserProfile = asyncHandler(async (req, res) => {
    
    // Extract fields from formData
    const email = req.body.email;
    console.log(req.body);
    let jobid;
    let title;
    let firstname;
    let lastname;
    let address;
    let plz;
    let image;
    let coverLetterFile;
    let cvFile;
    let phone;
    let country;
    let linkedin;
    let progressBar;
    if(req.body.jobid) {
         jobid = req.body.jobid;
    }
    if(req.body.title) {
        title = req.body.title;
    }
    if(req.body.firstname) {
     firstname = req.body.firstname;
    }
    if(req.body.lastname) {
        lastname = req.body.lastname;
    }
    if(req.body.address) {
        address = req.body.address;
    }
    if(req.body.plz) {
        plz = req.body.plz;
    }
    if(req.body.image) {
        image = req.body.image;
    } 
    if(req.body.coverLetterFile) {
        coverLetterFile = req.body.coverLetterFile;
    }
    if(req.body.cvFile) {
        cvFile = req.body.cvFile;
    }
    if(req.body.phone) {
        phone = req.body.phone;
    }
    if(req.body.country) {
        country = req.body.country;
    }
    if(req.body.linkedin) {
        linkedin = req.body.linkedin;
    }
    if(req.body.progressBar) {
        progressBar = req.body.progressBar;
    }

    // Extract other fields as needed

    const applicant = await User.findOne({ email });
    if (!applicant) {
        res.status(404);
        throw new Error('User not found');
    }

    // Construct update object with extracted fields
    const updateObj = {
        firstname,
        lastname,
        address,
        plz,
        image,
        cvFile,
        phone,
        country,
        linkedin,
        coverLetterFile,
        jobid,
        title,
        progressBar
    };
    const updatedUser = await User.findByIdAndUpdate(
        applicant.id,
        updateObj,
        { new: true }
    );
    
    res.json(updatedUser);
});

const updateUserPassword = asyncHandler(async (req, res) => {
    const  email  = req.body.formData.email;
    const applicant = await User.findOne({ email });
    if (!applicant) {
        res.status(404);
        throw new Error('User not found');
    } 
    
    let variableCompare = false;
    if(bcrypt.compare(applicant.password, req.body.formData.oldPassword)){
        variableCompare = true;
    };
    if(variableCompare){
        const hashedPassword = await bcrypt.hash(req.body.formData.newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(
            applicant.id,
            { password: hashedPassword },
            { new: true }
        );
        res.json(updatedUser);
    }
    // res.json(updatedUser);
});

const postNewJob = asyncHandler(async (req, res) => {
    const newJob = new Job(req.body);
  
  // Save the new job to the database
  newJob.save()
    .then((job) => {
      console.log('New job added:', job);
      res.status(201).json({ job }); // Respond with the added job
    })
    .catch((error) => {
      console.error('Error adding new job:', error);
      res.status(500).json({ error: 'Failed to add new job' });
    });
});

const getJobsDetails = asyncHandler( async (req, res) => {
    
    try {
        const jobsData = await jobmodel.find();
    
        if (!jobsData) {
            res.json('Jobs not found'); 
            return;
        }
    
        res.json(jobsData); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const updateJob = asyncHandler( async (req, res) => {
    const jobId = req.body.jobsData.jobid;

    const job =  await Job.findOne( {jobId} );
  // Find the job by its ID and update it with the new details
  Job.findByIdAndUpdate(jobId, req.body, { new: true })
    .then((updatedJob) => {
      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json({ updatedJob });
    })
    .catch((error) => {
      console.error('Error updating job:', error);
      res.status(500).json({ error: 'Failed to update job' });
    });

});

const uploadCV = asyncHandler( async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Create a new CV document
    const cv = new CV({
      filename: req.file.filename,
      path: req.file.path,
      // Other relevant fields like user ID, etc.
    });
  
    try {
      // Save the CV document to the database
      await cv.save();
      res.status(201).send('CV uploaded successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  const fetchRecordsWithJobId = asyncHandler( async (req, res) => {
    try {
      // Use Mongoose find method to query records where jobid is not null
      const records = await User.find({ jobid: { $exists: true, $ne: null } });
      console.log('Here' + records[0].jobid + 'Here');
      res.json(records); 
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error; // Handle the error appropriately in your application
    }
  });

module.exports = {
    createUser, displayUserData, updataUserData, getDashboard, getAdmin, getOpenApplications,
    getAppliedJobs, applyJob, getApplicationStatus, deleteUser, getApplicantData, postNewJob, getUserID, 
    updateUserProfile, updateUserPassword, getJobsDetails, updateJob,uploadCV,fetchRecordsWithJobId
};