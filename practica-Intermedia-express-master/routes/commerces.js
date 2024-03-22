const express = require("express"); // Importa Express para crear el servidor y manejar rutas.
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/commerces"); // Importa controladores para las operaciones CRUD.
const { validatorGetItem, validatorCreateItem, validatorDeleteItem } = require("../validators/commerces"); // Importa validadores específicos para las operaciones.

const router = express.Router(); // Crea una instancia de Router de Express para definir rutas.

router.get("/", getItems); // Define ruta para obtener todos los comercios.
router.get("/:cif", validatorGetItem, getItem); // Define ruta para obtener un comercio por CIF con validación previa.

router.delete("/:cif", validatorGetItem, deleteItem); // Define ruta para eliminar un comercio por CIF con validación previa.

router.put("/:cif", validatorGetItem, validatorCreateItem, updateItem); // Define ruta para actualizar un comercio por CIF. Hay un error aquí: debería usar `validatorUpdateItem` en lugar de `validatorCreateItem` si existiera.

router.post("/", validatorCreateItem, createItem); // Define ruta para crear un nuevo comercio con validación previa.

module.exports = router; // Exporta el router para usarlo en el archivo principal de la aplicación Express.
