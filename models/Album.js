const mongoose = require('mongoose')

const albumSchemaMongoose = new mongoose.Schema({
  name: String,
  band: String,
  members: { type: String, default: '' },
  year: Number,
  genres: [String],
  songs: [{ songName: String, length: String }],
  score: { type: Number, default: 0.0 },
  scoreCount: { type: Number, default: 0 }

})

// Para encontrar albumes por nombre de banda
albumSchemaMongoose.query.byBandName = function (bandName) {
  return this.where({ band: new RegExp('^' + bandName, 'i') })
  // El flag 'i' hace que el matching no sea case-sensitive.
  // El "^" es para que matchee con el principio de la cadena,
  // en otro caso "tall" matchearia con la banda "Metallica" por ejemplo
}

// Para encontrar albumes por nombre del Album
albumSchemaMongoose.query.byAlbumName = function (albumName) {
  return this.where({ name: new RegExp(albumName, 'i') })
  // El flag 'i' hace que el matching no sea case-sensitive.
}

// Instance Method
// Para encontrar los albumes de la misma banda
albumSchemaMongoose.methods.sameBandAlbums = function (cb) {
  return this.model('Album').find({ band: this.band }, cb)
}

module.exports = mongoose.model('Album', albumSchemaMongoose)
// Es importante que se defina el Model luego de los instance methods
// porque en otro caso no andan.
