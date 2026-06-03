const noteModel = require('../models/noteModel')
const applicationModel = require('../models/applicationModel')
const userModel = require('../models/userModel');
const { application } = require('express');

async function createNote(req, res) {
    let { content, applicationId } = req.body;

    let user = await userModel.findOne({ email: req.user.email })
    
    if (!user) {
        return res.json({success: false, message: 'Not logged in'})
    }
  
        let application = await applicationModel.findById(applicationId)
        let note = await noteModel.create({
            content,
            user: user._id,
            application: application._id
        })
        
    res.json({ success: true, message: 'done', note })
   
}
    

async function getNotes(req, res) {
   try {
    let applicationId = req.params.id;
    let notes = await noteModel.find({application: applicationId})
    res.json({success: true, notes})
   } catch (error) {
    res.json({message: error})
   }
}

async function deleteNote(req, res) {
    try {
        let id = req.params.id;
        let notes = await noteModel.findByIdAndDelete({ _id: id })
        if (!notes) {
            return res.json({success: false})
        }
        res.json({ success: true, message: 'delete' })
    } catch (error) {
        return res.json({success: false})
    }
}

async function editNote(req, res) {
  try {
      let id = req.params.id;
    let { content } = req.body;
    let note = await noteModel.findByIdAndUpdate({ _id: id }, {
        content
    }, { new: true })
      res.json({success:true, message:'updated', note})
  } catch (error) {
    
  }
}

module.exports = {createNote, getNotes, deleteNote, editNote}