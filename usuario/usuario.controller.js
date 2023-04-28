
import Usuario from './usuario.model';

export async function getUsuario(req,res) {
   const { _id, email, password } = req.query;
   console.log(_id)
   let usuarios = [];
  try{
    if(_id){
     usuarios = await Usuario.findOne({_id, isDeleted:false});
    //res.status(200).json(usuarios);
  }else if(email&&password){
     usuarios = await Usuario.findOne({email, password, isDeleted:false});
    //res.status(200).json(usuarios);
  }
  res.status(200).json(usuarios);
  }catch(err){
    res.status(500).json(err);
  }

}

export async function createUsuario(req, res) {
  try {
    const { name, email, password, direccion, tipo, cell } = req.body;
    const usuario = new Usuario({ name, email, password, direccion, tipo, cell });
    const resultado = await usuario.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUsuario(req, res) {
  try{
    // se busca por el id y los cambios que se enviarion al body
    const { _id, ...updates } = req.body;
    const resultado = await Usuario.findOneAndUpdate({_id, isDeleted : false},updates ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 

}

export async function deleteUsuario(req, res) {
  try{
    const _id = req.params._id;
    const resultado = await Usuario.findOneAndUpdate(_id, {isDeleted :true} ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}