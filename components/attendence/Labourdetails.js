import React from "react";
import EditFloor from "../utils/Modal/EditFloor";
import EditProfile from "@/components/attendence/EditProfile";
// import EditProfile from './EditProfile'
import Labourupdate from './Labourupdate'

const Labourdetails = ({ props }) => {

  return (
    <div className="row-sm ">
      <ul className="mt-4 p-0 text-decoration-none list-style-none w-100  shadow-sm  m-auto small">
        <li className="list-group-item list-group-item  fw-bold bg-gray text-black">
          <div href="/member" className="text-decoration-none text-black">
            <div className="row bg-light-gray">
              <div className="border border-gray py-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Sr No.</small>
              </div>

              <div className="border  col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Name</small>
              </div>
              <div className=" border col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Contact No.</small>
              </div>
              <div className="border  col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Labour Role </small>
              </div>
              <div className="border  col-1 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Gender </small>
              </div>
              <div className="border  col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Daily Pay </small>
              </div>
              <div className="border  col-1 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Daily Hours </small>
              </div>
              {/* <div className="border  col-1 d-flex align-items-center px-2 m-0 gap-3 ">
                <small className="w-100 text-center">Edit </small>
              </div> */}
            </div>
          </div>
        </li>

        {props &&
          props?.map((item, index) => {
            return (
              <li key={index} className="list-group-item ">
                <div href="/member" className="text-decoration-none text-black">
                  <div className="row ">
                    <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">{index + 1}</small>
                      {/* <small><Image src={item.image} width="150" heigh="150" alt=""/></small> */}
                    </div>

                    <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">{item?.name}</small>
                    </div>
                    <div className=" border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">{item?.number}</small>
                    </div>
                    <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">{item?.role}</small>
                    </div>
                    <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">
                        {item?.gender ? "Male" : "Female"}
                      </small>
                    </div>
                    <div className="border p-3 col-2 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">
                        {item?.payment}
                      </small>
                    </div>
                    <div className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 ">
                      <small className="w-100 text-center">
                        {item?.dailyHours}
                      </small>
                    </div>
                    {/* <div
                      className="border p-3 col-1 d-flex align-items-center px-2 m-0 gap-3 cursor-pointer"
                      onClick={() => handleEdit(item?._id)}
                    >
                      <small className="w-100 text-center">
                      <button className='btn bg-info text-white ' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#editoffcanvasRight" aria-controls="offcanvasRight">
                        +Profile</button>

                      <button className='btn bg-info text-white ' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#editoffcanvasRight" aria-controls="offcanvasRight">+
                      <i className="bi bi-pencil"></i></button>

                      
                          
                   
                       
                       
                      </small>
                    </div> */}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <EditProfile/>
    </div>
   
  );
};

export default Labourdetails;
