import React, { useEffect, useState } from 'react';
import axios from "axios";
import { HeaderDos } from '.'

const Test = () => {
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/user")
            .then((response) => {
                console.log(response.data);  // Para verificar la respuesta
                setListOfUsers(response.data.body);  // Accede a la propiedad body
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <HeaderDos/>
            <div className="container mt-4">
                <h2 className="mb-4">Lista de usuarios</h2>
                {Array.isArray(listOfUsers) && listOfUsers.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr>

                                <th>Username</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfUsers.map((user) => (
                                <tr key={user.id}>

                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default Test;