import config from "@/config/config";
import { fetchWorkCategory } from "@/store/organization-profile/work-category";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCategory = ({ showModal, closeModal, status }) => {
  const [category, setcategory] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const { currentOrganizationId, token } = parseCookies();
    const name = category;
    try {
      const response = await axios.post(
        `${config.API_URL}/work-category/add?organization=${currentOrganizationId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setcategory("");
        toast.success("Work Catogory Added Successfully", { position: "top-center" }
        );
        router.push(router.asPath);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(status);
  return (
    <div>
      {showModal && (
        <div
          className="modal-backdrop fade-in-animation"
          data-bs-backdrop="true"
        >
          <div className="modal-dialog slide-in-from-bottom h-auto">
            <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
              <div className="w-100 ">
                <div className="d-flex bg-info  justify-content-center w-100 border-bottom modal-header text-center  rounded-top">
                  <div className="text-white p-3 fw-semibold fs-6 d-flex justify-content-between align-items-center w-100">
                    <span className="text-center text-black">Add New Work Category</span>
                    <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                  </div>
                </div>
                <div className="w-100 modal-body text-info p-4">
                  <small className="text-blue fw-bold text-grey">
                    Please Write Name of the New Category
                  </small>
                  <br />
                  <input
                    className="form-control mt-1"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    placeholder="Enter Work Category"
                  />
                  {/* <small>sync</small> */}
                </div>
                <div className="py-3 px-4 text-end d-flex justify-content-between">
                  <button
                    className="btn bg-white border-info border-2 text-info "
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    onClick={closeModal}
                  >
                    CANCEL
                  </button>
                  {status == "loading" ?
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </button>
                    : <button
                      className="btn bg-btn-bg text-white"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      {" "}
                      + Add
                    </button>}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
