import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import IndentDetails from "../../../../components/sites/materials/IndentDetails";
import MaterialLayout from "@/layouts/MaterialLayout";
import IndentCreateModal from "@/components/utils/Modal/material/IndentCreateModal";
import { fetchIndentAsync } from "@/store/material/IndentSlice";
import { ProgressSpinner } from "primereact/progressspinner";

const Indent = () => {
  const [clickedMaterial, setClickedMaterial] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [index, setIndexedValue] = useState("");
  const [selectedIndents, setSelectedIndents] = useState([]);
  const [selectedMaterialNames, setSelectedMaterialNames] = useState([]);
  const [isAtLeastOneIndentSelected, setIsAtLeastOneIndentSelected] = useState(false);

  const dispatch = useDispatch();
  const { userData, status } = useSelector((state) => state?.bomMaterialSlice);

  const handleClickMaterial = (item) => {
    setClickedMaterial(item);
    setActiveItemId(item?._id);
  };

  useEffect(() => {
    dispatch(fetchIndentAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.data && userData?.data?.length > 0) {
      const lastItem = userData?.data[userData?.data?.length - 1];
      setClickedMaterial(lastItem);
      setActiveItemId(lastItem._id);
    }
  }, [userData?.data]);

  const handleCheckboxChange = (e, id, materialData) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedIndents(prevSelectedIndents => {
        const updatedSelectedIndents = [...prevSelectedIndents, id];
        updateSelectedMaterialNames(updatedSelectedIndents);
        return updatedSelectedIndents;
      });
    } else {
      setSelectedIndents(prevSelectedIndents => {
        const updatedSelectedIndents = prevSelectedIndents.filter(selectedId => selectedId !== id);
        updateSelectedMaterialNames(updatedSelectedIndents);
        return updatedSelectedIndents;
      });
    }
  };

  const updateSelectedMaterialNames = (selectedIndents) => {
    let combinedMaterials = [];
    selectedIndents.forEach(id => {
      const indent = userData?.data.find(item => item._id === id);
      if (indent) {
        const materialDetails = indent?.materialId?.map(item => ({
          materialName: item?.material?.materialName,
          quantity: item.quantity,
          unitCost: item.material.unitCost,
          uom: item.material.uom,
          gst: item.material.gst,
          total: (item.quantity * item.material.unitCost) + ((item.quantity * item.material.unitCost) * parseFloat(item.material.gst.replace("%", "")) / 100),
          materialId: item?._id
        })) || [];
        combinedMaterials = [...combinedMaterials, ...materialDetails];
      }
    });
    setSelectedMaterialNames(combinedMaterials);
  };

  const handleCreatePOClick = () => {
    localStorage.setItem("selectedIndentIds", JSON.stringify(selectedIndents));
  };

  useEffect(() => {
    setIsAtLeastOneIndentSelected(selectedIndents.length > 0);
  }, [selectedIndents]);

  return (
<<<<<<< HEAD
=======
    <div>
        <div className="site-profile" style={{marginBottom :"1rem" }}>
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Sites /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Indent</span>
        </div>
        </div>
>>>>>>> 463abe6 (frontend additonals changes made)
    <MaterialLayout current="indent">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="fw-bold">All Created Indent List</span>
        </div>
        <div>
          {isAtLeastOneIndentSelected && (
            <Link 
              href={{
                pathname: `/sites/material/indent/${activeItemId}`,
                query: { selectedIndentIds: JSON.stringify(selectedIndents) }
              }}
            >
              <button
                type='button'
                className={`btn bg-btn-bg text-white me-3`}
                onClick={handleCreatePOClick}
              >
                + Create PO
              </button>
            </Link>
          )}
          <button
            type="button"
            className="btn bg-btn-bg text-white"
            data-bs-toggle="modal"
            data-bs-target="#indentCreateModal"
          >
            + Create Indent
          </button>
        </div>
      </div>
      <div className="row border-top mt-4 border-bottom-0 h-50 overflow-hidden">
        <div className="p-0 col-lg-3 dz-scroll height500 border border-right border-2 border-solid border-grey ">
          <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
            {/* {userData?.data?.slice().map((curVal, index) => {
              const id = curVal?._id;
              const isChecked = selectedIndents.includes(id);
              return (
                <Link
                  key={id}
                  href="#m1-tab"
                  data-bs-toggle="pill"
                  className={`text-decoration-none text-black py-3 border-bottom ${activeItemId === id ? 'active-material' : ''}  p-2`}
                  onClick={() => { setClickedMaterial(curVal); setIndexedValue(index+1); handleClickMaterial(curVal) }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="fw-bold py-1">MT{index < 10 ? `0${index + 1}` : index }</small>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e, id, curVal)}
                    />
                  </div>
                </Link>
              );
            })} */}
            {userData?.data?.slice().reverse().map((curVal, index) => {
  const id = curVal?._id; // Assuming each item has a unique 'id'
  const isChecked = selectedIndents.includes(id);
  const actualIndex = userData?.data?.length - index - 1;
console.log(activeItemId, "activeItemIdactiveItemIdactiveItemIdactiveItemIdactiveItemIdactiveItemId")
  return (
    <Link
      key={id}
      href="#m1-tab"
      data-bs-toggle="pill"
      className={`text-decoration-none text-black py-3 border-bottom ${activeItemId === id ? 'active-material' : ''} p-2`}
      onClick={() => { setClickedMaterial(curVal); setIndexedValue(actualIndex+1); handleClickMaterial(curVal) }}
    >
      <div className="d-flex align-items-center">
      <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e, id, curVal)}
        />
        <small className="fw-bold py-1 px-2">MT{actualIndex < 9 ? `0${actualIndex + 1}` : actualIndex + 1}</small>
      </div>
    </Link>
  );
})}

          </div>
        </div>

        {userData?.data?.length > 0 ? (
          <IndentDetails singleIndentData={clickedMaterial} index={index} />
        ) : status === "loading" ? (
          <ProgressSpinner className="mt-5" style={{ width: 50, height: 50 }} />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fw-bold"
            style={{ height: "40vh" }}
          >
            No Materials found
          </div>
        )}
      </div>
      <IndentCreateModal />
    </MaterialLayout>
<<<<<<< HEAD
=======
    </div>
>>>>>>> 463abe6 (frontend additonals changes made)
  );
};


export default Indent;
