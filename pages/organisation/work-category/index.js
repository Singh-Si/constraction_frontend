import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkCategory } from "@/store/organization-profile/work-category";
import EditCategory from "@/components/utils/Modal/EditCategory";
import AddCategory from "@/components/utils/Modal/AddCategory";
import Loader from "@/layouts/loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import config from "@/config/config";
import ConfirmationModal from "@/components/utils/Modal/Confirmation";

const WorkCategory = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [category, setCategory] = useState(""); 
  const [editCategoryId, setEditCategoryId] = useState(null); 
  const { workCategoryData, status } = useSelector((state) => state?.workSlice);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkCategory());
  }, [dispatch]);

  const handleEditClick = (categoryId, categoryName) => {
    setEditCategoryId(categoryId); 
    setCategory(categoryName); 
    setShowEditModal(true); 
  };
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDeleteCategoryId(null);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    setCategory(""); 
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditCategoryId(null);
    setCategory(""); 
  };

  const confirmDelete = async () => {
    const { currentOrganizationId, token } = parseCookies();
    try {
      const deleteUrl = `${config.API_URL}/work-category/remove/${deleteCategoryId}?organization=${currentOrganizationId}`;
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data.success) {
        toast.success("Work Category Deleted Successfully", { position: "top-center" });
        dispatch(fetchWorkCategory());
      } else {
        toast.error("Failed to delete work category", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error deleting work category:", error);
      toast.error("Failed to delete work category. Please try again later.", { position: "top-center" });
    }
    closeConfirmationModal();
  };

  const handleDeleteClick = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setShowConfirmationModal(true);
  };
  const handleClick = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <div className="row">
        <div className="text-end">
          <button
            onClick={handleClick}
            className="btn bg-btn-bg text-white new-site-btn"
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
          >
            +Add New
          </button>
        </div>
      </div>
      <div className="row p-0">
        <div className="col p-0">
          <ul className="mt-4 list-group shadow-sm m-auto small">
            <li className="list-group-item p-3 text-white fw-bolder bg-blue">
              <div className="row d-flex justify-content-start">
                <div className="col-1">S.No.</div>
                <div className="col-9">Category Name</div>
              </div>
            </li>

            {workCategoryData && workCategoryData?.workCategories.length > 0 ? (
              workCategoryData?.workCategories.map((item, index) => (
                <li className="list-group-item" key={item?._id}>
                  <div className="text-decoration-none text-black">
                    <div className="row py-2 border-bottom">
                      <div className="col-1 d-flex justify-content-start align-items-center">
                        <small>
                          <span className="fw-bold fs-6 text-blue">{index + 1}</span>
                        </small>
                      </div>
                      <div className="col-9 d-flex justify-content-start align-items-center">
                        <small>
                          <span className="fw-bold fs-6 text-blue">{item?.name}</span>
                        </small>
                      </div>
                      <div className="col-1 d-flex justify-content-between align-items-center">
                        <button className="btn btn-link" onClick={() => handleEditClick(item?._id, item?.name)}>
                          <i className="bi bi-pencil-square "></i>
                        </button>
                        <button className="btn btn-link" onClick={() => handleDeleteClick(item?._id)}>
                          <i className='bi bi-trash text-danger cursor-pointer fs-5'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : status === "loading" ? (
              <div className="d-flex justify-content-center align-items-center fw-bold" style={{ height: "50vh" }}>
                <Loader />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center fw-bold" style={{ height: "50vh" }}>
                No Work Category Added
              </div>
            )}
          </ul>
        </div>
      </div>

      <AddCategory showModal={showAddModal} closeModal={closeAddModal} status={status} />
      <EditCategory
        showModal={showEditModal}
        closeModal={closeEditModal}
        category={category}
        setCategory={setCategory}
        editCategoryId={editCategoryId}
        status={status}
      />
       <ConfirmationModal 
        showModal={showConfirmationModal}
        closeModal={closeConfirmationModal}
        confirmAction={confirmDelete}
      />

    </div>
  );
};

export default WorkCategory;
