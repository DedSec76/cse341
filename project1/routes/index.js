const controller = require('../controllers/');
const router = require('express').Router();
const utilities = require('../utilities/')
const contactSchema = require('../utilities/contact-validation')

router.get('/', (req, res) => {
  res.send('Hello World!!');
});

/**
 * @swagger
 * /contacts/:
 *   get:
 *     summary: Get all the contacts
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/contacts/', controller.getAllData);

/**
 * @swagger
 * /contacts/{contact_id}:
 *   get:
 *     summary: Get contact by contact_id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: contact_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Returns information about a contact searched by ID
 */
router.get('/contacts/:contact_id', controller.getData);

/**
 * @swagger
 * /contacts/:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201: 
 *         description: Contact created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/contacts/', 
            utilities.validate(contactSchema),
            utilities.handleErrors(controller.createData));

/**
 * @swagger
 * /contacts/{contact_id}:
 *   put:
 *     summary: Update a contact by contact_id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: contact_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       204:
 *         description: Contact updated successfully
 */
router.put('/contacts/:contact_id', controller.updateData);

/**
 * @swagger
 * /contacts/{contact_id}:
 *   delete:
 *     summary: Delete a contact by contact_id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: contact_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 */
router.delete('/contacts/:contact_id', controller.deleteData);

module.exports = router;
