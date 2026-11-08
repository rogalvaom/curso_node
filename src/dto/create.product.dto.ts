import { IsNotEmpty, Length } from 'class-validator'; 

class ProductDTO {
    uuid: string

    @IsNotEmpty()
    @Length(3.255)
    name: string

    @IsNotEmpty()
    @Length(3.255)
    description: string
}

export default ProductDTO