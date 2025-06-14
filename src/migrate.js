import db from "./models/index.js";

const migrate = async () => {
    try {
        // check connection
        await db.sequelize.authenticate();
        console.log("Database connected successfully!");

        // migrate database
        await db.sequelize.sync();
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    } finally {
        await db.sequelize.close();
    }
};

migrate();
