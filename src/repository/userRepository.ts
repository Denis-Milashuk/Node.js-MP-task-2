import { User } from "../model/User";

class UserRepository {
  private readonly users: Array<User>;

  constructor() {
    this.users = new Array<User>();
    this.users.push({
      id: "1",
      login: "Hard",
      password: "string",
      age: 33,
      isDeleted: false,
    });

    this.users.push({
      id: "2",
      login: "Dima",
      password: "string",
      age: 4,
      isDeleted: false,
    });

    this.users.push({
      id: "3",
      login: "Dimon",
      password: "string",
      age: 4,
      isDeleted: false,
    });
  }

  public getById(id: string): User | undefined {
    return this.users.filter((user) => !user.isDeleted).find((user) => user.id === id);
  }

  public create(user: User): void {
    this.users.push(user);
  }

  public update(updatedUser: User): boolean {
    const userIndex: number = this.users.findIndex((user) => user.id === updatedUser.id);
    if (userIndex === -1) {
      return false;
    } else {
      this.users[userIndex] = updatedUser;
      return true;
    }
  }

  public getAutoSuggestUsers(loginSubstring?: string, limit?: number) {
    let users: Array<User> = this.users;

    if (loginSubstring) users = users.filter((user) => user.login.search(loginSubstring) != -1);
    if (limit) users.length = limit;

    return users;
  }

  public softDelete(id: string): boolean {
    const userIndex: number = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    } else {
      this.users[userIndex].isDeleted = true;
      return true;
    }
  }
}

export default new UserRepository();
