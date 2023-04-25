const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Nombra tu pedido.'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('pedido', pedidoSchema);
