const express = require("express"); // 引用 Express 與 Express 路由器
const router = express.Router(); // 準備引入路由模組

const home = require("./modules/home"); // 引入 home 模組程式碼
const todos = require("./modules/todos");
const auth = require("./modules/auth");
const users = require("./modules/users")

const { authenticator } = require("../middleware/auth"); // 進到路由之前需要先通過auth檢查是否登入

//    !!!!!!!!!!!!注意先後順序!!!!!!!!!!!!!!
router.use("/auth", auth);
router.use("/users", users);
router.use("/todos", authenticator, todos); // 將網址結構符合 /todos 字串的request 導向 todos /todos
router.use("/", authenticator, home); // 將網址結構符合 / 字串的 request 導向 home 模組

module.exports = router; // 匯出路由器
