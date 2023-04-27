const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: true, },
    restaurante: {type: mongoose.Schema.Types.ObjectId, ref: "restaurante", required: true, validate: {validator: async function (id){
      const restaurante = await mongoose.model("restaurante").findOne({_id:id});
      if(restaurante==null || restaurante.isDeleted ==true){
        throw new Error('No se encontro el restaurante');
      }
    }}}, 
    categoria: {type: String , required: true},
    precio : {type: Number, required: true},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('producto', productoSchema);
