import { Op, Sequelize } from "sequelize";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Product } from "../models/product.model.js";
import sequelize from "../config/sequelize.config.js";

const ProductService = {
  async getSalesByPeriod(groupByPeriod = "all-time") {
    try {
      let dateFormat;

      switch (groupByPeriod) {
        case "year":
          dateFormat = "YEAR(order.actual_delivery_time)";
          break;
        case "quarter":
          dateFormat =
            "CONCAT(YEAR(order.actual_delivery_time), '-Q', QUARTER(order.actual_delivery_time))";
          break;
        case "month":
          dateFormat = "DATE_FORMAT(order.actual_delivery_time, '%Y-%m')";
          break;
        case "week":
          dateFormat = "YEARWEEK(order.actual_delivery_time, 3)"; // ISO week number
          break;
        default:
          dateFormat = null; // Không group theo thời gian nếu là 'all-time'
      }

      const attributes = [
        "product_id",
        [Sequelize.fn("SUM", Sequelize.col("OrderItem.quantity")), "total_sold"],
      ];

      if (dateFormat) {
        attributes.push([Sequelize.literal(dateFormat), "period"]);
      }

      const salesData = await OrderItem.findAll({
        attributes,
        include: [
          {
            model: Order,
            as: "Order",
            attributes: [],
            where: { status: "completed" },
          },
          {
            model: Product,
            as: "Product",
            attributes: ["product_name", "main_image"],
          }
        ],
        group: dateFormat ? ["OrderItem.product_id", "period"] : ["OrderItem.product_id"],
        order: [[Sequelize.literal("total_sold"), "DESC"]],
        limit: 5
      });

      return salesData.map((data) => data.toJSON());
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw new Error(error.message);
    }
  },
};

export default ProductService;
