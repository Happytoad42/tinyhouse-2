import { Collection, ObjectID } from 'mongodb';

export interface Listings {
  _id: ObjectID;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listings>;
}
