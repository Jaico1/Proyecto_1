
import Pedido from './pedido.model';
import Restaurante from '../restaurante/restaurante.model';

export async function getPedido(req,res) {
  try{ 
    // se recibe un id y se usa en la funcion findOne
    const { _id } = req.query;
    const pedido = await Pedido.findOne({_id, isDeleted:false});
    res.status(200).json(pedido);
  }catch(err){
    res.status(500).json(err);
  }
}

export async function getPedidoNoAceptado(req,res) {
  try{ 
    // se envian los pedidos en estado enviado
    const pedido = await Pedido.find({estado: "enviado", isDeleted:false});
    res.status(200).json(pedido);
  }catch(err){
    res.status(500).json(err);
  }
}

export async function getPedidoUserDate(req,res) {
  try{ 
    const { domiciliario, cliente, restaurante, fechaInicial, fechaFinal } = req.query;

    let query= {isDeleted: false}; // se crea un objeto query donde estaran los filtos 

    // solo se agreaga un key al objeto si este se encuentra en el query de express
    if(domiciliario){
      query.domiciliario= domiciliario;
    }
    if(cliente){
      query.cliente = cliente;
    }
    if(restaurante){
      query.restaurante = restaurante;
    }
    if (fechaInicial && fechaFinal){
      query.createdAt = {$gte: new Date(fechaInicial), $lte:new Date(fechaFinal)};
    }  
    let pedidos = [];

    // solo hara el find() si el query contiene algo para evitar que se envien todos los pedidos hechos 
    if (Object.keys(req.query).length > 0) {
      pedidos = await Pedido.find(query);
    }

    res.status(200).json(pedidos);
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
    
    // se suma 1 al valor de numPedidos en el restaurante que se realizo el pedido
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
  try{
    const _id = req.params._id;
    const resultado = await Pedido.findOneAndUpdate(_id, {isDeleted :true} ,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch(err){
    res.status(500).json(err);
  } 
}