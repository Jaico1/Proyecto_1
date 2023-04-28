const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema(
  {
    // campos
    email: {type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: {type: String, required: true},
    cell: {type: Number, required: true, unique:true},
    direccion: {type: String, required: true},
    tipo: {type: String, required: true, enum: ["cliente","administrador","domiciliario"]},

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('usuario', usuarioSchema);
