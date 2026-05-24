const { Schema, model } = require('mongoose')

const expenseSchema = new Schema({    
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    amount: { 
        type: Number,
        min: [0.10, 'Amount must be greater than 0'],
        required: [true, 'Amount is required']
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['Yape', 'Plin', 'Card', 'Cash'],
            message: '{VALUE} is not a valid payment Method. Only can be used: Yape, Plin, Card and Cash'
        },
        required: [true, 'Payment method is required']
    }
}, {
    timestamps: true
})

const Expense = model('Expense', expenseSchema)

module.exports = Expense
