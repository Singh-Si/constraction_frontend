import React from 'react';

const ConfirmationModal = ({ showModal, closeModal, confirmAction }) => {
  return (
    <>
      {showModal && (
        <div className="modal-backdrop fade-in-animation">
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100">
                <div className="d-flex bg-danger justify-content-center w-100 border-bottom modal-header text-center rounded-top">
                  <div className="text-white p-3 fw-semibold fs-6 d-flex justify-content-between align-items-center w-100">
                    <span className="text-center text-black">Delete Confirmation</span>
                    <button type="button" className="btn-close text-white" aria-label="Close" onClick={closeModal}></button>
                  </div>
                </div>
                <div className="w-100 modal-body text-info p-4">
                  <p className="text-black fw-bold">Are you sure you want to delete the work category?</p>
                </div>
                <div className="py-3 px-4 text-end d-flex justify-content-between">
                  <button className="btn bg-white border-danger border-2 text-danger" type="button" onClick={closeModal}>
                    CANCEL
                  </button>
                  <button className="btn btn-danger" type="button" onClick={confirmAction}>
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
