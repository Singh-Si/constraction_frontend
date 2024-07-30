import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

function InviteMember({ roles, closeModal }) {
    const [memberArray, setMemberarray] = useState([{
        name: '',
        phone: '',
        permission: '',
        touched: false // Add touched state to track user interaction
    }]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { currentOrganizationId, token } = parseCookies();

    const AddMoreMember = () => {
        setMemberarray([...memberArray,
        {
            name: '',
            phone: '',
            permission: '',
            touched: false
        }
        ]);
    }
    const handleInputChange = (index, field, value) => {
        const updatedArray = [...memberArray];
        // Check if the input is for the phone field
        if (field === 'phone') {
            // Remove non-numeric characters from the input value
            value = value.replace(/\D/g, '');
            // Limit the input to 10 characters
            value = value.slice(0, 10);
        }
        updatedArray[index][field] = value;
        updatedArray[index].touched = true; // Set touched to true when user interacts with the field
        setMemberarray(updatedArray);
        setIsFormValid(updatedArray.every(item => item.name && item.phone));
    };
    const handleeremove = (index) => {
        const newmember = memberArray.filter((e, i) => i != index)
        setMemberarray(newmember)
    }
    const onSubmit = async () => {
        // Check if the form is valid before submitting
        if (!isFormValid) {
            toast.warning("Please fill all required fields.", { position: "top-center" });
            return;
        }

        const members = memberArray;
        try {
            setLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member/invite/?organization=${currentOrganizationId}`,
                { members },
                { headers: { Authorization: `Bearer ${token}` } })

            if (response?.data?.success) {
                document.getElementById("close_invite_modal").click();
                toast.success("Member Invitation Sent Successfully", { position: "top-center" })
                router.push(router.asPath);
            } 
            // else {
            //     toast.error("Member Already Added", { position: "top-center" })
            // }
        } catch (error) {
            // toast.error("Something Went Wrong", { position: "top-center" })
            console.log("error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal fade bd-example-modal-xl" tabIndex="-1" id="inviteMemberModal" role="dialog" aria-labelledby="inviteMemberModal" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg w-100 h-auto" role="document">
                    <div className="modal-content w-100 h-auto">
                        <div className="modal-header w-100 h-auto">
                            <h5 className="modal-title h4" id="myExtraLargeModalLabel">Add Members</h5>
                            <button type="button" id="close_invite_modal" className="btn-close me-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="w-100 bg-none">
                            {memberArray.map((item, index) => (
                                <form key={index} className="form d-flex flex-wrap w-100">
                                    <div className='w-100 d-flex justify-content-between'>
                                        <div className="form-group mt-2">
                                            <div className='text-start w-100'><label htmlFor="exampleInputPassword1"> Name</label></div>
                                            <input type="text" className="form-control border border-info" placeholder="Enter Name" value={item.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                                            {item.touched && item.name === "" && <small className="text-danger">Name is required</small>}
                                        </div>
                                        <div className="form-group mt-2">
                                            <div className='text-start '><label htmlFor="exampleInputPassword1">Contact</label></div>
                                            <input type="text" className="form-control border border-info" id="exampleInputPassword1" value={item.phone} placeholder="+91 0000000000" onChange={(e) => handleInputChange(index, 'phone', e.target.value)} />

                                            {item.touched && <small className="text-danger">Please Enter Mobile number</small>}
                                        </div>
                                        <div className="form-group mt-2">
                                            <div className='text-start w-100'><label htmlFor="exampleInputPassword1">Role</label></div>
                                            <select
                                                className="form-control border border-info py-0"
                                                style={{ WebkitAppearance: "auto", appearance: "auto", borderRadius: 10 }}
                                                aria-label="Default select example" value={item.role} onChange={(e) => handleInputChange(index, 'permission', e.target.value)}>
                                                <option value="">Select a Role</option>
                                                {roles && roles.map((role, idx) => (
                                                    <option key={idx} value={role?._id}>{role?.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className=" mt-2 d-flex align-items-center ">
                                            <div className='text-start mt-4 '><label className="cursor-pointer rounded border p-2" onClick={() => handleeremove(index)}><i className="bi bi-trash text-danger"></i></label></div>
                                        </div>
                                    </div>
                                    <hr />
                                </form>
                            ))}

                            <div className='d-flex w-100 justify-content-between mt-4 align-items-center'>
                                <div className='fs-6'>
                                    <span className="text-btn-bg cursor-pointer" onClick={AddMoreMember}> +Add More Member</span>
                                </div>
                                <div>
                                    <button type="button" className='text-white bg-btn-bg btn' onClick={onSubmit}
                                       disabled={loading}
                                    >
                                        {!loading ? "Submit" :
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InviteMember;