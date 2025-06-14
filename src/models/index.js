import { readdirSync } from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelize.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
const files = readdirSync(__dirname).filter((file) => file.endsWith(".js") && file !== "index.js");

for (const file of files) {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href; // Convert to file:// URL
    const { default: modelDefiner } = await import(modelPath);
    const model = modelDefiner();

    db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
