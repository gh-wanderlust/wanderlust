const express= require('express')
const next = require('next')

const PORT = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'

const app =  next({dev})
const handle = app.getRequestHandler()


app.prepare().then(() => {
  const server = express()
  const movieRoutes = require('./routes/index')

  // server.use('/api', movieRoutes)
  server.get('/api/users', (req, res) => {
    res.send('hello from /api/users!!')
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
}).catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})
