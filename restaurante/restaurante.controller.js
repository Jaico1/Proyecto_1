
import Restaurante from './restaurante.model';

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
  try{ 
    const { _id } = req.query;
    const restaurante = await Restaurante.find({_id, isDeleted:false});
    res.status(200).json(restaurante);
  }catch(err){
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