import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should add a new item to the order", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    order.addItem(item2);

    expect(order.items.length).toBe(2);
  });

  it("should remove a item from the order", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);

    order.removeItem("i1");

    expect(order.items.length).toBe(1);
    expect(order.items).not.toContain(item);
  });

  it("should throw error if remove an item that does not exist", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
      const order = new Order("o1", "c1", [item, item2]);

      order.removeItem("i3");
    }).toThrowError("Item not found");
  });

  it("should throw error if remove the last item", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      const order = new Order("o1", "c1", [item]);

      order.removeItem("i1");
    }).toThrowError("Items are required");
  });

  it("should change item quantity", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    order.changeItemQuantity("i1", 5);

    expect(order.items[0].quantity).toBe(5);
  });

  it("should throw error if change item quantity to 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      const order = new Order("o1", "c1", [item]);

      order.changeItemQuantity("i1", 0);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should calculate total after changing item quantity", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    order.changeItemQuantity("i1", 5);

    expect(order.total()).toBe(500);
  });

  it("should calculate total after adding a new item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    order.addItem(item2);

    expect(order.total()).toBe(600);
  });

  it("should calculate total after removing an item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);

    order.removeItem("i1");

    expect(order.total()).toBe(400);
  });

  it("should change a customer", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    order.changeCustomer("c2");

    expect(order.customerId).toBe("c2");
  });

  it("should throw error if change a customer to empty", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      const order = new Order("o1", "c1", [item]);

      order.changeCustomer("");
    }).toThrowError("CustomerId is required");
  });

});
