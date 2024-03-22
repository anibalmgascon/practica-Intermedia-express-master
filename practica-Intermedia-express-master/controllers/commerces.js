// Importación de modelos y utilidades necesarias
const { commercesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require('express-validator');

// Obtener lista de comercios, con opción de ordenar por CIF de forma ascendente
const getItems = async (req, res) => {
    try {
        let query = commercesModel.find();
        if (req.query.sortByCIF === 'asc') {
            query = query.sort({ cif: 1 }); 
        }
        const data = await query.exec();
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404);
    }
};

// Obtener un único comercio por CIF
const getItem = async (req, res) => {
    try{
        const {cif} = matchedData(req);
        const data = await commercesModel.findOne({ cif });
        if (!data) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

// Crear un nuevo comercio
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await commercesModel.create(body);
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
};

// Actualizar un comercio existente por CIF
const updateItem = async (req, res) => {
    try{
        const {cif, ...body} = matchedData(req);
        const updatedCommerce = await commercesModel.findOneAndUpdate({ cif }, body, { new: true });
        if (!updatedCommerce) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(updatedCommerce);
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};

// Eliminar un comercio por CIF, con opción de eliminación
const deleteItem = async (req, res) => {
    try {
        const {cif} = matchedData(req);
        let result;
        if (req.query.logical === 'true') {
            result = await commercesModel.findOneAndUpdate({ cif }, { deleted: true }, { new: true });
        } else {
            result = await commercesModel.findOneAndDelete({ cif });
        }
        res.send(result);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};

// Exportación de funciones para su uso en otras partes de la aplicación
module.exports = {
    getItems, getItem,
    createItem, updateItem,
    deleteItem
};
