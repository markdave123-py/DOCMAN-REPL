"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const addSuperAdmin_1 = require("./utils/addSuperAdmin");
const userRoute_1 = require("./routes/userRoute");
const verifyToken_1 = require("./middlewares/verifyToken");
const admin_route_1 = require("./routes/admin.route");
const docRoute_1 = require("./routes/docRoute");
const acceptInvite_route_1 = require("./routes/acceptInvite.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/', userRoute_1.router);
app.use(verifyToken_1.verifyJwt);
app.use('/', admin_route_1.adminRouter);
app.use('/', docRoute_1.docRoute);
app.use('/', acceptInvite_route_1.inviteRoute);
(0, database_1.connectToDatabase)()
    .then(() => {
    console.log(`sucessfully connected to the database ${env_1.config.mongoUrl}`);
    app.listen(env_1.config.port, async () => {
        await (0, addSuperAdmin_1.addAdminToDb)();
        console.log(`Server is running on http://localhost:${env_1.config.port} `);
    });
});
//# sourceMappingURL=main.js.map