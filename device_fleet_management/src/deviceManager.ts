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
      if (device.id == "")
        throw new Error("Device must have an id");
      else if (this.devices.has(device.id))
        throw new Error(`Device with id ${device.id} already exists`);
      this.devices.set(device.id, device);
    }

    removeDevice(id: string): void {
      if (!this.devices.delete(id))
          throw new Error(`Device with id ${id} not found`);
    }

    getDevice(id: string): Device | null {
      return this.devices.get(id) ?? null;
    }

    getDevicesByVersion(version: string): Device[] | null {
      let matches = [...this.devices.values()]
      matches = matches.filter(function(d) {
        return d.version == version;
      });
      return matches;
    }

    getDevicesByUserId(user_id: string): Device[] | null {
      let matches = [...this.devices.values()]
      matches = matches.filter(function(d) {
        return d.user_id == user_id;
      });
      return matches;
    }

    getDevicesByStatus(status: 'active' | 'inactive' | 'pending' | 'failed'): Device[] | null {
      let matches = [...this.devices.values()]
      matches = matches.filter(function(d) {
        return d.status == status;
      });
      return matches;
    }

    getDevicesInArea(latitude: number, longitude: number, radius_km: number): Device[] | null {
      // returns all devices within a radius of the given latitude and longitude
      // the radius is in kilometers
      let matches = [...this.devices.values()]
      matches = matches.filter((d: Device) => !(d.location.longitude === longitude && d.location.latitude === latitude) && DeviceManager.isDeviceWithinRange(d.location.latitude, latitude, d.location.longitude, longitude, radius_km));
      return matches;
    }

    static isDeviceWithinRange(lat1: number, lat2: number, long1: number, long2: number, radius_km: number): boolean {
      const degToRad = (x: number) => x*Math.PI/180;
      const R = 6173;
      let deltaLat = degToRad(lat2 - lat2);
      let deltaLong = degToRad(long2 - long1);
      let lat1Rad = degToRad(lat1);
      let lat2Rad = degToRad(lat2);
      let a: number = Math.sin(deltaLat/2)**2 + Math.sin(deltaLong/2)**2*Math.cos(lat1Rad)*Math.cos(lat2Rad);
      let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d: number = R*c;
      return d < radius_km;
    }

    getDevicesNearDevice(device_id: string, radius_km: number): Device[] | null {
      // returns all devices within a radius of the given device (not including the device itself)
      // the radius is in kilometers
      let device: Device | undefined = this.devices.get(device_id)
      return device === undefined ? null : this.getDevicesInArea(device.location.latitude, device.location.longitude, radius_km);
    }

    getAllDevices(): Device[] {
        return [...this.devices.values()]
    }

    getDeviceCount(): number {
        return this.devices.size;
    }
}
