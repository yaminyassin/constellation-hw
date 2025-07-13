export interface Vehicle {
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
}

// Optional: Add a type for vehicles with IDs
export interface VehicleWithId extends Vehicle {
  id: string;
}
