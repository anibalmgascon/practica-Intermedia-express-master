const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const CommerceScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // Hace que el campo sea obligatorio
            trim: true, // Elimina los espacios al principio y al final
            maxlength: 100 // Establece un límite máximo de caracteres
        },
        cif: {
            type: String,
            required: true,
            unique: true, // Asegura que cada CIF sea único en la colección
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Asegura que cada email sea único en la colección
        },
        contact: {
            type: String,
            required: true,
            trim: true,
            minlength: 7, // Establece un mínimo de caracteres para el contacto
            maxlength: 15
        },
        siteId: {
            type: Number,
            required: true,
            min: 1, // Establece un valor mínimo para el ID
            max: 10000 // Establece un valor máximo para el ID
        },
    }
)

CommerceScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("commerces", CommerceScheme) 