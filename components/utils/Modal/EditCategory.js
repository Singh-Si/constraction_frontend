import config from "@/config/config";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'; 
import { fetchWorkCategory } from "@/store/organization-profile/work-category";

const EditCategory = ({ showModal, closeModal, category, setCategory, editCategoryId, status }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentOrganizationId, token } = parseCookies();

  useEffect(() => {
    dispatch(fetchWorkCategory());
  }, [dispatch]);

  const handleEdit = async () => {
    console.log(editCategoryId, "Category ID being edited");

    try {
      const updateUrl = `${config.API_URL}/work-category/update/${editCategoryId}?organization=${currentOrganizationId}`;
      const response = await axios.patch(updateUrl, 
        { name: category },  // Include the name in the payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data.success) {
        toast.success("Work Category Updated Successfully", { position: "top-center" });
        dispatch(fetchWorkCategory());
        closeModal();
      } else {
        toast.error("Failed to update work category", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error updating work category:", err);
      toast.error("Failed to update work category. Please try again later.", { position: "top-center" });
    }
  };

  return (
    <div>
      {showModal && (
        <div className="modal-backdrop fade-in-animation">
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100">
                <div className="d-flex bg-info justify-content-center w-100 border-bottom modal-header text-center rounded-top">
                  <div className="text-white p-3 fw-semibold fs-6 d-flex justify-content-between align-items-center w-100">
                    <span className="text-center text-black">Edit Work Category</span>
                    <button type="button" className="btn-close text-white" aria-label="Close" onClick={closeModal}></button>
                  </div>
                </div>
                <div className="w-100 modal-body text-info p-4">
                  <small className="text-blue fw-bold text-grey">
                    Please Edit the name of the Category
                  </small>
                  <br />
                  <input
                    className="form-control mt-1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter Work Category"
                  />
                </div>
                <div className="py-3 px-4 text-end d-flex justify-content-between">
                  <button
                    className="btn bg-white border-info border-2 text-info"
                    type="button"
                    onClick={closeModal}
                  >
                    CANCEL
                  </button>
                  {status === "loading" ? (
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </button>
                  ) : (
                    <button
                      className="btn bg-btn-bg text-white"
                      type="button"
                      onClick={handleEdit}
                    >
                      + Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
