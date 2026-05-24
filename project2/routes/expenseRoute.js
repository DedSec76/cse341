const expController = require('../controllers/expenseController')
const router = require('express').Router()

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
 *         description: Data not found
*/
router.get('/', expController.getAllExpense)

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   get:
 *     summary: Get expense by expense_id
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
 *       400:
 *         description: Expense Data not found
*/
router.get('/:expense_id', expController.getExpense)

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
 *         description: Data not found
*/
router.post('/create', expController.createExpense)

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   get:
 *     summary: Get expense by expense_id
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
 *       400:
 *         description: Expense Data not found
*/
router.put('/update/:expense_id', expController.updateExpense)

/** 
 * @swagger
 * /expenses/{expense_id}:
 *   get:
 *     summary: Get expense by expense_id
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
 *       400:
 *         description: Expense Data not found
*/
router.delete('/delete/:expense_id', expController.deleteExpense)


module.exports = router