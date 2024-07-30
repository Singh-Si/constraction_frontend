import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
import BomComponent from "@/components/sites/bom/Bom";
import BomCreate from "@/components/sites/bom/BomCreate";
import { fetchMaterialBomAsync } from "@/store/material/Bom";
import StocksLayout from "@/layouts/StocksLayout";
import SearchInput from "@/components/utils/SearchInput";
<<<<<<< HEAD

=======
>>>>>>> 463abe6 (frontend additonals changes made)
const Materials = () => {
  const [clickedMaterial, setClickedMaterial] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [filterText, setFilterText] = useState("");

  const { userData, status } = useSelector((state) => state?.bomMaterialSlice);
  const dispatch = useDispatch();

  const handleClickMaterial = (item) => {
    setClickedMaterial(item);
    setActiveItemId(item?._id);
  };

  const filteredItems =
    userData &&
    userData?.data?.filter(
      (item) =>
        item &&
        item?.materialName &&
        item?.materialName?.toLowerCase().indexOf(filterText?.toLowerCase()) !==
          -1
    );

  useEffect(() => {
    dispatch(fetchMaterialBomAsync());
  }, []);

  useEffect(() => {
    if (filteredItems && filteredItems?.length > 0) {
      const lastItem = filteredItems[filteredItems?.length - 1];
      setClickedMaterial(lastItem);
      setActiveItemId(lastItem._id);
    }
  }, [filteredItems?.length]);
  // { userData?.data?.length > 0 && <BomComponent material={filterText} /> }

  return (
    <div current="bom">
      <div className="row bg-light-blue d-flex justify-content-end">
        <span className="text-blue fw-bold p-2">BOM (Bill Of Material)</span>
      </div>
      <div className="row mt-4">
        <div className="col-3 mb-3">
          <div className="input-group mb-3">
            <SearchInput
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              placeholder="Search Bom..."
              value={filterText}
            />
          </div>
        </div>
        {/* <div className='col-3 gap-2 d-flex justify-content-between p-0'>
                    <button className=' bg-white text-info new-site-btn border border-info'>Export Material List</button>
                    <button className=' bg-white text-info new-site-btn border border-info' type="button" data-bs-toggle="offcanvas">Upload Material List</button>
                </div> */}
        <div className="col-9 text-end">
          <button
            className="btn bg-btn-bg text-white new-site-btn"
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            + Add Material
          </button>
        </div>
      </div>
      <small className="fw-bold mt-4">All Added BOM List</small>
      <div className="row border-top border-bottom-0">
        {userData && userData?.data?.length > 0 && filteredItems?.length > 0 ? (
          <>
            <div className="col-lg-3 dz-scroll height500 border border-right border-2 border-solid border-grey  p-0">
              <div className="nav flex-column nav-pills mb-3 mtngtabs mting">
                {filteredItems
                  ?.slice()
                  .reverse()
                  .map((item) => (
                    <Link
                      key={item?._id}
                      href="#m1-tab"
                      data-bs-toggle="pill"
                      className={`text-decoration-none text-black p-3 border-bottom ${
                        activeItemId === item?._id ? "active-material" : ""
                      }`}
                      onClick={() => handleClickMaterial(item)}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <small className="fw-bold text-blue py-1">
                            {item?.materialName}
                          </small>
                          <br />
                          <small className="py-1">{item?.description}</small>
                        </div>
                        <small className="py-1 text-grey">
                          <i className="bi bi-arrow-right"></i>
                        </small>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <BomComponent material={clickedMaterial} />
          </>
        ) : status === "loading" ? (
          <ProgressSpinner className="mt-5" style={{ width: 50, height: 50 }} />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fw-bold"
            style={{ height: "40vh" }}
          >
            No Materials fournd
          </div>
        )}
        <BomCreate />
      </div>
    </div>
  );
};

export default Materials;
