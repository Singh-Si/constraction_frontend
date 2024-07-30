import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import config from '@/config/config'; // Make sure to import config

function SyncMember({ showModal, closeModal }) {
    const [invitationAcceptedMembers, setInvitationAcceptedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const { currentOrganizationId, token, siteId } = parseCookies();
    const router = useRouter();
    useEffect(() => {
      const fetchInvitationAcceptedMembers = async () => {
          try {
              const response = await axios.get(`${config.API_URL}/site/getInvitationAcceptMembers`, {
                  params: {
                      organization: currentOrganizationId,
                  },
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              console.log('Fetched Members:', response.data); // Log fetched data

              if (response?.data?.success && response?.data?.data) {
                  const members = response.data.data.map((member) => member.memberDetails);
                  setInvitationAcceptedMembers(members);
              } else {
                  console.error('Unexpected response structure:', response.data);
                  toast.error('Failed to fetch members: Unexpected response structure');
              }
          } catch (error) {
              console.error('Error fetching members:', error?.response?.data?.error || error.message);
              toast.error('Error fetching members: ' + (error?.response?.data?.error || error.message));
          }
      };

      if (currentOrganizationId && token) {
          fetchInvitationAcceptedMembers();
      }
  }, [currentOrganizationId, token]);

  const handleChange = (id, checked) => {
    setSelectedMembers((prevMembers) => {
        if (checked) {
            return [...prevMembers, id];
        } else {
            return prevMembers.filter((memberId) => memberId !== id);
        }
    });
};

const addMember = async () => {
    const { currentOrganizationId, token, siteId } = parseCookies();
    const data = JSON.stringify({
        membersId: selectedMembers,
    });

    try {
        setLoading(true);
        const response = await axios.put(
            `${config.API_URL}/site/mebers`, // Correct endpoint path
            data,
            {
                params: {
                    site: siteId,
                    organization: currentOrganizationId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const userData = response.data;
        if (userData.success) {
            toast.success("Member Added Successfully", { position: "top-center" });
            router.push(router.asPath);
            closeModal();
        } else {
            toast.error(userData.error, { position: "top-center" });
        }
    } catch (error) {
        toast.error(error?.response?.data?.error, { position: "top-center" });
    } finally {
        setLoading(false);
    }
};


    // if (!showModal) return null;

    return (
        <>
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-dialog slide-in-from-bottom h-75">
                        <div className="modal-content fade-in-animation p-0 h-none justify-content-start">
                            <div className="w-100 h-100">
                                <div className='d-flex justify-content-between w-100 border-bottom modal-header bg-light-blue rounded-top'>
                                    <div className='fs-5 fw-bolder text-blue p-3 '>Add Site Member</div>
                                    <span onClick={closeModal} className='cursor-pointer text-black mr-4 p-3'>x</span>
                                </div>
                                <div className="overflow-y-scroll h-75">
                                    {invitationAcceptedMembers.length ? (
                                        invitationAcceptedMembers.map((item, index) => (
                                            <div key={index} className='w-100 row modal-body text-info p-2'>
                                                <div className="form-check d-flex justify-content-between">
                                                    <div className="d-flex gap-4">
                                                        <div className="sync-box text-blue border fw-bolder bg-light-blue border-black border-3 rounded-pill p-2 w-50">
                                                            {item?.name.charAt(0) ?? ''}
                                                        </div>
                                                        <div>
                                                            <label className="form-check-label text-black d-flex flex-column gap-1" htmlFor={`flexCheck${index}`}>
                                                                <span>{item?.name}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="cursor-pointer p-3 h-100"
                                                            type="checkbox"
                                                            id={`flexCheck${index}`}
                                                            onChange={(e) => handleChange(item?._id, e.target.checked)}
                                                        />
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    ) : loading ? (
                                        <div className="spinner-border" role="status">
                                            <div className="visually-hidden">Loading...</div>
                                        </div>
                                    ) : (
                                        <div className='h-100 text-center d-flex flex-column align-items-center justify-content-center p-5'>
                                            <div>No Member found</div>
                                            <div>To add Member Please<Link href="/member" className='mx-1'>Click</Link>here</div>
                                        </div>
                                    )}
                                </div>
                                {invitationAcceptedMembers.length > 0 && (
                                    <div className="w-50 m-auto mt-2">
                                        {!loading ? (
                                            <button type='button' className="text-white m-auto w-100 bg-btn-bg auth_btn" onClick={addMember}>Add</button>
                                        ) : (
                                            <button className="btn btn-primary w-100" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SyncMember;
