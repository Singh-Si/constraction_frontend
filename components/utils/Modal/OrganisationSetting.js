import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import CreateOrganisation from "@/components/utils/Modal/CreateOrganisaton";

function OrganisationSetting({ showModal, closeModal }) {
    const [createOrgModal, setCreateOrgModal] = useState(false);

    const { organizations } = useSelector((state) => state?.getOrganizationAsync?.userData);
    
    const OpenOrgnisationModal = () => {
        setCreateOrgModal(true)
    }

    return (
        <div>
            {showModal &&
                <div className="modal-backdrop fade-in-animation ">
                    <div className="modal-dialog slide-in-from-bottom h-75">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100 h-100 overflow-scroll" >
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top position-absolute z-1 modal_title'>
                                    <div className='fs-6 text-blue p-3 '>Organization Settings</div>
                                    <span onClick={closeModal} className='cursor-pointer text-black mr-4 p-3 cross_styles'>X</span>
                                </div>

                                <div className='w-100 modal-body text-info p-4 position-relative top-4 mt-5'>
                                    {
                                        organizations && organizations?.map((item, index) =>
                                            <div key={index}>
                                                <span className="text-black"><Image src="/assets/images/side_homeIcon.png" width={50} height={50} /> {item?.name}</span>
                                                <hr />
                                            </div>
                                        )
                                    }


                                    <div>
                                        <span className="cursor-pointer" onClick={OpenOrgnisationModal}>+ Create New Organisation</span>
                                        <CreateOrganisation showModal={createOrgModal} closeModal={closeModal} setCreateOrgModal={setCreateOrgModal}/>
                                    </div>

                                    <hr />
                                </div>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrganisationSetting;