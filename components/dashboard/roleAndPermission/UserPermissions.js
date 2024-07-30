
import axios from "axios";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';
import { useState } from "react";

const UserPermissions = ({ updatePermission, permission, setUpdatePermission }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token, currentOrganizationId } = parseCookies();
    const router = useRouter();

    const toggleFeature = (feature, rule) => {
        setUpdatePermission((prevState) => ({
            ...prevState,
            features: prevState.features.map((item) =>
                item._id === feature
                    ? {
                        ...item,
                        permissions: {
                            ...item.permissions,
                            [rule]: !item.permissions[rule],
                            // Automatically check 'View' when any other checkbox is clicked
                            read: rule !== 'read' ? true : item.permissions.read,
                        },
                    }
                    : item
            ),
        }));
    };

    const toggleSwitch = (feature) => {
        const toggleAllChecked = updatePermission?.features?.some(
            (item) =>
                item?._id === feature &&
                (item?.permissions?.read ||
                    item?.permissions?.update ||
                    item?.permissions?.insert ||
                    item?.permissions?.delete)
        );

        setUpdatePermission((prevState) => ({
            ...prevState,
            features: prevState.features?.map((item) =>
                item?._id === feature
                    ? {
                        ...item,
                        permissions: {
                            read: !toggleAllChecked,
                            update: !toggleAllChecked,
                            insert: !toggleAllChecked,
                            delete: !toggleAllChecked,
                        },
                    }
                    : item
            ),
        }));
    };

    const onSubmit = async () => {

        try {
            setIsSubmitting(true);

            const response = await axios.patch(`https://construction-backend.onrender.com/permission/update?organization=${currentOrganizationId}`, {
                permissions: {
                    _id: router.query.id,
                    features: updatePermission?.features.reduce((acc, feature) => {
                        acc[feature?._id] = {
                            read: feature?.permissions?.read,
                            update: feature?.permissions?.update,
                            delete: feature?.permissions?.delete,
                            insert: feature?.permissions?.insert,
                        };
                        return acc;
                    }, {}),
                },
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response?.data?.success) {
                toast.success("Permission Updated Successfully", { position: "top-center" });
                router.push("/role-and-permission");
            }

        } catch (error) {
            toast.error(error?.response?.data.error, { position: "top-center" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container w-75 shadow-lg px-4 pt-4 pb-5 rounded">
            <div className="row">
                <div className="col-6">
                    <p>{permission?.name}</p>
                </div>

                <div className='col-6 text-end mb-4'>
                    {updatePermission && !permission?.isAdmin &&
                        <button type="button" className='btn bg-btn-bg text-white new-site-btn' onClick={onSubmit} disabled={isSubmitting}>
                            <span role="status"> {isSubmitting ?
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </>

                                : "Save"
                            }
                            </span>
                        </button>
                    }
                </div>
            </div>

            <div className="accordion" id="Features">
                {updatePermission && updatePermission?.features.map((feature) => {
                    return (
                        <div className="accordion-item" key={feature?._id}>
                            <h2 className="accordion-header" id={`feature_heading_${feature?._id}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#feature_${feature?._id}`} aria-expanded={feature?._id === permission?.features[0]._id} aria-controls={`feature_${feature?._id}`}>
                                    <div className="row w-100 d-flex align-items-center">
                                        <div className="col small">
                                            {feature?.feature?.name}
                                        </div>
                                        <div className="col">
                                            <span> {feature?.permissions?.read ? "All Access" : "No Access"}</span>
                                        </div>

                                        <div className="col" style={{ fontSize: 12 }}>
                                            <div style={{ background: !feature?.permissions?.read ? 'none' : '#eef5f9', display: "inline-block", padding: "8px 8px", fontWeight: 600 }}>
                                                {feature?.permissions?.read && "VIEW"}{feature?.permissions?.insert && "-CREATE"}{feature?.permissions?.update && "-EDIT"}{feature?.permissions?.delete && "-DELETE"}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div id={`feature_${feature?._id}`} className={`accordion-collapse collapse ${feature?._id === permission?.features[0]._id ? "show" : ""}`} aria-labelledby={`feature_heading_${feature?._id}`} data-bs-parent="#Features">
                                <div className="accordion-body">
                                    <div className="row">
                                        <div className='col'>
                                            <input type="checkbox" readOnly disabled checked={feature?.permissions?.read} onChange={() => toggleFeature(feature?._id, "read")} id={`read_${feature?._id}`} className='me-2' />
                                            <label htmlFor={`read_${feature._id}`}>View</label>
                                        </div>
                                        <div className='col d-flex align-items-center'>
                                            <input type="checkbox"
                                                checked={feature?.permissions?.update}
                                                onChange={() => toggleFeature(feature?._id, "update")}
                                                id={`update_${feature?._id}`} className='me-2'
                                                disabled={permission?.isAdmin}
                                            />
                                            <label htmlFor={`update_${feature?._id}`}>Update</label>
                                        </div>
                                        <div className='col d-flex align-items-center'>
                                            <input type="checkbox" checked={feature?.permissions?.insert} onChange={() => toggleFeature(feature?._id, "insert")} id={`insert_${feature?._id}`} className='me-2' disabled={permission?.isAdmin} />
                                            <label htmlFor={`insert_${feature?._id}`}>Create</label>
                                        </div>
                                        <div className='col d-flex align-items-center'>
                                            <input type="checkbox" checked={feature?.permissions?.delete} onChange={() => toggleFeature(feature?._id, "delete")} id={`delete_${feature?._id}`} className='me-2' disabled={permission?.isAdmin} />
                                            <label htmlFor={`delete_${feature?._id}`}>Delete</label>
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <div className="form-check form-switch d-flex align-items-center">
                                                <input type="checkbox" className="form-check-input cursor-pointer" role="switch" id={feature?._id}
                                                    defaultChecked={feature?.permissions?.read || feature?.permissions.update || feature?.permissions.delete || feature?.permissions.insert}
                                                    onClick={() => toggleSwitch(feature?._id)} disabled={permission?.isAdmin} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserPermissions;