import ProductB from "./product-b";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new ProductB("", "Product B", 100);
    }).toThrowError("product b: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new ProductB("123", "", 100);
    }).toThrowError("product b: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new ProductB("123", "Name", -1);
    }).toThrowError("product b: Price must be greater than zero");
  });

  it("should throw error when id, name and price out of rules", () => {
    expect(() => {
      const product = new ProductB("", "", -1);
    }).toThrowError(
      "product b: Id is required,product b: Name is required,product b: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new ProductB("123", "Product B", 100);
    product.changeName("Product B Name");
    expect(product.name).toBe("Product B Name");
  });

  it("should change price", () => {
    const product = new ProductB("123", "Product B", 100);
    product.changePrice(150);
    expect(product.price).toBe(300);
  });
});