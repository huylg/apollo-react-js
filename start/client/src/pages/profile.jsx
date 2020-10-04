import React, {Fragment} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_MY_TRIPS = gql`
  query GetMyTrips{
    me{
      id
      email
      trips{
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Profile = () => {
  const { data, loading, error } = useQuery(
    GET_MY_TRIPS,
    {fetchPolicy: 'network-only'}
  );
  if(loading) return <loading />;
  if(error) return <p>Error: {error.message}</p>;
  if(data===undefined) return <p>ERROr</p>;

  return(
    <Fragment>
      <Header>My Trips</Header>
      { data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
            <p>you haven't booked any trips</p>
          )
      }
    </Fragment>
  );
};

export default Profile;
