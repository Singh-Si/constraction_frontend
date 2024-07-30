import React from 'react'

const SelectMember = () => {
    return (
        <>

            <div className='row'>

                <div className='col-6'>
                    <div className='bg-light-salmon p-2'>
                        <span className='fw-bold'>Reminder message for Site Team</span><br />
                        <small className='fw-bold text-dark-gray'>Site Team will get reminder by Organisation Owner name.</small>
                    </div>
                    <select className=" form-control border-info mt-4" placeholder={`Select Member`}>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                    </select>

                </div>
            </div>

            <div className='row mt-4'>

                <div className='col-6'>
                    <div className='bg-yellow-green p-2 '>
                        <span className='fw-bold'>Select Site Team Members who want Auto DPR-Reminder</span><br />
                        <small className='fw-bold text-dark-gray'>The Selected Persons will be able to see the Automated DPR Daily.</small>
                    </div>
                    <select className=" form-control border-info mt-4" placeholder={`Select Member`}>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                    </select>

                </div>
            </div>

            <div className='row mt-4'>

                <div className='col-6'>
                    <div className='bg-light-info p-2'>
                        <span className='fw-bold'>Select Office Team members who want Auto DPR Updates</span><br />
                        <small className='fw-bold text-dark-gray'>Site Team will get reminder by Organisation Owner name.</small>
                    </div>
                    <select className=" form-control border-info mt-4" placeholder={`Select Member`}>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                        <option>Select Member</option>
                    </select>

                </div>
            </div>


            <div className='row text-end mt-2'>
                <div className='text-end'>
                    <button className='btn bg-btn-bg  text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Next</button>
                    </div>
            </div>
        </>
    )
}

export default SelectMember