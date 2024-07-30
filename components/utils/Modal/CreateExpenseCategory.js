import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import nookies, { parseCookies } from 'nookies';
import config from '@/config/config';

const AddExpenseCategory = ({ showModal, closeModal ,id , expenseId}) => {
    const [expenseTitle, setExpenseTitle] = useState('');
    const { currentOrganizationId, token } = parseCookies();
    const handleCreateExpenseCategory = async () => {
        try {
            const response = await axios.post(
                `${config.API_URL}/expenses/create?organization=${currentOrganizationId}&site=${id}`,

                {
                    name: expenseTitle,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response?.data?.success) {
                closeModal();
                toast.success('Expense category created successfully', { position: 'top-center' });
            } else {
                toast.error('Error creating expense category', { position: 'top-center' });
            }
        } catch (error) {
            console.error('Error creating expense category:', error);
            toast.error('Error creating expense category', { position: 'top-center' });
        }
    };

    return (
        <div>
            {showModal && (
                <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
                    <div className="modal-dialog slide-in-from-bottom h-auto">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100">
                                <div className="d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top">
                                    <div className="fs-xxl text-blue p-3">Create Expense Category</div>
                                    <span onClick={closeModal} className="cursor-pointer text-black p-3">X</span>
                                </div>
                                <div className="w-100 modal-body text-info">
                                    <div className="p-4">
                                        <div>
                                            <label className="text-black">Expense Title</label>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                value={expenseTitle}
                                                onChange={(e) => setExpenseTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-5 w-50 m-auto">
                                            <button
                                                type="button"
                                                className="text-white m-auto w-100 bg-btn-bg auth_btn"
                                                onClick={handleCreateExpenseCategory}
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddExpenseCategory;
