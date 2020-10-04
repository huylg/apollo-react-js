import React from "react";
import {
  qgl,
  ApolloClient,
  useApolloClient,
  useMutation,
} from '@apollo/client';

import {LoginForm, Loading} from '../components';


export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login(){
  const client = useApolloClient();
  const [login, {data}] = useMutation(LOGIN_USER,{
    onComleted({login}){
      localStorage.setItem('token',login);
      client.write({data: {isLoggedIn: true}});
    }
  });
  if(loading) return <Loading />;
  if(error) return <p>An error occured</p>;

  return <LoginForm login={login}/>
};
