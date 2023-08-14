import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product Name",
        price: 1000
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product Name");
    expect(response.body.price).toBe(1000);
  });

    it("should not create a product", async () => {
      const response = await request(app).post("/product").send({
        name: "Product Name",
      });
      expect(response.status).toBe(500);
    });
  
    it("should list all products", async () => {
      const response = await request(app)
        .post("/product")
        .send({
          type: "a",
          name: "Product A Name",
          price: 1000
        });
  
      expect(response.status).toBe(200);
  
      const response2 = await request(app)
        .post("/product")
        .send({
          type: "b",
          name: "Product B Name",
          price: 2000
        });
      expect(response2.status).toBe(200);
  
      const listResponse = await request(app).get("/product").send();
  
      expect(listResponse.status).toBe(200);
      expect(listResponse.body.products.length).toBe(2);
      const product = listResponse.body.products[0];
      expect(product.name).toBe("Product A Name");
      expect(product.price).toBe(1000);
      const product2 = listResponse.body.products[1];
      expect(product2.name).toBe("Product B Name");
      expect(product2.price).toBe(4000);
      
    });

});