const USERNAME = 'Tomas'
const PASS = 'Contrasenia'
const DATABASE = 'bandsDB'
const mongoose = require('mongoose')
const url = `mongodb://${USERNAME}:${PASS}@mongo:27017/${DATABASE}`
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Album = require('../models/Album')

/*
Esta funcion fue escrita con la intencion de recibir un objeto JSON en la request, ya sea en FORM, o en lectura de un archivo.
Se recomienda que si se usa bodyparser, se utilice de la siguiente forma:
    app.use(bodyParser.json());
En el archivo de definicion de la aplicacion express.
*/

module.exports.createAlbum = function (req, res) {
  if (req.body) {
    const newAlbum = new Album(
      {
        name: req.body.name,
        band: req.body.band,
        members: req.body.members,
        year: req.body.year,
        genres: req.body.genres,
        songs: req.body.songs,
        score: req.body.score,
        scoreCount: req.body.scoreCount
      }
    )

    newAlbum.save(function (err, result) {
      if (err) {
        res.status(404).json({ error: 'unexpected error, album could not be saved' })
        return
      }
      res.status(200).json(result)
    })
  }
}

/*
Logica similar al agregar album. req.body debe tener logica de un objeto JSON.
Se comprobó que no es necesario hacer save del objeto para que se guarde en la base de datos.
*/
module.exports.updateAlbum = function (req, res) {
  if (req.body) {
    console.log(`------- UPDATE ALBUM ${req.params.albumName} -------`)

    const rexpName = new RegExp('(^' + req.params.albumName + '$)', 'i')
    const rexpBand = new RegExp('(^' + req.params.bandName + '$)', 'i')

    Album.updateMany({ name: rexpName, band: rexpBand }, req.body,
      function (err, result) {
        if (err) {
          res.status(404).json({ error: 'unexpected error, album could not be updated' })
        }
        res.status(200).json(result)
      })
  }
}

module.exports.updateAlbumById = function (req, res) {
  if (req.params && req.params.id) {
    console.log(req.body)

    Album.updateOne({ _id: req.params.id }, req.body,
      function (err, result) {
        if (err) { res.status(404).json({ error: 'unexpected error, album could not be updated' }) } else {
          res.status(200).json(result)
        }
      }
    )
  }
}

module.exports.getAllAlbums = function (req, res) {
  console.log('------- GET ALL ALBUMS -------')

  Album.find({}, function (err, albums) {
    if (!albums) {
      res.status(404).json({ error: 'albums could not be found' })
      return
    } else if (err) {
      res.status(404).json({ error: 'unexpected error' })
      return
    }

    res.status(200).json(albums)
  })
}

module.exports.getAlbum = function (req, res) {
  if (req.params && req.params.albumName) {
    console.log(`------- GETTING ALBUM ${req.params.albumName} -------`)

    Album.find().byAlbumName(req.params.albumName).exec(function (err, albums) {
      if (!albums) {
        res.status(404).json({ error: 'album could not be found' })
        return
      } else if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }

      let response = ''
      for (const a in albums) {
        response += ' ' + albums[a].name + ' - ' + albums[a].band + '\n'
      }

      console.log(response)
      res.status(200).json(albums)
    })
  }
}

module.exports.getAlbumById = function (req, res) {
  if (req.params && req.params.id) {
    console.log(`------- GET ALBUM by id = ${req.params.id} ------- `)

    Album.find({ _id: req.params.id }).exec(function (err, album) {
      if (!album) {
        res.status(404).json({ error: 'album could not be found' })
        return
      } else if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }

      console.log(album)
      res.status(200).json(album)
    })
  }
}

module.exports.getAlbumsFromBand = function (req, res) {
  if (req.params && req.params.bandName) {
    console.log(`------- GET ALL ALBUMS FROM BAND ${req.params.bandName} ------- `)

    Album.find().byBandName(req.params.bandName).exec(function (err, albums) {
      if (!albums) {
        res.status(404).json({ error: 'albums could not be found' })
        return
      } else if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }

      console.log("Query of albums of band '" + req.params.bandName + " ' ")

      let response = ''
      for (const a in albums) {
        response += ' ' + albums[a].name + ' - ' + albums[a].band + '\n'
      }

      console.log(response)
      res.status(200).json(albums)
    })
  }
}

/*
Debido a que para eliminar un album debo proporcionar un nombre, se tiene que hay un problema de matcheo con nombres con espacios.
Esto es porque en la url no puedo poner por ejemplo "/albums/death magnetic" ya que hay un espacio.
El workaround es usar un WORD_SEPARATOR (como -, o +), tipo death-magnetic, death+magnetic
y luego procesarlo aca dentro para agregarle el punto (cualquier character, o directamente espacio) en la regExp para hacer matching
*/
module.exports.deleteAlbum = function (req, res) {
  if (req.params && req.params.albumName && req.params.bandName) {
    console.log(`------- DELETE ALBUM  ${req.params.albumName} -------`)

    const rexpName = new RegExp('(^' + req.params.albumName + '$)', 'i')
    const rexpBand = new RegExp('(^' + req.params.bandName + '$)', 'i')

    Album.deleteOne({ name: rexpName, band: rexpBand }, function (err, result) {
      if (result['deletedCount'] === 0) {
        res.status(404).json({ error: ' album could not be deleted ' })
        return
      } else if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }
      console.log(result)
      res.status(200).json(result)
    })
  }
}

module.exports.deleteAlbumById = function (req, res) {
  if (req.params && req.params.id) {
    console.log(`------- Delete album by id = ${req.params.id} ------- `)

    Album.deleteOne({ _id: req.params.id }, function (err, result) {
      if (result['deletedCount'] == 0) {
        res.status(404).json({ error: ' album could not be deleted ' })
        return
      } else if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }

      console.log(result)
      res.status(200).json(result)
    })
  }
}

module.exports.rateAlbumById = function (req, res) {
  if (req.params && req.params.id && req.params.rate) {
    console.log(`api rate id: ${req.params.id}  rate:  ${req.params.rate} `)

    Album.find({ _id: req.params.id }).exec(function (err, albums) {
      if (err) {
        res.status(404).json({ error: 'unexpected error' })
        return
      }

      const albumInfo = albums[0]
      // refer to https://stackoverflow.com/questions/28820904/how-to-efficiently-compute-average-on-the-fly-moving-average
      const newScore = albumInfo.score + (req.params.rate - albumInfo.score) / (albumInfo.scoreCount + 1)
      const newBody = {
        scoreCount: albumInfo.scoreCount + 1,
        score: newScore
      }

      Album.updateOne({ _id: req.params.id }, newBody, function (err, result) {
        if (err) {
          res.status(404).json({ error: 'unexpected error' })
          return
        }
        res.status(200).json(result)
      })
    })
  }
}
