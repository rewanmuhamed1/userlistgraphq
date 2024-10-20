import React from 'react';
import { useParams } from 'react-router-dom';
import { USER_DETAILS } from '../../graphql/userquery'
import { useQuery} from '@apollo/client';
const user = () => {

    let { userid } = useParams();
    console.log('user details userid', userid);
    const { loading, error, data } = useQuery(USER_DETAILS, {
        variables: { id: +userid }, // Pass the user ID as a variable
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.user;
    console.log('user', user);
    return (
        <div>
            <h2>User Details</h2>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Active: {user.active ? 'Yes' : 'No'}</p>
            <h3>Roles:</h3>
            <ul>
                {user.roles.map(role => (
                    <li key={role.id}>{role.name}</li>
                ))}
            </ul>
            <h3>Account:</h3>
            {user.account.__typename === 'Customer' ? (
                <p>Customer Name: {user.account.name}</p>
            ) : (
                <p>Delivery Agent Name: {user.account.name}</p>
            )}
        </div>
    );
};

export default user;