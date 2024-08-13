// import SyncMember from "@/components/utils/Modal/Syncmember";
// import { useState } from "react";

// export const AddTeam = ({ siteId, setAddmemberState }) => {
//     const [syncModal, setsyncModal] = useState(false);

//     const handleSyncModal = () => {
//         setsyncModal(true);
//     };
//     const closeSyncModal = () => {
//         setsyncModal(false);
//     };

//     const onHandleDone = () => {
//         document.getElementsByClassName("btn-close")[0].click();
//         setAddmemberState(false)
//     }

//     return (
//         <div>
//             <div
//                 className="offcanvas offcanvas-end w-25 bg-white"
//                 tabIndex="-1"
//                 id="addoffcanvasRight"
//                 aria-labelledby="offcanvasRightLabel"
//                 data-bs-backdrop="static"
//             >
//                 <div className="offcanvas-header bg-light-blue">
//                     <h5 className="offcanvas-title" id="offcanvasRightLabel">
//                         Add Team Member
//                     </h5>
//                     <button
//                         type="button"
//                         className="btn-close me-0"
//                         data-bs-dismiss="offcanvas"
//                         aria-label="Close"
//                     ></button>
//                 </div>

//                 <div className="offcanvas-body p-3">
//                     <div className="form-group mt-4 ">
//                         <div className="d-flex gap-3 ">
//                             <div className=" sync-box text-blue border border-black border-3 rounded-pill p-2 w-50">
//                                 <i className="bi bi-person-fill "></i>
//                             </div>
//                             <div className="d-flex align-items-center ">
//                                 <label
//                                     className="form-check-label text-black fs-6 fw-bolder"
//                                     htmlFor="flexCheckDisabled"
//                                 >
//                                     You (Admin)
//                                 </label>
//                             </div>
//                         </div>
//                         <hr />
//                     </div>
//                     <div className="form-group mt-4">
//                         <button
//                             type="button"
//                             className="btn  text-end"
//                             onClick={handleSyncModal}
//                         >
//                             +Add Team
//                         </button>
//                         <SyncMember
//                             showModal={syncModal}
//                             closeModal={closeSyncModal}
//                             siteId={siteId}
//                         />
//                     </div>
//                     <div>

//                     </div>
//                     <div className="d-flex gap-3 text-start w-100 m-auto mt-4">
//                         <button
//                             type="submit"
//                             className=" m-auto w-50 border border-info bg-white shadow border-info auth_btn"
//                             data-bs-dismiss="offcanvas"
//                             aria-label="Close"
//                             onClick={() => setAddmemberState(false)}
//                         >
//                             Skip Do It Later
//                         </button>
//                         <button
//                             type="submit"
//                             className="text-white m-auto w-25 bg-blue auth_btn"
//                             data-bs-dismiss="offcanvas"
//                             aria-label="Close"
//                             onClick={onHandleDone}
//                         >
//                             Done
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import SyncMember from "@/components/utils/Modal/Syncmember";
import { useState } from "react";

export const AddTeam = ({ siteId, setAddmemberState, onClose,showAddTeamModal }) => {
    const [syncModal, setsyncModal] = useState(false);

    const handleSyncModal = () => {
        setsyncModal(true);
    };

    const closeSyncModal = () => {
        setsyncModal(false);
    };

    const onHandleDone = () => {
        document.getElementsByClassName("btn-close")[0].click();
        setAddmemberState(false);
    };

    const handleClose = ()=>{
        setAddmemberState(false)
    }

    return (
        <div className={`offcanvas offcanvas-end w-25 bg-white ${showAddTeamModal ? 'show' : ''}`} tabIndex="-1" id="addoffcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
            <div className="offcanvas-header bg-light-blue">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Add Team Member
                </h5>
                <button
                    type="button"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>

            <div className="offcanvas-body p-3">
                <div className="form-group mt-4">
                    <div className="d-flex gap-3">
                        <div className="sync-box text-blue border border-black border-3 rounded-pill p-2 w-50">
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="d-flex align-items-center">
                            <label
                                className="form-check-label text-black fs-6 fw-bolder"
                                htmlFor="flexCheckDisabled"
                            >
                                You (Admin)
                            </label>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="form-group mt-4">
                    <button
                        type="button"
                        className="btn text-end"
                        onClick={handleSyncModal}
                    >
                        +Add Team
                    </button>
                    <SyncMember
                        showModal={syncModal}
                        closeModal={closeSyncModal}
                        siteId={siteId}
                    />
                </div>
                <div className="d-flex gap-3 text-start w-100 m-auto mt-4">
                    <button
                        type="button"
                        className="m-auto w-50 border border-info bg-white shadow border-info auth_btn"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        Skip Do It Later
                    </button>
                    <button
                        type="button"
                        className="text-white m-auto w-25 bg-blue auth_btn"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={onHandleDone}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
