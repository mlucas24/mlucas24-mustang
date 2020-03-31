import React from 'react';

const Client = props => {
    return (
        <tr className="clients" onClick={() => props.handleClick(props.client[1], props.client[0], props.client[2])}>
            <td>{props.client[1]}</td>
            <td>{props.client[0]}</td>
            <td>{props.client[2]}</td>
        </tr>
    )
}

export default Client;