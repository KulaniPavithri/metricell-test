import React from 'react';
import Employees from "./Employees";
import EmployeeSumList from "./EmployeeSumList";

const App = () => {

    const [name, setName] = React.useState("");
    const [value, setValue] = React.useState();
    const [create, setCreate] = React.useState(false);
    const [isdelete, setDelete] = React.useState(false);
    const [update, setUpdate] = React.useState(false);
    const [employee, setEmployee] = React.useState(null);
    const [increment, setIncrement] = React.useState(false);
    const [sum, setSum] = React.useState();

    
    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleValue = (event) => {
        setValue(event.target.value);
    }

    const viewEmployee = (employee) => {
        setName(employee.name);
        setValue(employee.value);
        setEmployee({ ...employee });
    }

    const handleCreate = () => {
        setCreate(true);
    }

    const handleUpdate = () => {
        setUpdate(true);
        setEmployee({ ...employee, name: name, value: value });
    }

    const handleIncrement = () => {
        setIncrement(true);
    }

    const handleSum = () => {
        setSum(true);
    }

    const createEmployee = () => {
        try {
            fetch("http://localhost:41478/Employees", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    value: value
                })
            })
                .then(() => {
                    alert("Created Successfully!");
                });
        } catch (error) {
            console.log(error);
        }

    }

    const deleteEmployee = (employee) => {
        try {
            fetch("http://localhost:41478/Employees/" + employee.id, {
                method: "DELETE"
            })
                .then(() => {
                    alert("Deleted Successfully!");
                    setDelete(true);
                });
        } catch (error) {
            console.log(error);
        }

    }

    const updateEmployee = () => {

        try {
            fetch("http://localhost:41478/Employees/" + employee.id, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...employee
                })
            })
                .then(() => {
                    alert("Updated Successfully!");
                });
        } catch (error) {
            console.log(error);
        }

    }

    const updateWithIncrementedValues = () => {
        try {
            fetch("http://localhost:41478/List/increment")
                .then(() => {
                    alert("Increment Employee Values Successfully!");
                });
                
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (create) {
            createEmployee();
        }
        
        setCreate(false);
        setName("");
        setValue("");
    }, [create]);

    React.useEffect(() => {
        if (update) {
            updateEmployee();
        }

        setUpdate(false);
        setName("");
        setValue("");
        setEmployee(null);
    }, [update]);

    React.useEffect(() => {
        if (isdelete) {
            setDelete(false);
            setName("");
            setValue("");
        }
        
    }, [isdelete]);

    React.useEffect(() => {
        if (increment) {
            updateWithIncrementedValues();
        }

        setIncrement(false);

    }, [increment]);

    

    return (
        <div>
            
            <h2>Employees Data...</h2>

            <form>
                <label>Name: </label>
                <input
                    type="text" name="name"
                    id="name" value={name}
                    onChange={handleName}
                />

                <label>Value: </label>
                <input
                    type="text" name="value"
                    id="value" value={value}
                    onChange={handleValue}
                />
                <button onClick={handleCreate}>Create</button>
                <button onClick={handleUpdate}>Update</button>
            </form>

            <div>
                <button onClick={handleIncrement}>Increment Employee Values</button>
            </div>

            <h3>Sum of Employee values where names begin with </h3>
            <div>
                <button onClick={handleSum}>Sum of Employee Values</button>
            </div>

            <div>
                {sum && <EmployeeSumList />}
                 
            </div>

            <Employees viewEmployee={viewEmployee} deleteEmployee={deleteEmployee } />
          </div>
    );
  
}
export default App;

