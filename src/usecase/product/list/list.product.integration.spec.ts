import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);
    
        const productA = new Product("12345", "Product A Name", 1000);
        await productRepository.create(productA);

        const productB = new Product("54321", "Product B Name", 2000);
        await productRepository.create(productB);
    
        const output = await usecase.execute({});
    
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productA.id);
        expect(output.products[0].name).toBe(productA.name);
        expect(output.products[0].price).toBe(productA.price);
        expect(output.products[1].id).toBe(productB.id);
        expect(output.products[1].name).toBe(productB.name);
        expect(output.products[1].price).toBe(productB.price);
    });
});