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
            <table className="table table-bordered mt-3 mb-3 table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">First Letter of Name</th>
                        <th scope="col">Sum of Values</th>

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