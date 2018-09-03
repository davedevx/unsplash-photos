/* eslint no-console: 0 */

import express from 'express'

import { getPopularPhotos, getPhotosByKeyword } from '../../src/unsplash'

const router = express.Router()

router.get('/', (req, res) => res.send('Hello from API'))
router.get('/getPopularPhotos', async (req, res) => res.json(await getPopularPhotos(req.query)))
router.get('/searchPhotos', async (req, res) => res.json(await getPhotosByKeyword(req.query)))

export default router
