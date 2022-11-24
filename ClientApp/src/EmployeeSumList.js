import React from 'react';

const EmployeeSumList = () => {

    const [empSumList, setEmpSumList] = React.useState([]);

    const getSpecificEmployeesBasedOnSummation = () => {
        try {
            fetch("http://localhost:41478/List/sum")
                .then(res => res.json())
                .then(
                    (result) => {
                        setEmpSumList([...result]);
                    }
                );

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {

        getSpecificEmployeesBasedOnSummation();

    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Letter of Name</th>
                        <th>Sum of Values</th>

                    </tr>
                </thead>
                <tbody>
                    {empSumList.map((listdata, index) => (
                        <tr key={index}>
                            <td>{listdata.firstLetter}</td>
                            <td>{listdata.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeSumList;