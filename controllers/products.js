const express = require("express");
const router = express.Router();
const models = require("../models/index");
const { responsers } = require( "../helpers/index" );

module.exports = router
.get( "/", async (req, res) => {
    const p = await models.Products.findAll();
    console.log( p )
    return await responsers( res, 200, "", p );
})
.post( "/", async (req, res) => {
    const {
        sku, name, brand, model, price, description
    } = req.body;
    console.log(req.body)
    const p = await models.Products.findOne({
        where: { sku: sku },
    });
    if( p !== null )
        return responsers(res, 409, "SKU is already in use, please check it");
    if( name == "" || brand == "" || model == "" || price <= "0.00" || description == "" )
        return responsers(res, 406, "Something is wrong, a field is missing or invalid, check it");
    const t = await models.sequelize.transaction();
    try {
        await models.Products.create({ 
            sku: sku,
            name: name,
            brand: brand,
            model: model,
            price: price,
            description: description,
        }, { transaction: t });
        await t.commit();
        return await responsers( res, 200, "Product has been created sucessful", await models.Products.findAll() );
    } catch (error) {
        await t.rollback();
        return await responsers( res, 409, error );
    }
})
.put( "/:id", async (req, res) => {
    if( req.params.id === undefined || req.params.id === null || req.body.id === undefined || req.body.id === null )
        return responsers(res, 400, "Missing id parameter, please check it");
    if( req.params.id != req.body.id )
        return responsers(res, 400, "The ID is not the same as the object you want to update, please check it");
    
    const {
        id, sku, name, brand, model, price, description
    } = req.body;
    
    const p = await models.Products.findOne({
        where: { id: id },
    });
    if( p === null )
        return responsers(res, 404, "The product not found, please check it");
    
    const t = await models.sequelize.transaction();
    try {
        await models.Products.update({
            sku: sku,
            name: name,
            brand: brand,
            model: model,
            price: price,
            description: description,
        }, {
            where: { id: id }
        }, { transaction: t });
        t.commit();
        return await responsers( res, 200, "Product has been updated sucessful", await models.Products.findAll() );
    } catch( error ){
        await t.rollback();
        return await responsers( res, 409, error );
    }
})
.delete( "/:id", async (req, res) => {
    if( req.params.id === undefined || req.params.id === null )
        return responsers(res, 400, "Missing id parameter, please check it");

    const id = req.params.id;
    const p = await models.Products.findOne({
        where: { id: id },
    });
    if( p === null )
        return responsers(res, 404, "The product not found, please check it");
    const t = await models.sequelize.transaction();
    try {
        await models.Products.destroy({
            where: {
              id: id
            }
        });
        t.commit();
        return await responsers( res, 200, "Product has been deleted sucessful", await models.Products.findAll() );
    } catch( error ){
        await t.rollback();
        return await responsers( res, 409, error );
    }
})