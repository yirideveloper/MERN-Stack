const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Roles
const roleRoutes = require('./api/roles');
router.use('/role', roleRoutes);
// All route of Content
const contentRoutes = require('./api/content');
router.use('/contents', contentRoutes);
// All route of Media
const mediaRoutes = require('./api/media');
router.use('/media', mediaRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);
// All route of Static Data from DB Module
const staticRoutes = require('./api/static');
router.use('/static', staticRoutes);
//All route of Blog
const fiscalRoutes = require('./api/fiscal');
router.use('/fiscal', fiscalRoutes);
//All route of registration
const registrationRoutes = require('./api/registration');
router.use('/registration', registrationRoutes);

// For word press
const wordpressRoutes = require('./api/wordpress_schema');
router.use('/wordpress', wordpressRoutes);

// For Designations
const DesignationRoutes = require('./api/Designation');
router.use('/Designation', DesignationRoutes);

// For Leave type
const LeaveTypeRoutes = require('./api/LeaveType');
router.use('/leavetype', LeaveTypeRoutes);

// For Leave Application
//const LeaveApplicationRoutes = require('./api/LeaveApplication');
//router.use('/leaveapplication', LeaveApplicationRoutes);

module.exports = router;
