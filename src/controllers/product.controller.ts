import {Request, Response} from 'express'
import Product from '@/entities/product.entity'
import { validate } from 'class-validator'
import ProductRepository from '@/repositories/product.repository'
import ProductDTO from '@/dto/create.product.dto';

class ProductController {
    private productRepository
    private dto

    constructor(){
        this.productRepository = new ProductRepository
        this.dto = new ProductDTO
    }

    findAll = async (request: Request, response: Response) => {
        const products = await this.productRepository.findAll()

        return response.status(200).send({
            products: products
        })
    }

    findOne = async (request: Request, response: Response) => {
        this.dto.uuid = request.params.uuid as string
        await this.validateDTO(this.dto, response)

        const product = await this.productRepository.findOneBy(this.dto)

        if (product) {
            return response.status(200).send({
                product: product,
                message: "Produto recuperado com sucesso"
            })
        } else {
            return response.status(404).send({
                message: "Produto não encontrado"
            })
        }
    }

    create = async (request: Request, response: Response) => {
        this.dto.name = request.body.name
        this.dto.description = request.body.description
        await this.validateDTO(this.dto, response)

        const product = await this.productRepository.save(this.dto)

        return response.status(201).send({
            product: product,
            message: 'Produto criado com sucesso'
        })
    }

    update = async (request: Request, response: Response) => {
        this.dto.uuid = request.params.uuid as string
        this.dto.name = request.body.name
        this.dto.description = request.body.description
        await this.validateDTO(this.dto, response)

        const editProduct = await this.productRepository.update(this.dto)

        if (editProduct) {
            return response.status(200).send({
                product: editProduct,
                message: "Produto editado com sucesso"
            })
        } else {
            return response.status(404).send({
                message: "Erro ao editar produto"
            })
        }

    }

    delete = async (request: Request, response: Response) => {
        this.dto.uuid = request.params.uuid as string
        await this.validateDTO(this.dto, response)
        
        const deleteProduct = await this.productRepository.delete(this.dto)

        if (deleteProduct) {
            return response.status(204).send({
                message: "Produto deletado com sucesso"
            })
        } else {
            return response.status(404).send({
                message: "Erro ao deletar produto"
            })
        }
    }

    validateDTO = async (dto: ProductDTO, response: Response) => {
        const errors = await validate(dto)

        if (errors.length > 0) {
            return response.status(422).send({
                errors: errors
            })
        }
    }
}

export default new ProductController