const { ObjectId } = require('mongoose').Types;
const Expense  = require('../models/expenses')
const controller = {}

controller.getAllExpense = async (req, res) => {
    try {
        const result = await Expense.find()

        if(!result.length) {
            res.status(404).json({
                success: false,
                dataCount: result.length, 
                message: 'Data not found'
            })
        }

        res.status(200).json({
            success: true,
            dataCount: result.length,
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message | 'An error occurred while Get all the data'
        })
    }
}

controller.getExpense = async (req, res) => {
    try {
        const expenseId = new ObjectId(req.params.expense_id)

        const result = await Expense.findOne({ _id: expenseId})
        
        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }
        
        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message | 'An error occurred'
        })
    }
    
}

controller.createExpense = async (req, res) => {
    try {

        if(!req.body.description.trim() || !req.body.amount || !req.body.paymentMethod.trim()) {
            return res.status(400).json({
                success: false,
                message: "description, amount and payment is required"
            })
        }

        const result = await Expense.create(req.body)        
        
        res.status(201).json({
            success: true,
            id: result._id,
            message: 'Data created successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        })
    }
}

controller.updateExpense = async (req, res) => {
    try {
        const expenseId = new ObjectId(req.params.expense_id)
        console.log(expenseId)

        const result = await Expense.findOneAndUpdate(
            { _id: expenseId },
            { $set: req.body },
            { returnDocument: 'after' })
    
        if(!result) {
            return res.status(404).json({
                success: false,
                message: `No data exists`
            })
        }

        res.status(200).json({
            success: true,
            message: `Data with ID= ${expenseId} was updated successfully`
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: `Error updating data with ID = ${expenseId}`
        })
    }
}

controller.deleteExpense = async (req, res) => {
    try {
        const expenseId = new ObjectId(req.params.expense_id)
        
        const result = await Expense.findOneAndDelete({ _id: expenseId })
    
        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Data not found!'
            })
        }

        res.status(200).json({
            success: true,
            message: `Data with ID = ${result._id} delete successfully!`
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error deleting data with ID = ${expenseId}`
        })
    }
}

module.exports = controller