export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  correctPassword?: (str: string) => boolean;
  imageUrl?: string;
}

export interface Listing {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  minOccupants: number;
  maxOccupants: number;
  ownerPhotos?: Array<string>;
}

export interface Trip {
  dateFrom: Date;
  dateTo: Date;
  status: string;
}
