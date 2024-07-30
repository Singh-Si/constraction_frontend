import { useEffect, useState } from "react";

import axios from "axios";
import nookies, { parseCookies } from "nookies"
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import config from "@/config/config";

const AssignMembers = ({ response }) => {
    const [memberData, setMemberData] = useState([]);
    const cookies = parseCookies();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.API_URL}/permission/members/${id}?organization=${cookies?.currentOrganizationId}`,
                    { headers: { Authorization: `Bearer ${cookies?.token}` } }
                );

                setMemberData(response?.data?.members);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='row'>
            <div className='col'>
                <ul className="mt-4 list-group shadow-sm w-75 m-auto small">
                    <li className="list-group-item p-3 text-white fw-bolder bg-blue">
                        <div className='row'>
                            <div className='col'>Role</div>
                            <div className='col'>Details</div>
                            <div className='col'>Actions</div>
                        </div>
                    </li>

                    {memberData && memberData?.length > 0 ?
                        memberData && memberData?.map((member, index) => {
                            return (
                                <li key={index} className="list-group-item">
                                    {/* <div  className='text-decoration-none text-black'> */}
                                        <div href="/member" className='row'>
                                            <div className='col d-flex align-items-center m-0 gap-3' >
                                                <div className="d-flex justify-content-center align-items-center bg-danger shadow" style={{ width: 50, height: 50, borderRadius: 40 }}>
                                                    {/* <h2 className="text-white mt-3">{firstNameInitial}{lastNameInitial}</h2> */}
                                                    <span className="text-white fs-5">{member?.user?.name.charAt(0)}</span>
                                                </div>

                                                <span className='bold'>{member?.user?.name ? member?.user?.name?.charAt(0).toUpperCase() + member?.user?.name?.slice(1) : ''}</span>


                                                {/* <div><span>{member?.user?.phone}</span></div> */}
                                            </div>


                                            <div className='col'>
                                                {/* {member?.permission?.name} */}
                                                <span className="font_light">{member?.user?.phone?.number}</span>
                                                <br />
                                                <span className="font_light">{member?.user?.email?.address}</span>
                                            </div>
                                            <div className='col d-flex align-items-center'><i className='bi bi-trash' style={{ fontSize: 20, color: "red" }}></i> </div>
                                        </div>
                                    {/* </div> */}
                                </li>

                            )
                        })

                        : <div className="d-flex align-items-center justify-content-center" style={{ height: 80 }}>No Member Added</div>
                    }

                </ul>
            </div>
        </div>
    )
}

export default AssignMembers;