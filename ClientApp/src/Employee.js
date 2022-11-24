import React from 'react';

const Employee = (props) => {

    const viewEmp = () => {
        props.viewEmployee(props.employee);
    };

    const deleteEmp = () => {
        props.deleteEmployee(props.employee);
    };

    return (
        <>
            <tr key={props.employee.id}>
                <td>{props.employee.id}</td>
                <td>{props.employee.name}</td>
                <td>{props.employee.value}</td>
                <td><button onClick={deleteEmp}>Delete</button></td>
                <td><button onClick={viewEmp}>View</button></td>
            </tr>
        </>
        );

}

export default Employee;