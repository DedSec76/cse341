const { z } = require('zod');

const expenseSchema = z.object({
    description: z.string().trim().min(5),
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.string().trim().min(3).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Only letters are allowed"),
    date: z.iso.date({ error: 'Bad date! ej. 1999-01-05'}),
    paymentMethod: z.enum(["Yape", "Plin", "Cash", "Card"])
})

module.exports = expenseSchema