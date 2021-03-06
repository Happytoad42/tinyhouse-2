/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from '../../../lib/types';
import { ObjectID } from 'mongodb';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectID(id),
      });

      if (!deleteRes.value) {
        throw new Error('Cannot delete listing!');
      }

      return deleteRes.value;
    },
  },
  Listing: {
    id: (listing: Listing) => listing._id.toString(),
  },
};
