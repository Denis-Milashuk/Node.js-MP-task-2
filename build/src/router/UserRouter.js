"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRepository = _interopRequireDefault(require("../repository/userRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/:id", (req, res) => {
  const user = _userRepository.default.getById(req.params.id);

  if (!user) res.sendStatus(404);
  res.json(user);
});
router.post("/", (req, res) => {
  const user = req.body;

  _userRepository.default.create(user);

  res.sendStatus(201);
});
router.put("/", (req, res) => {
  const newUser = req.body;

  const oldUser = _userRepository.default.getById(newUser.id);

  if (!oldUser) res.sendStatus(404);

  _userRepository.default.update(newUser);

  res.send("Updated");
});
router.get("/", (req, res) => {
  const loginSubstring = req.query.loginSubstring;
  const limit = req.query.limit;
  res.json(_userRepository.default.getAutoSuggestUsers(loginSubstring, limit));
});
router.delete("/:id", (req, res) => {
  const isDeleted = _userRepository.default.softDelete(req.params.id);

  if (!isDeleted) res.sendStatus(404);
  res.send("Deleted");
});
var _default = router;
exports.default = _default;