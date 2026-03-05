import {Request, Response, Router} from "express"
import productController from '@/controllers/product.controller'

const routes = Router()

routes.get('/api/products', productController.findAll)
routes.get('/api/products/:uuid', productController.findOne)
routes.post('/api/products', productController.create)
routes.put('/api/products/:uuid', productController.update)
routes.delete('/api/products/:uuid', productController.delete)

routes.get('/', function (request: Request, response: Response) {
    response.send('Hello World')
})

export default routes