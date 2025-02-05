const {Product} = require('../models');

const createProduct = async (req, res) =>{
    const ceproduct = {
        nom :req.body.nom,
        categorie:req.body.categorie,
        reference:req.body.reference,
        prix:req.body.prix,
        quantite:req.body.quantite,
        fournisseur:req.body.fournisseur,
    };
    try {
        const product = await Product.create(ceproduct);
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création d\'un produit',
            error:e.message
        });
    }
}

const createProductPls = async (req, res) =>{
    const produitData= req.body;
    try {
        const product = await Product.bulkCreate(produitData);
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json({
            message:'erreur lors de la création des produits',
            error:e.message
        });
    }
}

const updateProductById = async (req, res) =>{
    const id = req.params.id;
    const updateProduct = {
        nom :req.body.nom,
        categorie:req.body.categorie,
        reference:req.body.reference,
        prix:req.body.prix,
        quantite:req.body.quantite,
        fournisseur:req.body.fournisseur,
    }
    try {
        const product = await Product.update(updateProduct, {where :{id:id}});
        if (!product) {
            res.status(404).json({
                message:"Product not found !"
            }); 
        }
        return res.status(200).json({message:"Product mise à jour avec succès!", updateProduct});
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la mise à jour de ce Product'
        }); 
    }
}

const deleteProductById = async (req, res) =>{
    const id = req.params.id;
    try {
        const product = await Product.destroy({where : {id:id}});
        if (!product) {
            res.status(404).json({
                message:"Product not found !"
            }); 
        } else {
            res.status(200).json({
                message:"Product supprimée avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de l\'effacement de ce Product'
        });
    }
}


const deleteAllProduct = async (req, res) =>{
    try {
        const product = await Product.destroy({where : {}});
        if (!product) {
            res.status(404).json({
                message:"Product not found !"
            }); 
        } else {
            res.status(200).json({
                message:"Product supprimées avec succès!"
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de l\'effacement de tous les Products',
            error:e.message
        });
    }
}

const getAllProduct = async (req, res) =>{
    try {
        const product = await Product.findAll();
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({
            message:'erreur lors de la récuperation des Products',
            error:e.message
        });
    }
}

const getProductById = async (req, res) =>{
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if(!product){
            res.status(404).json({
                message:"Product not found !"
            });
        }else{
            res.status(200).json(product);
        }
    } catch (e) {
        res.status(500).json({
            e:'erreur lors de la récuperation de ce Product'
        });
    }
}

module.exports = {
    createProduct:createProduct,
    createProductPls:createProductPls,
    getAllProduct:getAllProduct,
    getProductById:getProductById,
    deleteProductById:deleteProductById,
    deleteAllProduct:deleteAllProduct,
    updateProductById:updateProductById
}