import { Sequelize } from "sequelize";
import { DATABASE, DBHOST, DIALECT, PASSWORD, USERNAME } from "./config.js";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: DBHOST,
    dialect: DIALECT,
});

export default sequelize;
