import { gql } from '@apollo/client';
import { GET_CART_ITEMS } from './pages/cart'
export const schema = gql`
	extend type Launch {
		isInCart: Boolean!
	}

`;

export const typeDefs = gql`
	extend type Query {
		isLoggedIn: Boolean
		cartItem: [ID!]
	}

	extend type Launch{
		isInCart: Boolean!
	}

	extend type Mutation{
		addOrRemoveFromCart(id: ID!): [ID!]!
	}

`;

export const resolvers = {
	Launch: (launch,_,{cache})=>{
		const queryResult = cache.readQuery({
			query: GET_CART_ITEMS
		});

		if (queryResult){
			return queryResult.cartItems.includes(launch.id);
		}

		return false;

	},

	Mutation: {
		addOrRemoveFromCart: (_,{id},{cache})=>{
			const queryResult = cache.readQuery({
				query: GET_CART_ITEMS
			});

			if(queryResult){
				const {cartItems} = queryResult;
				const data = {
					cartItems: cartItems.includes(id)
					? cartItems.filter(i => i !==id)
					: [...cartItems,id]
				};

				cache.writeData({query: GET_CART_ITEMS,data});
				return data.cartItems;
			}
			return [];
		}
	}
};

