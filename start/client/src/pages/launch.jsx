import React, {Fragment} from "react";
import {gql, useQuery} from "@apollo/client";

import { Loading, Header, LaunchDetail } from "../components";
import { ActionButton } from "../containers";
import {LAUNCH_TILE_DATA} from "./launches";
export const GET_LAUNCH_DETAIL = `gql
   query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch
      }
    }
  }
`;


export const GET_LAUNCH_DETAILS = gql`
   query LaunchDetails($launchId: ID!){
      launch(id: $launchId){
         isInCart @client
         site
         rocket{
            type
         }
         ...launchTile
      }
   }
   ${LAUNCH_TILE_DATA}
`;

const Launch = ({launchId}) => {
   const {data, loading, error} = useQuery(GET_LAUNCH_DETAIL,{
      variables: {launchId},
   });

   if(loading) return <Loading />;
   if(error) return <p>Error: {error.message}</p>;
   if(!data) return <p>Not found</p>;

   return (
      <Fragment>
         <Header image={
               data.launch && data.launch.mission && data.launch.mission.missionPatch
            }>
               {data && data.launch && data.launch.mission && data.launch.mission.name}

         </Header>
         <LaunchDetail {...data.launch} />
         <ActionButton {...data.launch} />
      </Fragment> 
   );
};

export default Launch;
