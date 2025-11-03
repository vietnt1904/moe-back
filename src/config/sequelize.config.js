import { Sequelize } from "sequelize";
import { RENDER_DB_URL } from "./config.js";

const sequelize = new Sequelize(
  RENDER_DB_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Bắt buộc cho Render free plan
      },
    },
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ Kết nối Render PostgreSQL thành công!");
} catch (error) {
  console.error("❌ Kết nối thất bại:", error.message);
}

export default sequelize;
