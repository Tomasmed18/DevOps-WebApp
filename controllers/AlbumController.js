const HttpRequest = require('request')

/*
Esta funcion fue escrita con la intencion de recibir un objeto JSON en la request, ya sea en FORM, o en lectura de un archivo.
Se recomienda que si se usa bodyparser, se utilice de la siguiente forma:
    app.use(bodyParser.json());
En el archivo de definicion de la aplicacion express.
*/
module.exports.createAlbum = function (req, res) {
  const genresArray = req.body.genres.split(',')
  // obtener todas las canciones del body

  let i = 1
  const songArray = []
  while (req.body['song' + i.toString()] != null) {
    songArray.push(
      {
        songName: req.body['song' + i.toString()],
        length: req.body['length' + i.toString()]
      })
    i = i + 1
  }

  const newAlbum =
      {
        name: req.body.name,
        band: req.body.band,
        members: req.body.members,
        year: req.body.year,
        genres: genresArray,
        songs: songArray,
        score: 0.0,
        scoreCount: 0
      }

  HttpRequest.post({ url: 'http://localhost:3000/Api/albums', body: newAlbum, json: true }, function (error, response, req) {
    if (error) {
      res.status(404)
    } else {
      res.redirect('../albums')
    }
  })
}

module.exports.createAlbumMenu = function (req, res) {
  res.render('../views/createAlbumMenu.ejs')
}

module.exports.updateAlbumMenu = function (req, res) {
  const id = req.params.id
  HttpRequest.get('http://localhost:3000/Api/albumById/' + id, function (error, response, album) {
    if (error) {
      res.status(404)
    } else {
      res.render('../views/updateAlbumMenu.ejs', { album: JSON.parse(album) })
    }
  })
}

module.exports.updateAlbumById = function (req, res) {
  const id = req.params.id
  const body = req.body
  console.log(req.body)

  const edit = {}
  edit['name'] = body.name
  edit['band'] = body.band
  edit['genres'] = body.genres
  if (body.members !== '') edit['members'] = body.members
  else edit['members'] = ''
  edit['year'] = body.year

  const songArray = []
  let i = 1

  while (body['song' + i.toString()] != null) {
    if (body['song' + i.toString()] !== '') {
      songArray.push(
        {
          songName: body['song' + i.toString()],
          length: body['length' + i.toString()]
        })
    }
    i = i + 1
  }

  edit['songs'] = songArray

  HttpRequest.put({ url: 'http://localhost:3000/Api/albums/' + id, body: edit, json: true }, function (error, response, album) {
    if (error) {
      res.status(404)
    } else {
      res.redirect('../albumById/' + id)
    }
  })
}

module.exports.getAllAlbums = function (req, res) {
  HttpRequest.get('http://localhost:3000/Api/albums', function (error, response, albums) {
    if (error) {
      res.status(404)
    } else {
      res.render('../views/allAlbums.ejs', { albums: JSON.parse(albums) })
    }
  })
}

module.exports.getAlbumsByName = function (req, res) {
  const albumName = req.params.albumName
  HttpRequest.get('http://localhost:3000/Api/albums/' + albumName, function (error, response, albums) {
    if (error) {
      res.status(404)
    } else {
      res.render('../views/searchAlbums.ejs', { albums: JSON.parse(albums) })
    }
  })
}

module.exports.getAlbumsFromBand = function (req, res) {
  const bandName = req.params.bandName
  HttpRequest.get('http://localhost:3000/Api/bands/' + bandName, function (error, response, albums) {
    if (error) {
      res.status(404)
    } else {
      res.render('../views/searchBands.ejs', { albums: JSON.parse(albums) })
    }
  })
}

module.exports.getAlbumById = function (req, res) {
  const id = req.params.id
  HttpRequest.get('http://localhost:3000/Api/albumById/' + id, function (error, response, album) {
    if (error) {
      res.status(404)
    } else {
      res.render('../views/album.ejs', { album: JSON.parse(album) })
    }
  })
}

/*
Debido a que para eliminar un album debo proporcionar un nombre, se tiene que hay un problema de matcheo con nombres con espacios.
Esto es porque en la url no puedo poner por ejemplo "/albums/death magnetic" ya que hay un espacio.
El workaround es usar un WORD_SEPARATOR (como -, o +), tipo death-magnetic, death+magnetic
y luego procesarlo aca dentro para agregarle el punto (cualquier character, o directamente espacio) en la regExp para hacer matching
*/

module.exports.deleteAlbum = function (req, res) {
  const albumName = req.params.albumName
  const bandName = req.params.bandName
  console.log('album to delete ' + albumName)
  HttpRequest.delete('http://localhost:3000/Api/albums/' + albumName + '/' + bandName, function (error, response, album) {
    if (error) {
      res.status(404)
    } else {
      res.redirect('../albums')
    }
  })
}

module.exports.deleteAlbumById = function (req, res) {
  const id = req.params.id
  HttpRequest.delete('http://localhost:3000/Api/albums/' + id, function (error, response, album) {
    if (error) {
      res.status(404)
    } else {
      res.redirect('../albums')
    }
  })
}

module.exports.rateAlbumById = function (req, res) {
  const id = req.params.id
  const rate = req.params.rate
  HttpRequest.get('http://localhost:3000/Api/rateAlbumById/' + id + '/' + rate, function (error, response) {
    if (error) {
      res.status(404)
    } else {
      res.redirect('back')
    }
  })
}
