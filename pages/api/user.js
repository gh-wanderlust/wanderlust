export default (req, res) => {
  if (req.method === 'GET') {

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
  }

  if (req.method === 'POST') {
    console.log(req.body)
    res.end(JSON.stringify({ name: 'POST MALONE' }))
  }
}
