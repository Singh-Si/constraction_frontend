import SearchInput from '@/components/utils/SearchInput';
import Upcoming from '../../pages/sites/upcomingtask/Upcoming';
import CurrentTask from '../../pages/sites/currenttask/CurrentTask';
import CompletedTask from '../../pages/sites/completedtask/completed-task';
import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';

const SiteInfo = () => {
    const [imagePublicId, setImagePublicId] = useState("");
    const onDrop = (acceptedFiles) => {
        // Handle the uploaded files here
        setImagePublicId(acceptedFiles[0])
    };

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: 'image/*', // Accept only image files
    // });

    return (
        <div className='mb-3 w-25 rounded w-100'>
            <h5 className='row  d-flex align-items-center ps-3 mb-4' style={{ height: 51 }}>Site-001(14,Ardhana Enclave)</h5>

            <div className='row'>
                <div className='col-xl-6'>
                    <SearchInput />
                </div>
                <div className='col-lg-6  d-flex justify-content-end align-items-center'>
                    <button className='btn bg-info text-white new-site-btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Create Task</button>
                </div>

                <div className="offcanvas offcanvas-end w-25 p-0" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Add  Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="exampleInputEmail1" className="form-label">Task Name/ No</label>
                                <input type="text" className="form-control" placeholder='Enter Site Name' />
                                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="exampleInputPassword1" className="form-label">Work Category</label>
                                <input type="text" className="form-control  " id="exampleInputPassword1" />
                            </div>


                            <div className="form-group mb-4 ">
                                <div className=' text-bold d-flex align-items-center gap-3'>
                                    <label htmlFor="exampleInputPassword1 ">Start Date</label>
                                    <input type="date" className="date-input w-50 p-3" placeholder="" />
                                </div>
                            </div>

                            <div className='form-group mb-4 '>
                                <div className=' text-bold d-flex align-items-center gap-4'>
                                    <label htmlFor="exampleInputPassword1 ">End Date</label>
                                    <input type="date" className="date-input w-50 p-3" />
                                </div>
                            </div>

                            <div className='form-group mb-4 '>
                                <div className=' text-bold d-flex align-items-center gap-5'>
                                    <label htmlFor="exampleInputPassword1 ">Assign</label>
                                    <input type="date" className="date-input w-50 p-3" />
                                </div>
                            </div>

                            {/* <div>
                                <button type="button" id="leftbutton" onClick={openWidget}>
                                    Upload Image
                                </button>
                            </div> */}

                            <div className='row d-flex align-items-center'>
                                {/* <div className='col-6 d-flex flex-column align-items-center' {...getRootProps()}>
                                    <img className='text-center' src="/assets/icons/add_image.svg" alt="dfd" width={30} height={30} />
                                    <input {...getInputProps()} />
                                    <p>Add Photo (Optional)</p>
                                </div> */}

                                <div className='col-6 d-flex flex-column align-items-center'>

                                    <img className='text-center' src="/assets/images/AddPhotos.png" alt="dfd" height={60} />
                                    <p>Add Photo</p>

                                </div>
                                <div className='col-6'>

                                    <img className='text-center' src="/assets/images/AddNotes.png" alt="dfd" />
                                    <p>Add Notes</p>

                                </div>
                            </div>

                            <div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-info w-75">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Upcoming Task</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Current Task</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Completed Task</button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"><Upcoming /></div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"><CurrentTask /></div>
                <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0"><CompletedTask /></div>
            </div>
        </div>
    );
}

export default SiteInfo;