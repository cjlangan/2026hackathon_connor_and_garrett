export interface Ad {
    adId: string;
    advertiserId: string;
    timeReceived: number;
    timeout: number;
    duration: number;
    baseRevenue: number;
    bannedLocations: string[];
}

export interface Area {
    areaId: string;
    location: string;
    multiplier: number;
    totalScreens: number;
    timeWindow: number;
}

export interface ScheduledAd {
    adId: string;
    areaId: string;
    startTime: number;
    endTime: number;
}

export type Schedule = Record<string, ScheduledAd[]>;

export class PlacementEngine {

    constructor() {
    }

// | `isAdCompatibleWithArea(ad, area)` | Return `true` if the ad is allowed to be played in the area. Use exact string matching for banned locations. |
    isAdCompatibleWithArea(ad: Ad, area: Area): boolean {
      let allowed = true;

      ad.bannedLocations.forEach(function(l) {
        if (l === area.location) {
          allowed = false;
        }
      });

      return allowed;
    }

  // | `getTotalScheduledTimeForArea(areaSchedule)` | Return the total scheduled duration across all ads in one area. 
    // This is the sum of `endTime - startTime` for each scheduled ad — not the span from first start to last end. |
    getTotalScheduledTimeForArea(areaSchedule: ScheduledAd[]): number {
      let total = 0;

      areaSchedule.forEach(function(as) {
        total += as.endTime - as.startTime;
      });

      return total;
    }

  // | `doesPlacementFitTimingConstraints(ad, area, startTime)` | 
    // Return `true` only if the ad can start at `startTime`
  // , starts within its allowed availability window, and fully 
    // fits within the area's time window. |
    doesPlacementFitTimingConstraints(
        ad: Ad,
        area: Area,
        startTime: number
    ): boolean {
      let fits = true 
        
      if (startTime < ad.timeReceived || ad.timeReceived + ad.timeout < startTime || area.timeWindow < startTime + ad.duration) {
        fits = false;
      }

      return fits;
    }

// | `isAdAlreadyScheduled(adId, schedule)` | 
// Return `true` if the ad has already been scheduled anywhere in the full schedule. |
    isAdAlreadyScheduled(adId: string, schedule: Schedule): boolean {
      let isThere = false

      for (const [key, value] of Object.entries(schedule)) {
        value.forEach(function(s) {
          if (s.adId === adId) {
            isThere = true;
          }
        })
      }

      return isThere;
    }

// | `canScheduleAd(ad, area, schedule, startTime)` | 
// Return `true` only if the ad is compatible with the area, 
// not already scheduled elsewhere, 
  // does not overlap an existing ad in that area, 
// and fits all timing constraints. |
    canScheduleAd(
        ad: Ad,
        area: Area,
        schedule: Schedule,
        startTime: number
    ): boolean {
        let part = this.isAdCompatibleWithArea(ad, area) && !this.isAdAlreadyScheduled(ad.adId, schedule) && this.doesPlacementFitTimingConstraints(ad, area, startTime);
        let other = true;

        let arr = schedule[area.areaId];

        if (area.areaId in schedule) {
          arr.forEach(function(s) {
            if (s.adId !== ad.adId) {
              if (!( (s.endTime <= startTime) || (startTime + ad.duration <= s.startTime))) { 
                other = false;
              }
            }
          });
        }

        return part && other;
    }

// | Return `true` if the area schedule is valid: 
    //  - no overlaps, 
    //  - all ads exist in the ads list, 
    //  - all ads are allowed in this location, 
    //  - and all ads fit within the area's time window. |
    isAreaScheduleValid(area: Area, areaSchedule: ScheduledAd[], ads: Ad[]): boolean {
      let valid = true;

      let arr = areaSchedule;

      let ids = areaSchedule.map(obj => obj.adId);

      for (let i = 0; i < ads.length; i++) {
        let ad = ads[i];
        if (!ids.includes(ad.adId)) {
          valid = false;
        }

        if (!this.isAdCompatibleWithArea(ad, area)) { 
          valid = false;
        }

        let st = 0;

        areaSchedule.forEach(function(as) {
          if (as.adId == ad.adId) {
            st = as.startTime;
          }
        });


        if (!this.doesPlacementFitTimingConstraints(ad, area, st)) {
          valid = false;
        }
      }

      arr.forEach(function(s) {
        arr.forEach(function(ad) {
          if (s.adId !== ad.adId) {
            if (!( (s.endTime <= ad.startTime) || (ad.endTime <= s.startTime))) { 
              valid = false;
            }
          }
        });
      });

      return valid;
    }
}
