import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '@/config/config';
import { parseCookies } from 'nookies';

const AddExpense = ({ showModal, handleCloseModal, id , expenseId }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const { currentOrganizationId, token } = parseCookies();

  const totalAmount = price * quantity;

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}/expense/bill/add?organization=${currentOrganizationId}&site=${id}`,
        {
          expenseId,
          title,
          price,
          quantity,
          date,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      if (response.data.success) {
        handleCloseModal(); // Close the modal on successful save
        toast.success('Expense added successfully', { position: 'top-center' });
      } else {
        toast.error('Failed to add expense', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense', { position: 'top-center' });
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
                  <div className="fs-xxl text-blue p-3">Add your details </div>
                  <span onClick={handleCloseModal} className="cursor-pointer text-black p-3">X</span>
                </div>
                <div className="w-100 modal-body text-info">
                  <div className="p-4">
                    
                  {/* <div>
                      <label className="text-black">Expense Title</label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div> */}
                    <div>
                      <label className="text-black">Expense Title</label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-black">Billing Date</label>
                      <input
                        type="date"
                        className="form-control mt-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-black">Price</label>
                      <input
                        type="number"
                        className="form-control mt-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-black">Quantity</label>
                      <input
                        type="number"
                        className="form-control mt-2"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-black">Total Amount</label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={totalAmount}
                        readOnly
                      />
                    </div>
                    <div className="mt-5 w-50 m-auto">
                      <button
                        type="button"
                        className="text-white m-auto w-100 bg-btn-bg auth_btn"
                        onClick={handleSave}
                      >
                        Save
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

export default AddExpense;
