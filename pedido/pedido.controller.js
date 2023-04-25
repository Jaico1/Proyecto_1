
import Pedido from './pedido.model';

export async function getPedido(req,res) {
  // const { name } = req.query;

  const pedidos = await pedido.find(req.query);

  res.status(200).json(pedidos);
}

export async function createPedido(req, res) {
  try {
    const { name } = req.body;
    const pedido = new Pedido({ name });
    const resultado = await pedido.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchPedido(req, res) {
  res.status(200).json({});
}

export async function deletePedido(req, res) {
  res.status(200).json({});
}