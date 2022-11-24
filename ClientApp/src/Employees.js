import React from 'react';
import Employee from './Employee';

const Employees = (props) => {
    const [employees, setEmployees] = React.useState([]);

    const fetchEmployees = () => {
        try {
            fetch("http://localhost:41478/Employees")
                .then(res => res.json())
                .then(
                    (result) => {
                        setEmployees([...result]);
                    }
                );
        } catch (error) {
            console.log(error);
        }

    };

    React.useEffect(() => {
        fetchEmployees();
    });

    

    return (
        <div>
            <table className="table table-bordered mt-3 table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <Employee employee={emp} viewEmployee={props.viewEmployee} deleteEmployee={props.deleteEmployee }/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;