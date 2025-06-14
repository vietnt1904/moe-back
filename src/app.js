const PORT = 3050;
import { createServer } from "node:http";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import db from "./models/index.js";
import route from "./routes/index.js";

const app = express();
const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// setup terminal logger
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

/* check db connection */
try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully!");
} catch (error) {
    console.error("Error occurs when connecting to database!", error);
}

// Create an HTTP server using the Express app
const httpServer = createServer(app);

// Initialize Socket.IO with the HTTP server
export const io = new Server(httpServer, {
    cors: corsOptions, // Use the same CORS options
});

// Socket.IO connection handler
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

httpServer.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can not start", err);
    }
});

route(app);
