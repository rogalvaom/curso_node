import Product from "@/entities/product.entity"
import AppDatabase from '@/database'
import ProductDTO from "@/dto/create.product.dto";

class ProductRepository {
    private repository;

    constructor(){
        this.repository = AppDatabase.getRepository(Product)
    }

    async findAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async findOneBy(input: ProductDTO): Promise<Product>{
        return await this.repository.findOneBy({ uuid: input.uuid })
    }

    async save(input: ProductDTO): Promise<Product>{
        const product = new Product
        product.name = input.name
        product.description = input.description
        return await this.repository.save(product)
    }

    async update(input: ProductDTO): Promise<Product>{
        const product = await this.repository.findOneBy({ uuid: input.uuid })
        if (product) {
            product.name = input.name
            product.description = input.description
            return await this.repository.save(product)
        } else {
            return null
        }
    }

    async delete(input: ProductDTO): Promise<boolean>{
        const result = await this.repository.delete({ uuid: input.uuid })
        return result.affected > 0
    }
}

export default ProductRepository