import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Link from 'next/link';
import CreateExpenseCategory from '@/components/utils/Modal/CreateExpenseCategory';
import ExpensesDetails from '@/components/allbills/ExpensesDetails';
import config from '@/config/config';
const BillsDetails = () => {
    const router = useRouter();
    const id = router.query.id;
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [calculatedBills, setCalculatedBills] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item ID
    const { currentOrganizationId, token } = parseCookies();
    const [expenseData , setExpenseData] = useState([])

    const fetchExpenses = async () => {

        try {
            const response = await axios.get(`${config.API_URL}/expenses/get?organization=${currentOrganizationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setExpenses(response?.data?.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            toast.error('Error fetching expenses');
        }
    };



    const fetchCalculatedBills = async () => {
        const id = router?.query?.id;
        console.log(id);
        if (id) {
            try {
                const response = await axios.get(
                    `${config.API_URL}/calculatedBills/get?organization=${currentOrganizationId}&site=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(response)
                setCalculatedBills(response?.data);
            } catch (error) {
                console.error('Error fetching calculated bills:', error);
                toast.error('Error fetching calculated bills');
            }
        }

    };

    useEffect(() => {
        fetchExpenses();
        fetchCalculatedBills();
    }, [id]);

    const handleToggleExpenseModal = () => {
        setShowExpenseModal(!showExpenseModal);
    };

    const closeExpenseModal = () => {
        setShowExpenseModal(false);
    };
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get(
                    `${config.API_URL}/expense/bill/get?organization=${currentOrganizationId}&site=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setBills(response?.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
                toast.error('Error fetching bills');
            }
        };

        fetchBills();
    }, [currentOrganizationId, token, id]);

    const handleItemClick = async (itemId) => {
        setSelectedItem(itemId)
        console.log(itemId, "itemIditemId")
        try {
            const response = await axios.get(
                `${config.API_URL}/expense/bill/get?id=${itemId}&organization=${currentOrganizationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setExpenseData(response?.data?.data)
            console.log('Bills for item:', response?.data);
            // Handle the response as needed, such as updating state with bill data
        } catch (error) {
            console.error('Error fetching bills for item:', error);
            toast.error('Error fetching bills for item');
        }
    };

    // console.log(expenseId, "expenseIdexpenseId");
    return (
        <div>
            <div className='row '>
                <div className='col-3 text-center '>
                    <div className='border rounded-4  p-2 border-black d-flex  gap-2  justify-content-center flex-column'>
                        <div className=' border-bottom p-1'>
                            <span className='fw-bold text-blue '>OverAll Site Budget</span><br />
                        </div>
                        <div className=''>
                            <small className='text-light-black fs-13'>₹ {calculatedBills?.siteBills}</small>
                        </div>
                    </div>

                </div>
                <div className='col-3 text-center'>
                    <div className='border rounded-4 p-2 border-black d-flex   gap-2 justify-content-center  flex-column'>
                        <div className=' border-bottom p-1'>
                            <span className='fw-bold text-blue '>Total Expenses</span><br />
                        </div>
                        <div className=''>
                            <small className='text-black fs-13'>₹ {calculatedBills?.overAllbudget}</small>
                        </div>
                    </div>

                </div>
                <div className='col-3 text-center'>
                    <div className='border rounded-4 p-2 border-black d-flex  gap-2 justify-content-center flex-column'>

                        <div className=' border-bottom p-1'>
                            <span className='fw-bold text-blue '>Outstanding Budget</span><br />
                        </div>
                        <div className=''>
                            <small className='text-black fs-13'> ₹ {calculatedBills?.siteBills - calculatedBills?.overAllbudget}</small>
                        </div>
                    </div>

                </div>

            </div>

            <div className="row border-top mt-4 border-bottom-0">
                <div className="col-lg-3 dz-scroll height500 border border-right border-solid border-grey ">
                    <div className="nav flex-column nav-pills mb-3 mtngtabs mting">

                        <div className='d-flex justify-content-between py-2 border-bottom'>
                            <small>All Expenses</small>
                            <a className='text-info fw-bold' onClick={handleToggleExpenseModal}>+ Create Expenses Category</a>
                        </div>
                        {expenses && expenses.map((item) =>
                            <Link
                                href="#m1-tab"
                                data-bs-toggle="pill"
                                className={`text-decoration-none text-black py-3 border-bottom `}
                                key={item.id} // Assuming each item has a unique ID
                                onClick={() => handleItemClick(item._id)} // Call API on item click
                            >
                                <div className="d-flex justify-content-between">
                                    <small className="fw-bold py-1">{item.name}</small>
                                    {/* <small className="border rounded-3 px-4 py-1 text-grey bg-gray">00.00/</small> */}
                                </div>
                            </Link>
                        )}
                        


                    </div>
                </div>

                <ExpensesDetails expenseId={selectedItem} expenseData={expenseData}/>
                <CreateExpenseCategory showModal={showExpenseModal} closeModal={closeExpenseModal} id={id} />

                {/* <ViewComptedTask /> */}

            </div>
        </div>
    )
}

export default BillsDetails
