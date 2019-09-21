// funcion para agregar nuevos text fields para canciones cada vez que se aprieta el boton "+"
var add = function () {
  const row = document.createElement('div')
  row.setAttribute('class', 'row')
  const colName = document.createElement('div')
  colName.setAttribute('class', 'col-7')
  const colLength = document.createElement('div')
  colLength.setAttribute('class', 'col-4')
  row.appendChild(colName)
  row.appendChild(colLength)

  const i = (document.getElementById('SongList').childElementCount) / 2 + 1

  var inputSong = document.createElement('input')
  colName.appendChild(inputSong)
  inputSong.setAttribute('name', 'song' + i.toString())
  inputSong.setAttribute('type', 'text')
  inputSong.setAttribute('class', 'form-control')
  inputSong.setAttribute('placeholder', 'Song name')
  inputSong.setAttribute('required', 'true')

  var inputLength = document.createElement('input')
  colLength.appendChild(inputLength)
  inputLength.setAttribute('name', 'length' + i.toString())
  inputLength.setAttribute('type', 'text')
  inputLength.setAttribute('class', 'form-control')
  inputLength.setAttribute('placeholder', 'Length')

  row.setAttribute('id', 'row' + i.toString())
  document.getElementById('SongList').appendChild(row)
  document.getElementById('SongList').appendChild(document.createElement('br'))
}

// elimina la ultima cancion en la interfaz
var remove = function () {
  // eliminar la ultima cancion
  var select = document.getElementById('SongList')
  const i = (select.childElementCount) / 2
  const row = document.getElementById('row' + i.toString())
  row.parentNode.removeChild(row)

  // eliminar el <br>
  select.removeChild(select.lastElementChild)
}
