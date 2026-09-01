export interface WifiFloorOption {
  floor: number;
  name: string;
  ssid: string;
  notes: string;
}

export interface WifiDetails {
  ssid: string;
  password?: string;
  type: string;
  floors?: WifiFloorOption[];
}

export interface PropertyDetails {
  name: string;
  tagline: string;
  description: string;
  address: string;
  floorsCount: number;
  apartmentsCount: number;
  maxOccupancy: number;
  checkInTime: string;
  checkOutTime: string;
  wifi: WifiDetails;
  mapEmbedUrl?: string;
  mapDirectUrl?: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'landmark' | 'dining' | 'shopping' | 'leisure';
  distance: string;
  description: string;
  highlights: string[];
  mapEmbedUrl?: string;
  mapDirectUrl?: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  instructions: string[];
}

export interface HousePolicy {
  id: string;
  title: string;
  isStrict: boolean;
  description: string;
  details: string;
}

export interface SupportContact {
  role: string;
  name: string;
  phone: string;
  channels: string[];
  avatarText: string;
}
