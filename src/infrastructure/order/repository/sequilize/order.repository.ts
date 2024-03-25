import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    // Get the order with the items
    const order = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    // Update the order
    order.customer_id = entity.customerId;
    order.total = entity.total();
    await order.save();

    // Update existing items and create new ones
    for (const item of entity.items) {
      const orderItem = order.items.find((i) => i.id === item.id);
      if (orderItem) {
        orderItem.name = item.name;
        orderItem.price = item.price;
        orderItem.product_id = item.productId;
        orderItem.quantity = item.quantity;
        await orderItem.save();
      } else {
        await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        });
      }
    }

    // Remove items that are not in the new list
    for (const item of order.items) {
      if (!entity.items.find((i) => i.id === item.id)) {
        await item.destroy();
      }
    }
  }

  async find(id: string): Promise<Order> {
    // find a order with the items by id
    try {
      const order = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });

      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
    } catch (error) {
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["items"],
    });
    return orders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
    });   
  }
}
