import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, error, loading, refetch } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { error: deleteListingError, loading: deleteListingLoading },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id!)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (error) {
    return <h2>Something went wrong. Try again later.</h2>;
  }

  if (loading) {
    return <h2>Loading data...</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deleting a listing</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Failed to delete a listing, try again later</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
