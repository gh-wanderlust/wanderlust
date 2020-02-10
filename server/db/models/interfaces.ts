export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  correctPassword?: (str: string) => boolean;
  imageUrl?: string;
}

export interface Listing {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  minOccupants: number;
  maxOccupants: number;
  ownerPhotos?: Array<string>;
  price: number;
  trips?: Trip[];
}

export interface Trip {
  id: number;
  dateFrom: Date;
  dateTo: Date;
  status: string;
  users?: User[];
}
