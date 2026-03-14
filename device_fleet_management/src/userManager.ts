export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}


export class UserManager {

    users : Map<string, User>;

    constructor() {
      this.users = new Map<string, User>();
    }

//| `addUser(user)` | Add a new user. Should throw if `id` is empty or already exists. |
    addUser(user: User): void {
      if (user.id == "") {
        throw new Error(`User must have an id`);
      }
      if (this.users.has(user.id)) {
        throw new Error(`User with id ${user.id} already exists`);
      }
      this.users.set(user.id, user);
    }

// | `removeUser(id)` | Remove a user by ID. Should throw if user doesn't exist. |
    removeUser(id: string): void {
      if (!this.users.has(id)) {
        throw new Error(`User with id ${id} not found`);
      }
      else {
        this.users.delete(id);
      }
    }

// | `getUser(id)` | Return user by ID, or `null` if not found. |
    getUser(id: string): User | null {
      if (this.users.has(id)) {
        let temp_user = this.users.get(id);
        if (temp_user != undefined) {
          return temp_user
        }
      }
      return null;
    }

// | `getUsersByEmail(email)` | Return all users with matching email. |
    getUsersByEmail(email: string): User[] | null {
      let temp_users = [...this.users.values()]
      return temp_users.filter(function(u) {
        return u.email == email;
      });
    }

// | `getUsersByPhone(phone)` | Return all users with matching phone. |
    getUsersByPhone(phone: string): User[] | null {
      let temp_users = [...this.users.values()]
      return temp_users.filter(function(u) {
        return u.phone == phone;
      });
    }


// | `getAllUsers()` | Return all users. |
    getAllUsers(): User[] {
        return [...this.users.values()];
    }

// | `getUserCount()` | Return total number of users. |
    getUserCount(): number {
        return this.users.size;
    }
}
