const jsonServer = require('json-server')
const mockData = require('./mock.js')

const server = jsonServer.create()
const router = jsonServer.router(mockData())
const middlewares = jsonServer.defaults({
  static: 'notes',
  bodyParser: true
})
//处理文件上传的代码
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

server.use(middlewares)
server.use(router)

server.listen(5000,()=>{
  console.log('JSON Server is running')
})