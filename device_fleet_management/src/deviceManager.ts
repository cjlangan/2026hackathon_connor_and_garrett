export interface Device {
    id: string;
    name: string;
    version: string;
    user_id: string;
    status: 'active' | 'inactive';
    location: {
        latitude: number;
        longitude: number;
    };
}

export class DeviceManager {

    devices: Map<string, Device>;

    // constructor, gets called when a new instance of the class is created
    constructor() {
      this.devices = new Map<string, Device>();
    }

    addDevice(device: Device): void {
      if (device.id == null || device.id === "" || this.devices.has(device.id))
        throw new Error("Error adding new device: Device ID empty");
      this.devices.set(device.id, device);
    }

    removeDevice(id: string): void {
      if (!this.devices.delete(id))
          throw new Error("ERR:RemoveDevice:InvalidID");
    }

    getDevice(id: string): Device | null {
      return this.devices.get(id) ?? null;
    }

    getDevicesByVersion(version: string): Device[] | null {
      let iter = this.devices.values();
      let matches: Device[] = [];
      let curr: Device | undefined = iter.next().value;

      while (curr !== undefined) {
        if (curr.version === version) {
          matches.push(curr);
        }
        curr = iter.next().value;
      }

      return matches.length === 0 ? null : matches;
    }

    getDevicesByUserId(user_id: string): Device[] | null {
      let iter = this.devices.values();
      let matches: Device[] = [];
      let curr: Device | undefined = iter.next().value;

      while (curr !== undefined) {
        if (curr.user_id === user_id) {
          matches.push(curr);
        }
        curr = iter.next().value;
      }

      return matches.length === 0 ? null : matches;
    }

    getDevicesByStatus(status: 'active' | 'inactive' | 'pending' | 'failed'): Device[] | null {
      let iter = this.devices.values();
      let matches: Device[] = [];
      let curr: Device | undefined = iter.next().value;

      while (curr !== undefined) {
        if (curr.status === status) {
          matches.push(curr);
        }
        curr = iter.next().value;
      }

      return matches.length === 0 ? null : matches;
    }

    getDevicesInArea(latitude: number, longitude: number, radius_km: number): Device[] | null {
      // returns all devices within a radius of the given latitude and longitude
      // the radius is in kilometers
      /*let iter = this.devices.values();
      let matches: Device[] = [];
      let curr: Device | undefined = iter.next().value;

      while (curr !== undefined) {
        if (curr.status === status) {
          matches.push(curr);
        }
        curr = iter.next().value;
      }

      return matches.length === 0 ? null : matches;*/
      return null
    }

    deviceWithinRange(lat1: number, lat2: number, long1: number, long2: number, number: number): boolean {
      // phi = latitude
      // lambda == longitude
      // hav(theta) = hav(delta phi) + cos(phi1)cos(phi2)hav(delta lambda)

      // x: number = 2*Math.asin(Math.sqrt(Math.sin((lat2 - lat1)/2)^2))


      return false;
    }

    getDevicesNearDevice(device_id: string, radius_km: number): Device[] | null {
      // returns all devices within a radius of the given device (not including the device itself)
      // the radius is in kilometers
      return null;
    }

    getAllDevices(): Device[] {
        return [];
    }

    getDeviceCount(): number {
        return 0;
    }
}
