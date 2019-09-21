const express = require('express')
const router = express.Router()
const controllerAlbums = require('../controllers/AlbumController.js')

// agrego esto para que vaya a algun lugar cuando pedis ir a root
router.get('/', controllerAlbums.getAllAlbums)

router.get('/albums', controllerAlbums.getAllAlbums)
router.get('/albums/:albumName', controllerAlbums.getAlbumsByName)
router.get('/bands/:bandName', controllerAlbums.getAlbumsFromBand)

router.get('/albumById/:id', controllerAlbums.getAlbumById)
router.get('/deleteAlbumById/:id', controllerAlbums.deleteAlbumById)
router.get('/rateAlbumById/:id/:rate', controllerAlbums.rateAlbumById)

router.get('/createAlbumMenu', controllerAlbums.createAlbumMenu)

router.post('/albums', controllerAlbums.createAlbum)

// router.delete('/albums/:albumName/:bandName',controllerAlbums.deleteAlbum);

router.get('/updateAlbumMenu/:id', controllerAlbums.updateAlbumMenu)
router.post('/updateAlbumById/:id', controllerAlbums.updateAlbumById)

module.exports = router
