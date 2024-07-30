import config from '@/config/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { toast } from 'react-toastify'

const AcceptOrg = ({ showModal, closeModal, orgName, orgId }) => {

    const { email, token } = parseCookies()
    const router = useRouter()
    const handleOrg = async () => {
        try {
            const response = await axios.post(`https://construction-backend.onrender.com/member/invite/accept?organization=${orgId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response?.data?.success){
                closeModal()
            }
            router.reload()
            toast.success("Invitation Accepted  Successfully", { position: "top-center" });
            
        } catch (error) {
            console.error("Error in accept Organization :", error);
            toast.error("Organization Invitaion not accepter");
        }
    }
    const handleDeny = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member/invite/reject?organization=${orgId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(response?.data?.success){
                closeModal()
            }
            router.reload()
            toast.success("Invitation Rejected  Successfully", { position: "top-center" });
            
        } catch (error) {
            console.error("Error in accept Organization :", error);
            toast.error("Organization Invitaion not accepter");
        }
        closeModal()
    }
   
    return (
        <div>
            <div className="modal-backdrop fade-in-animation" data-bs-backdrop="true">
                <div className="modal-dialog slide-in-from-bottom h-auto">
                    <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                        <div className="w-100 " >
                            <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top ' >
                                <div className='fs-xxl text-blue p-3 fw-bold '>Accept Organization</div>
                                <span onClick={closeModal} className='cursor-pointer text-black p-3'>X</span>
                            </div>

                            <div className='w-100 modal-body text-info'>

                                <div className='p-4'> {/* <div className="text-end w-100 m-auto d-flex mt-5 "><button className="bg-info text-white rounded p-2 w-50 m-auto"> CREATE</button></div> */}
                                    <div className='mt-2'>
                                        {/* <label className='text-black'>Select Site</label> */}
                                        <input
                                            className='form-control'
                                            value={orgName}
                                            disabled
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        {/* <label className='text-black'> Site Budget</label> */}

                                        <input
                                            className='form-control '
                                            value={email}
                                            disabled
                                        />
                                    </div>

                                    <div className='mt-3 w-100 gap-5  d-flex justify-content-between'>
                                        <button type="submit"
                                            className="text-white m-auto w-100 bg-danger auth_btn" onClick={()=>handleDeny()}>Deny </button>
                                        <button type="submit"
                                            className="text-white m-auto w-100 bg-success auth_btn" onClick={() => handleOrg()}>Accept </button>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AcceptOrg