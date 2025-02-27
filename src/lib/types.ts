
export interface Announce {
  _id: string;
  tracking_number: string;
  departure_country: string;
  departure_city: string;
  arrival_country: string;
  arrival_city: string;
  contact: string;
  travel_tiket: string;
  departure_date: string;
  created: string;
  arrival_date: string;
  price: number;
  availability: number;
  status: string;
  verified: boolean;
  announcer: string;
  pickup_location: {
    address: string;
    lat: number;
    lng: number;
  };
  tracking_status: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
}


