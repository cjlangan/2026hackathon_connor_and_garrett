import { DeviceManager, Device } from './deviceManager';
import { UserManager, User } from './userManager';

export class FleetManager {
    deviceManager: DeviceManager;
    userManager: UserManager;

    constructor(deviceManager: DeviceManager, userManager: UserManager) {
        this.deviceManager = deviceManager;
        this.userManager = userManager;
    }

    addUser(user: User): void {
        return this.userManager.addUser(user);
    }

// | `removeUser(id)` | Remove a user **AND all their associated devices**. |
    removeUser(id: string): void {
        let u = this.getUser(id);

        //when we remove a user, we need to make sure all devices associated with the user are also removed
        if (u != null) {
          this.userManager.removeUser(id);
          let devices = this.getUserDevices(id);

          for (let i = 0; i < devices.length; i++) {
            this.removeDevice(devices[i].id);
          }
        }
    }

    getUser(id: string): User | null {
        return this.userManager.getUser(id) ?? null;
    }

// | `addDevice(device)` | Add a device, but **only if its `user_id` references a valid user**. Throw an error if the user doesn't exist. |
    addDevice(device: Device): void {
      // when we add a device, we need to make sure it has a valid user_id
      let user_id = device.id;
      this.userManager.getUser(user_id);
      this.deviceManager.addDevice(device);
    }

    removeDevice(id: string): void {
        return this.deviceManager.removeDevice(id);
    }

    getDevice(id: string): Device | null {
        return this.deviceManager.getDevice(id) ?? null;
    }

    getUserDevices(userId: string): Device[] {
        return this.deviceManager.getDevicesByUserId(userId) ?? [];
    }

    getUserCount(): number {
        return this.userManager.getUserCount();
    }

    getDeviceCount(): number {
        return this.deviceManager.getDeviceCount();
    }
}

export { DeviceManager, Device } from './deviceManager';
export { UserManager, User } from './userManager';
