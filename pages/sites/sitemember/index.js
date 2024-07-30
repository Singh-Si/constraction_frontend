import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nookies, { parseCookies } from 'nookies';
import AddSiteMember from '@/components/utils/Modal/AddSiteMember';
import Image from 'next/image';
import SearchInput from '@/components/utils/SearchInput';
import config from '@/config/config'; // Make sure to import config

const Index = ({ permissions }) => {
    const [siteMembers, setSiteMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const router = useRouter();
    const { siteId } = parseCookies();

    const openInviteMemberModal = () => {
        setShowInviteMemberModal(true);
    };

    const closeInviteMemberModal = () => {
        setShowInviteMemberModal(false);
    };

    const filteredTasksData = siteMembers.filter(
        (item) =>
            item &&
            item?.siteMemberData?.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const onChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        const fetchSiteMembers = async () => {
            setLoading(true);
            const { currentOrganizationId, token, siteId } = parseCookies();
            try {
                const response = await axios.get(`${config.API_URL}/site/getMembers`, {
                    params: {
                        site: siteId,
                        organization: currentOrganizationId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoading(false);
                setSiteMembers(response.data.site || []); // Ensure response.data.site is handled correctly
                console.log('API response:', response.data);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching site members:', error);
            }
        };

        if (siteId) {
            fetchSiteMembers();
        }
    }, [siteId]);

    return (
        <>
            <div className="row">
                <div className="col-4 mb-3">
                    <SearchInput className="form-control" placeholder="Search Members" onChange={onChange} value={searchInput} />
                </div>

                <div className="col-8 text-end">
                    <button type="button" className="border-info text-white m-auto bg-btn-bg rounded px-2 py-1 btn btn-primary" onClick={openInviteMemberModal}>+ Add Member</button>
                </div>
            </div>

            <div className="row mt-4">
    <div className="col">
        <ul className="list-group shadow-sm m-auto small">
            <li className="list-group-item p-4 text-white fw-bold bg-blue"> {/* Changed bg-blue to bg-primary */}
                <div className="row align-items-center">
                    <div className="col-3">Members</div>
                    <div className="col-4">Assigned Members</div>
                    <div className="col-3">Role</div>
                    <div className="col-2 text-center">Delete</div>
                </div>
            </li>

            {loading ? (
                <div className="text-center mt-3">Loading...</div>
            ) : filteredTasksData.length > 0 ? (
                filteredTasksData.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <div className="row align-items-center">
                            <div className="col-3 d-flex align-items-center">
                                <div className="profile-logo bg-danger text-white capitalize shadow border border-3"> {/* Added text-white for white text */}
                                    <h2 className="text-white mt-3">{item?.siteMemberData?.name.charAt(0)}</h2>
                                </div>
                                <div className="ms-3">
                                    <span className="fw-bold">{item?.siteMemberData?.name}</span>
                                </div>
                            </div>

                            <div className="col-4 d-flex align-items-center">
                                <small className="w-100"><span className="fw-bold text-success fs-6"><i className="bi bi-shield-check fs-5"></i> Accepted</span></small> {/* Changed class to className */}
                            </div>

                            <div className="col-3 d-flex align-items-center">
                                <span className="form-control">{item?.roleData[0]?.name}</span>
                            </div>

                            <div className="col-2 d-flex align-items-center justify-content-center">
                                <i className="bi bi-trash text-danger cursor-pointer fs-4"></i>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <div className="text-center mt-3">No members found.</div>
            )}
        </ul>
    </div>
</div>


            <AddSiteMember showModal={showInviteMemberModal} closeModal={closeInviteMemberModal} roles={permissions} siteId={siteId} />
        </>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const { token, siteId, currentOrganizationId } = nookies.get(context);
    let data;

    try {
        const response = await axios.get(`https://construction-backend.onrender.com/site/members`, {
            params: {
                site: siteId,
                organization: currentOrganizationId,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response, "responseresponseresponseresponseresponse");
        data = response?.data;
    } catch (error) {
        data = error?.response?.data?.error;
    }
    return {
        props: {
            siteMembers: data || null,
        }
    }
}
