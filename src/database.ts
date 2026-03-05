import { DataSource } from "typeorm";
import 'reflect-metadata'
import Product from "@/entities/product.entity"

const AppDatabase = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "ts_curso",
    synchronize: true,
    logging: true,
    entities: [
        Product
    ],
    subscribers: [],
    migrations: [],
})

AppDatabase.initialize()
    .then(() => {console.log("Database iniciado")})
    .catch((error) => {console.log(error)})

export default AppDatabase