const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema(
  {
    // campos
    restaurante: { type: mongoose.Schema.Types.ObjectId, ref: "restaurante", required: true ,immutable: true, validate: {validator: async function (id){
      const restaurante = await mongoose.model("restaurante").findOne({_id:id});
      if(restaurante==null || restaurante.isDeleted ==true){
        throw new Error('No se encontro el restaurante');
      }
    }}},
    domiciliario: {type: mongoose.Schema.Types.ObjectId, ref: "usuario", required: true, validate: {validator: async function (id){
      const user = await mongoose.model("usuario").findOne({_id:id});
      if(user==null || user.tipo!="domiciliario"|| user.isDeleted ==true){
        throw new Error('No se encontro el domiciliario');
      }
    }}},
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "usuario", required: true, immutable: true, validate: {validator: async function (id){
      const user = await mongoose.model("usuario").findOne({_id:id});
      if(user==null || user.tipo!="cliente"|| user.isDeleted ==true){
        throw new Error('No se encontro el cliente');
      }
    }, }},
    productos: [{ producto:{type: mongoose.Schema.Types.ObjectId, ref:"producto", required: true, validate: {validator: async function (id){
      const producto = await mongoose.model("producto").findOne({_id:id});
      if(producto==null || producto.isDeleted ==true){
        throw new Error('No se encontro el producto');
      }
    }}},
    cantidad:{type:Number, required:true}}
    ],
    precio: { type: Number, required:true },
    estado: { type: String, required: true, default:"creado", enum: ["creado","enviado","aceptado","recibido", "en direccion", "realizado"]},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('pedido', pedidoSchema);
