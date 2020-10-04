import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client'
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import { resolvers, typeDefs } from './resolvers';

const IS_LOGGED_IN = gql`
	query IsUserLoggedIn{
		isLoggedIn @client
	}
`;

function IsLoggedIn(){
	const { data } = useQuery(IS_LOGGED_IN);
	return data.isLoggedIn ? <Pages /> : <Login />;
}

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		headers: {authorization: localStorage.getItem('token')},
		uri: 'http://localhost:4000/graphql',
	}),
	typeDefs,
	resolves,
});

cache.writeData({
	data:{
		isLoggedIn: !!localStorage.getItem('token'),
		cartItems: [],
	}
});

injectStyles();
ReactDOM.render(
 	<ApolloProvider client={client}>
 		<Pages />
	</ApolloProvider>,
	document.getElementById('root')
);
