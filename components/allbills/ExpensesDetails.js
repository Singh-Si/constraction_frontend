import React, { useEffect, useState } from 'react';
import AddExpense from '@/components/utils/Modal/AddExpense'; // Assuming the ExpenseModal component is in a separate file
import { useRouter } from 'next/router';

const ExpensesDetails = ({ expenseId, expenseData }) => {
    console.log(expenseData, "expenseDataexpenseDataexpenseDataexpenseData")
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const router = useRouter();
    const id = router.query.id



    return (
        <div className='col p-0'>
            <ul className=" list-group shadow-sm m-asuto ">
                <li className="list-group-item p-3 er bg-light-blue" >
                    <div className='row'>
                        <div className='col d-flex justify-content-between align-items-center text-black '>
                            <span>{expenseData?.[0]?.expenseId?.name}</span>
                            <button onClick={handleToggleModal}>+ Add Expense</button>
                        </div>
                    </div>
                </li>
                <li className="list-group-item p-3 text-white fw-bold bg-blue" >
                    <div className='row'>
                        <div className='col'>S. No.</div>
                        <div className='col'>Expense Title</div>
                        <div className='col'>Billing Date</div>
                        <div className='col'>Price</div>
                        <div className='col'>Quantity</div>
                        <div className='col'>Total Amount</div>
                    </div>
                </li>


                {
                    expenseData && expenseData.map((item, index) => (
                        <>
                            <li className="list-group-item h-100vh shadow-none border-none border-bottom-0">
                                <div className='text-decoration-none text-black' >
                                    <div className='row gap-5 border-bottom p-2'>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3' >
                                            {index + 1}
                                        </div>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3 ' > {item?.title}</div>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3 ' >  {item?.date}</div>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3 ' >  {item?.price}</div>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3 ' > {item?.quantity}</div>
                                        <div className='col d-flex align-items-center px-2 m-0 gap-3 ' >  {item?.totalAmount}</div>
                                    </div>
                                </div>
                            </li>

                        </>
                    ))
                }



            </ul>
            <AddExpense showModal={showModal} handleCloseModal={handleCloseModal} id={id} expenseId={expenseId} />

        </div>
    )
}

export default ExpensesDetails;
