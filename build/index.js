"use strict";

var _express = _interopRequireDefault(require("express"));

var _UserRouter = _interopRequireDefault(require("./src/router/UserRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 8080;
app.use(_express.default.json());
app.use("/users", _UserRouter.default);
app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));