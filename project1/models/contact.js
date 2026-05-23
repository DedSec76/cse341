const { Schema, model} = require('mongoose')

const contactSchema = new Schema({
      firstName: String,
      lastName: String,
      email: String,
      favoriteColor: String,
      birthday: String,
});

const Contact = model("Contact", contactSchema)

module.exports = Contact;
