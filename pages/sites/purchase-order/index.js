import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BackIcon from '@/components/utils/global/BackIcon';
import axios from 'axios';
import nookies, { parseCookies } from "nookies";

const PurchaseOrder = ({ user, purchaseOrderSettings }) => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const [nextSerialNumber, setNextSerialNumber] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');

    useEffect(() => {
        // Listen for changes in state variables and update the UI immediately
        setNextSerialNumber(nextSerialNumber);
        setGstNumber(gstNumber);
        setTermsAndConditions(termsAndConditions);
    }, [nextSerialNumber, gstNumber, termsAndConditions]);

    const handleSubmit = async () => {
        const data = {
            prefix: nextSerialNumber,
            gst: gstNumber,
            tnc: termsAndConditions
        };
        if (data.status === 200) {
            // Close the modal
            handleCloseModal();
        }
        try {
            const { token, currentOrganizationId, siteId } = parseCookies();
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase-order/setting/update?${currentOrganizationId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                params: {
                    organization: currentOrganizationId,
                    site: siteId,
                }

            });

            handleCloseModal();
        } catch (error) {
            if (error.response) {
                console.error('Error updating purchase order:', error.response.data);
            } else if (error.request) {

                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };



    return (
        <>
            <div className="row">
                <div className="col-12 mb-3 bg-light-info text-blue fw-bolder p-2">
                    <BackIcon />
                    <span>Purchase order</span>
                </div>
            </div>

            <div className='row d-flex justify-content-between'>
                <div className='p-2 bg-gray fw-bold d-flex w-100 justify-content-between'>
                    <span>Organization Address & GSTIN</span>
                    <div className='col-2 mt-3'>
                        <button className='px-3 edit_btn' id="#inviteMemberModal" onClick={handleShowModal}>Edit</button>
                    </div>
                </div>
                {purchaseOrderSettings && (
                    <div className='row d-flex justify-content-between'>
                        <div className='col-4 mt-3'>
                            <div>
                                <small className='fw-bold text-black'> Purchase Order Number</small>
                            </div>
                            <div>
                                <small className='fw-bold text-dark-gray'>(Auto Generated PO Number)</small>
                            </div>
                        </div>
                    </div>
                )}
                <div className='row'>
                    <div className='col-2 mt-3'>
                        <div>
                            <small className='fw-bold'>PreFix</small>
                            <input
                                className='form-control'
                                placeholder='PO-2024-25'

                            />
                        </div>
                    </div>
                    <div className='col-2 mt-3'>
                        <div>
                            <small className='fw-bold'>Next Serial Number</small>
                            <input className='form-control p-2' readOnly value={purchaseOrderSettings?.prefix} />
                        </div>
                    </div>
                    <div className='col-2 mt-3 d-flex align-items-end'>
                        <div>
                            <small className='fw-bold text-dark-gray'>Eg: PO-2023-2024--000012</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-5'>
                <div className='p-2 bg-gray fw-bold'>
                    <span>Organization Address & GSTIN</span>
                </div>
                <div className='col-4 mt-3'>
                    <div>
                        <small className='fw-bold'> Address Details</small>
                    </div>
                    <div>
                        <small className='fw-bold'>2B, SHANKER MARKET, CONNAUGHT PLACE, Central Delhi, Delhi, 110001</small>

                    </div>
                </div>

                <div className='row'>
                    <div className='col-4 mt-3'>
                        <div>
                            <small className='fw-bold'>GST IN</small>
                            <input className='form-control p-2' readOnly value={purchaseOrderSettings?.gst} />
                        </div>
                        <div>
                            <small className='fw-bold text-dark-gray'>Eg: 000000000000000</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-5'>
                <div className='p-2 bg-gray fw-bold'>
                    <span>Terms & Conditions</span>
                </div>
                <div className='col-4 mt-3'>
                    <div>
                        <small className='fw-bold'>Enter terms and conditions</small>
                    </div>
                    <div>
                        <input className='form-control p-2' readOnly value={purchaseOrderSettings?.tnc} />
                    </div>
                </div>
            </div>



            <div className="modal fade bd-example-modal-xl" tabIndex="-1" id="inviteMemberModal" role="dialog" aria-labelledby="inviteMemberModal" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg w-100 h-auto" role="document">
                    <div className="modal-content w-100 h-auto">
                        <div className="modal-header w-100 h-auto">
                            <h5 className="modal-title h4" id="myExtraLargeModalLabel">Assign Members</h5>
                            <button type="button" id="close_invite_modal" className="btn-close me-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal show={showModal} onHide={handleCloseModal} className="modal1" style={{width:"100%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Purchase Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="nextSerialNumber">
                            <Form.Label>Next Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter next serial number"
                                value={nextSerialNumber}
                                onChange={(e) => setNextSerialNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="gstNumber">
                            <Form.Label>GST Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter GST number"
                                value={gstNumber}
                                onChange={(e) => setGstNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="termsAndConditions">
                            <Form.Label>Terms & Conditions</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter terms and conditions"
                                value={termsAndConditions}
                                onChange={(e) => setTermsAndConditions(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button type="submit" onClick={() => handleSubmit(nextSerialNumber, gstNumber, termsAndConditions)}>
                        Save Changes
                    </Button>

                </Modal.Footer>
            </Modal> */}

        </>
    );
};

export default PurchaseOrder;

export async function getServerSideProps(context) {
    try {
        const { token, currentOrganizationId, siteId } = nookies.get(context);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase-order/settings`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                organization: currentOrganizationId,
                site: siteId,
            },
        });
        // Extract data from the response
        const purchaseOrderSettings = response?.data?.purchaseOrderSettings;

        // Fetch user data (replace this with your actual user fetching logic)
        const userData = {}; // Fetch user data here

        // Return props object with data fetched from the server
        return {
            props: {
                user: userData,
                purchaseOrderSettings: purchaseOrderSettings || null,
            },
        };
    } catch (error) {
        console.error('Error fetching site settings:', error.message);
        return {
            props: {
                user: null,
                purchaseOrderSettings: null, // or provide appropriate fallback data
            },
        };
    }
}
