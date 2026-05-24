const ObjectId = require('mongodb').ObjectId;
const Contact = require('../models/contact');

const controller = {};

controller.getAllData = async (req, res) => {
  try {
    const result = await Contact.find();

    if(!result.length) {
      return res.status(404).json({ message: 'Nothings was found' })
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while Get all the data'
    })
  }
};

controller.getData = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.contact_id);
    
    const result = await Contact.findOne({ _id: contactId });

    if(!result) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while Get the data'
    })
  }
};

controller.createData = async(req, res) => {
  try { 

    if(!req.body.firstName?.trim() || !req.body.lastName?.trim() || !req.body.email?.trim()) {
      return res.status(400).json({ 
        success: false,
        message: 'firstName, lastName or Email are required' 
      })
    }

    const result = await Contact.create(req.body);

    return res.status(201).json({
      success: true,
      id: result.insertedId,
      message: 'Contact created successfully' 
    });

  } catch(error) {
    return res.status(500).json({
      sucess: true,
      message: error.message || 'Some error occurred while creating contact'
    })
  }
}

controller.updateData = async(req, res) => {
  try {

    const body = req.body
    const contactId = new ObjectId(req.params.contact_id)

    if(Object.keys(body).length === 0) {
      return res.status(400).send({message: 'Data to update can not be empty!'})
    }

    const result = await Contact.findOneAndUpdate(
      { _id: contactId }, 
      { $set: body },
      { returnDocument: 'after' }
    );

    if(!result) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      })
    }

    return res.status(200).json({
      success: true, 
      message: `Contact with id ${contactId} was updated successfully. `
    })

  } catch (error) {
    return res.status(500).json({
      message: `Error updating contact with contact_id= ${contactId}`
    })
  }
}

controller.deleteData = async(req, res) => {  
  try {
    const contactId = new ObjectId(req.params.contact_id);

    const result = await Contact.findByIdAndDelete({_id: contactId})

    if(!result) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    return res.status(200).json({
      id: contactId,
      message: 'Contact deleted successfully'
    })

  } catch (error) {
    return res.status(501).json({
      message: error.message || 'An occurred error to delete contact'
    })
  }
}

module.exports = controller;
