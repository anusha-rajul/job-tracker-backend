const applicationModel = require('../models/applicationModel')
const userModel = require('../models/userModel')

async function applicationCreation(req, res) {
    let user = await userModel.findById(req.user.userId);
    const { companyName, role, salary, appliedDate, status, platform} = req.body;
    if (!user) {
        return res.json({success: false, message:'Need to login'})
    }
    else {
        let post = await applicationModel.create({
            companyName,
            role,
            salary,
            appliedDate,
            status,
            platform,
            user: user._id
        }) 

        res.json({success:true, message:'Created Application'})
    }
   
    
}

async function getApplication(req, res) {
    let user = await userModel.findById(req.user.userId)
    if (!user) {
        return res.json({success: false, message:'Need to login'})      
    } else {
        let applications = await applicationModel.find({user: req.user.userId})
        return res.json({success: true, applications})
    }
}

async function deleteApplication(req, res) {
    await applicationModel.findByIdAndDelete({ _id: req.params.id });
    return res.json({success: true, message:'Deleted application'})
}
async function getEditPage(req, res) {
    let application = await applicationModel.findOne({ _id: req.params.id, user: req.user.userId })
    return res.json({ success: true, application })
}

async function edit(req, res) {
    const { companyName, role, salary, status, platform, appliedDate } = req.body;
    let application = await applicationModel.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, {
        companyName,
        role,
        salary,
        status,
        appliedDate,
        platform
    },{returnDocument: 'after'})
    return res.json({ success: true, application })
}

async function handleStatus(req, res) {
   try {
    let id = req.params.id;
    let { status } = req.body;
    let application = await applicationModel.findByIdAndUpdate({ _id: id }, { status: status }, { returnDocument: 'after' })
    return res.json({success:true, application})
   } catch (error) {
    return res.json({success:false})
   }

}

module.exports = {applicationCreation, getApplication, deleteApplication, getEditPage, edit, handleStatus}