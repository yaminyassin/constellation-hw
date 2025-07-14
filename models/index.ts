// Vehicle models
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

export interface VehicleWithId extends Vehicle {
  id: string;
}

// Filter models
export interface PriceRange {
  min: number;
  max: number;
}

export interface VehicleFilters {
  makes: string[];
  models: string[];
  priceRange: PriceRange;
  showFavouritesOnly: boolean;
  searchQuery: string;
}
