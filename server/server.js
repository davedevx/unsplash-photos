/* eslint no-console: 0 */

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'

import routes from './routes'

const app = express()

const APP_SERVER_HOST = 8080

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', routes)

if (app.get('env') === 'development') {
  app.use(logger('dev'))
}

app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})
app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({
      error: {
        type: 'error',
        title: 'Something failed',
        description: 'Please try again.',
      },
    })
  } else {
    next(err)
  }
})
app.use((req, res) => {
  res.status(404).json({
    error: {
      type: 'error',
      title: 'Not found',
      description: 'Please try again.',
    },
  })
})

app.listen(APP_SERVER_HOST, () => {
  console.log(`Express app listening on port ${APP_SERVER_HOST}`)
})
