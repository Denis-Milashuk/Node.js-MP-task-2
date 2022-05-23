"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class UserRepository {
  constructor() {
    this.users = new Array();
    this.users.push({
      id: "1",
      login: "Hard",
      password: "string",
      age: 33,
      isDeleted: false
    });
    this.users.push({
      id: "2",
      login: "Dima",
      password: "string",
      age: 4,
      isDeleted: false
    });
    this.users.push({
      id: "3",
      login: "Dimon",
      password: "string",
      age: 4,
      isDeleted: false
    });
  }

  getById(id) {
    return this.users.filter(user => !user.isDeleted).find(user => user.id === id);
  }

  create(user) {
    this.users.push(user);
  }

  update(updatedUser) {
    const userIndex = this.users.findIndex(user => user.id === updatedUser.id);

    if (userIndex === -1) {
      return false;
    } else {
      this.users[userIndex] = updatedUser;
      return true;
    }
  }

  getAutoSuggestUsers(loginSubstring, limit) {
    let users = this.users;
    if (loginSubstring) users = users.filter(user => user.login.search(loginSubstring) != -1);
    if (limit) users.length = limit;
    return users;
  }

  softDelete(id) {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return false;
    } else {
      this.users[userIndex].isDeleted = true;
      return true;
    }
  }

}

var _default = new UserRepository();

exports.default = _default;