
import Producto from './producto.model';

export async function getProducto(req,res) {
 try{ 
  
    const { _id } = req.query;
    const producto = await Producto.find({_id, isDeleted:false});
    res.status(200).json(producto);
  }catch(err){
    res.status(500).json(err);
  }
}

export async function getProductoRes(req,res) {
  try{const { restaurante,categoria} = req.query;
  if(restaurante&&categoria){
    const producto = await Producto.find({restaurante, categoria, isDeleted:false});
    res.status(200).json(producto);
  }else if(restaurante){
    const producto = await Producto.find({restaurante, isDeleted:false});
    res.status(200).json(producto);
  }else if(categoria){
    const producto = await Producto.find({categoria, isDeleted:false});
    res.status(200).json(producto);
  }
   } catch(err){
   res.status(500).json(err);
   }
}

export async function createProducto(req, res) {
  try {
    const { name,  restaurante, categoria, precio} = req.body;
    const producto = new Producto({ name,  restaurante, categoria, precio});
    const resultado = await producto.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchProducto(req, res) {
  try{
    const { _id, ...updates } = req.body;
    const resultado = await Producto.findOneAndUpdate({_id, isDeleted : false},updates ,{ new: true, runValidators: true});
    console.log(updates);
    
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}

export async function deleteProducto(req, res) {
  try{
    const _id = req.params._id;
    const resultado = await Producto.findOneAndUpdate(_id, {isDeleted :true} ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}