/**
 * Dependencies
 */
const http = require('http')
const manner = require('manner')
const folder = require('manner-folder')

//Create Manner service
const api = manner(folder(__dirname + '/v1'))

//Serve Manner API
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  api(req, res).pipe(res)
}).listen(4000)