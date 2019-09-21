const express = require('express')
const router = express.Router()
const apiController = require('../controllers/ApiController.js')

router.get('/albums', apiController.getAllAlbums)

router.get('/albums/:albumName', apiController.getAlbum)
router.get('/bands/:bandName', apiController.getAlbumsFromBand)

router.get('/albumById/:id', apiController.getAlbumById)
router.get('/rateAlbumById/:id/:rate', apiController.rateAlbumById)

router.post('/albums', apiController.createAlbum)

router.delete('/albums/:albumName/:bandName', apiController.deleteAlbum)
router.delete('/albums/:id', apiController.deleteAlbumById)

router.put('/albums/:albumName/:bandName', apiController.updateAlbum)
router.put('/albums/:id', apiController.updateAlbumById)

module.exports = router
