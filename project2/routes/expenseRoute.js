const expController = require('../controllers/expenseController')
const router = require('express').Router()
const { handleErrors, validation } = require('../utilities/')
const expenseSchema = require('../utilities/expense-validation')

/** 
 * @swagger
 * /expenses/:
 *   get:
 *     summary: Get all expenses data
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: All data get expense
 *       400:
 *         description: Bad request
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server Error
*/
router.get('/', expController.getAllExpense)

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   get:
 *     summary: Get a expense by expense_id
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: expense_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Data get successfully
 *       404:
 *         description: Expense Data not found
*/
router.get('/:expense_id', expController.getExpense)

/** 
 * @swagger
 * /expenses/create:
 *   post:
 *     summary: Create a new expenses data
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description: 
 *                 type: string
 *                 required: true
 *               amount: 
 *                 type: number
 *                 format: double
 *                 example: 18.5
 *               category: 
 *                 type: string
 *               date: 
 *                 type: string
 *                 format: date
 *                 example: "2026-01-01"
 *               paymentMethod: 
 *                 type: string
 *                 example: ["Yape", "Plin", "Card", "Cash"]
 *     responses:
 *       201:
 *         description: Expense data created successfully
 *       400:
 *         description: Data not found
 *       500:
 *         description: Format incorrect
*/
router.post('/create',
    validation(expenseSchema), 
    handleErrors(expController.createExpense))

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   put:
 *     summary: Update a expense by expense_id
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: expense_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *     responses:
 *       204:
 *         description: Expense data updated successfully
 *       404:
 *         description: Expense Data not found
*/
router.put('/:expense_id', expController.updateExpense)

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   delete:
 *     summary: Delete a expense by expense_id
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: expense_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       404:
 *         description: Expense Data not found
 *       500:
 *         description: Error Internal
*/
router.delete('/:expense_id', expController.deleteExpense)


module.exports = router