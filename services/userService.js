import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    try {
      const users = userRepository.getAll();
      if (users) return users;
    } catch (error) {
      throw Error("users not found");
    }
  }

  getUser(data) {
    try {
      const user = userRepository.getOne(data);
      if (user) return user;
    } catch (error) {
      throw Error("users not found");
    }
  }

  createUser(userData) {
    try {
      const user = userRepository.create(userData);
      if (user) return user;
    } catch (error) {
      throw Error("users don't saved");
    }
  }

  updateUser(id, data) {
    try {
      const user = userRepository.update(id, data);
      if (user) return user;
    } catch (error) {
      throw Error("Something went wrog... user don't update");
    }
  }

  deleteUser(id) {
    try {
      const user = userRepository.delete(id);
      return user;
    } catch (error) {
      throw Error("Something went wrong... user don't deleted");
    }
  }
}

const userService = new UserService();

export { userService };
