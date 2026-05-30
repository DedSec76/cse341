const { z } = require('zod');

const expenseSchema = z.object({
    description: z.string("Not a string").trim().min(5),
    amount: z.number("Not a number").positive("Amount must be greater than 0"),
    category: z.string("Not a string").trim().min(3).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Only letters are allowed"),
    date: z.iso.date({ error: 'Bad date! ej. 1999-01-05'}),
    paymentMethod: z.enum(["Yape", "Plin", "Cash", "Card"])
})

const idSchema = z.object({
    expense_id: z.string("Not a Object Id valid").regex(/^[0-9a-fA-F]{24}$/)
})

module.exports = {expenseSchema, 
                  expenseUpdate: expenseSchema.partial(),
                  idSchema}