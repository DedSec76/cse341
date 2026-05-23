const { z } = require("zod")

const contactSchema = z.object({
    firstName: z.string().trim().min(3).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Only letters are allowed"),
    lastName: z.string().trim().min(3).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Only letters are allowed"),
    email: z.email().trim().toLowerCase(),
    favoriteColor: z.string().trim().min(2).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Only letters are allowed"),
    birthday: z.iso.date({error: "Bad date! ej. 1999-01-01"})
})

module.exports = contactSchema