const Boq = () => {
    return (
        <>
            <li className="list-group-item p-3 text-blue fw-bolder bg-task-title mt-5">
                <div className='row d-flex justify-content-between'>
                    <>BOQ (Materials Item)</>
                </div>
            </li>

            <table className="table caption-top table table-bordered" >
                <thead className="bg-blue">
                    <tr className="bg-blue">
                        <th scope="col">BOQ ID</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Description</th>
                        <th scope="col">Ratio</th>
                        <th scope="col">Unit*</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Boq 1</th>
                        <td>Paint 1</td>
                        <td>desc</td>
                        <td>6.00</td>
                        <td>nos</td>
                        <td>12</td>
                        <td>0.00</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Boq;
