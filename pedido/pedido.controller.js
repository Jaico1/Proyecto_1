
import Pedido from './pedido.model';
import Restaurante from '../restaurante/restaurante.model';

export async function getPedido(req,res) {
  try{ 
    const { _id } = req.query;
    const pedido = await Pedido.find({_id, isDeleted:false});
    res.status(200).json(pedido);
  }catch(err){
    res.status(500).json(err);
  }
}

export async function createPedido(req, res) {
  try {
    const { restaurante, domiciliario, cliente, productos, cantidad, precio} = req.body;
    const pedido = new Pedido({ restaurante, domiciliario, cliente, productos, cantidad, precio });
    const resultado = await pedido.save(); 
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchPedido(req, res) {
  try{
    const { _id, ...updates } = req.body;
    const resultado = await Pedido.findOneAndUpdate({_id, isDeleted : false},updates ,{ new: true, runValidators: true});
    console.log(updates);
    if(updates.estado=="realizado"){
      const tempRes = await Restaurante.findOne(resultado.restaurante )
      let resCont = tempRes.numPedidos;
      resCont=resCont+1;
      let cambio={};
      cambio.numPedidos = resCont;
      const restauranteNew = await Restaurante.findOneAndUpdate(resultado.restaurante , cambio,{ new: true, runValidators: true});
      console.log(restauranteNew);
    }
    res.status(200).json(resultado);
  } catch(err){
      console.log(err)
      res.status(500).json(err);
  } 
}

export async function deletePedido(req, res) {
  res.status(200).json({});
}