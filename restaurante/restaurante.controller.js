
import Restaurante from './restaurante.model';
const stringSimilarity = require('string-similarity');

export async function getRestaurante(req,res) {
  try{ 
    const { _id } = req.query;
    const restaurante = await Restaurante.find({_id, isDeleted:false});
    res.status(200).json(restaurante);
  }catch(err){
    res.status(500).json(err);
  }
}

export async function getRestauranteCatNom(req,res) {
  const { categoria, name } = req.query;

  try {
  let filteredRestaurants = [];

    if (categoria && name) {
      // Find restaurants by category and name query
       filteredRestaurants = await Restaurante.find({
        categoria: categoria,
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { name: { $regex: new RegExp(stringSimilarity.findBestMatch(name, await Restaurante.find().distinct('name')).bestMatch.target, 'i') } }
        ]
      });
    } else if (categoria) {
      // Find restaurants by category only
       filteredRestaurants = await Restaurante.find({ categoria: categoria });
    } else if (name) {
      // Find restaurants by name query
       filteredRestaurants = await Restaurante.find({
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { name: { $regex: new RegExp(stringSimilarity.findBestMatch(name, await Restaurante.find().distinct('name')).bestMatch.target, 'i') } }
        ]
      });
    } 

    res.status(200).json(filteredRestaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function createRestaurante(req, res) {
  try {
    const { name, categoria} = req.body;
    const restaurante = new Restaurante({ name, categoria});
    const resultado = await restaurante.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchRestaurante(req, res) {
  try{
    const { _id, ...updates } = req.body;
    const resultado = await Restaurante.findOneAndUpdate({_id, isDeleted : false},updates ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}

export async function deleteRestaurante(req, res) {
  try{
    const _id = req.params._id;
    const resultado = await Producto.findOneAndUpdate(_id, {isDeleted :true} ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}