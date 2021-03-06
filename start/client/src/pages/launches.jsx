import React, {Fragment} from "react";
import {gql, useQuery} from "@apollo/client";
import { LaunchTile, Header, Button, Loading } from "../components";

/*const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;*/

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket{
      id
      name
    }
    mission{
      name
      missionPath
    }
  }
`;

const GET_LAUNCHES = gql`

  query launchList($after: String){
    launches(after: $after){
      cursor
      hasMore
      launches{
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;


const Launches = () => {
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useQuery(GET_LAUNCHES);

  if(loading) return <Loading />;
  if(error) return  <p>Error</p>;
  if(!data) return  <p>Error</p>;
  
  return (
    <Fragment>
      <Header />
      {
        data.launches && data.launches.launches && data.launches.launches.map(launch => (<LaunchTile key={launch.id} launch={launch} />
      ))}
      {
        data.launches && data.launches.launches && (
          <Button 
            onClick={() => fetchMore({
              variables: {
                after: data.launches.cursor,
              },
              updateQuery: (prev, { fetchMoreResult, ...rest}) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                    launches:[
                      ...prev.launches.launches,
                      ...fetchMoreResult.launches.launches,
                    ],
                  }, 
                };
              },
              })
            }
          >
            Load More
          </Button>)
      }
      
    </Fragment>
  );
}


export default Launches;
