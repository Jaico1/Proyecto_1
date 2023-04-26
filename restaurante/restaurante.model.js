const mongoose = require('mongoose');

const restauranteSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: true },
    categoria:{type: String, required: true },
    numPedidos:{type: Number, default: 0},
    isDeleted: { type: Boolean, default: false},
  },
  { timestamps: true }
);

export default mongoose.model('restaurante', restauranteSchema);
