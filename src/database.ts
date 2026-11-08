import { DataSource } from "typeorm";
import 'reflect-metadata'
import Product from "@/entities/product.entity"

const AppDatabase = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "ts_curso",
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