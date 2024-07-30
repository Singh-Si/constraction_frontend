import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

const Attachments = ({ taskresponse, userpermission }) => {
    const [attachments, setAttachment] = useState([]);

    const { token, currentOrganizationId, siteId, floorId } = parseCookies();
    const fileInputRef = useRef(null);

    const handleAddButtonClick = () => {
        fileInputRef.current.click();
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://construction-backend.onrender.com/task/attachments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse?._id
                },
            })

            const { data } = res;
            if (data.success) {
                setAttachment(data)
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleFileInputChange = async (event) => {
        const selectedFile = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('attachment', selectedFile);
            const res = await axios.post(`https://construction-backend.onrender.com/task/attachment/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                    floor: floorId,
                    task: taskresponse?._id
                }
            });

        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [taskresponse?._id])

    return (
        <ul className=" list-group m-auto mt-5">
            <li className="list-group-item p-3  fw-bold bg-task-title mb-3">
                <div className='row d-flex justify-content-between'>
                    <div className='col-6 text-black'>Attachments</div>
                    <div className='col-6 text-end'>
                        {userpermission && userpermission?.insert && <button type='submit' onClick={handleAddButtonClick} className='text-black text-end cursor-pointer'>+ Add
                            <input
                                ref={fileInputRef}

                                type="file" className="form-control d-none" onChange={handleFileInputChange} />
                        </button>}
                    </div>
                </div>
            </li>

            {attachments && attachments?.taskAttachments?.map((curVal) => {
                return (
                    <React.Fragment key={curVal._id}>
                        <iframe src={curVal?.attachment?.url} style={{ width: 200, height: 200 }} frameborder="0"></iframe>
                    </React.Fragment>
                )
            })}


            {!attachments.length && (
                <div className='text-center fw-bold border-bottom p-3'>
                    There are no Attachments
                </div>
            )}
        </ul>
    )
}

export default Attachments