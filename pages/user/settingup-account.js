import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import { settingAccountAsync } from '@/store/settingupaccouontslice/SettingUpAccountSlice';
import { validationSchema } from '@/schemas/settingAccountSchema';
import { ErrorMessage, Field, Form, Formik } from "formik"

import Link from 'next/link';
import nookies from 'nookies'

const SetupAccount = (props) => {
    const { status } = useSelector((state) => state?.usersetupaccount);
    const dispatch = useDispatch();
    const router = useRouter();

    const initialValues = {
        name: "",
        email: "",
        companyName : "",

    }

    const onSubmit = async (values) => {
        try {
            const { name, companyName, email } = values;
            const response = await dispatch(settingAccountAsync({ name, companyName, email }));

            if (response?.payload?.success) {
                router.push("/user/create-organisation");
            } else {
                toast.error("Failed to set up the account. Please try again.", { position: "top-center" });
            }
        } catch (error) {
            toast.error("An error occurred during account setup. Please try again.", { position: "top-center" });
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center">
            <Row className="text-end">
                <Col lg="11" className="m-auto" >
                    <div className='logo text-start'>
                        <img src="/assets/images/logo.png" alt="accoung image" />
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col lg="5" className='mt-5'>
                    <h1 className='text-blue text-start'>Setting up your Account</h1>
                    <div className=' mt-2 ml-5 h-100 d-flex '>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            // validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {() => {
                                return <Form className="form d-flex flex-column gap-4" >
                                    <div className="form-group mt-4">
                                        <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1 ">Enter Name</label><span className="text-danger">*</span></div>
                                        <Field
                                            type="text"
                                            name='name'
                                            className="form-control bg-white border-none"
                                            placeholder="Enter Name"
                                        />

                                        <ErrorMessage
                                            name="name"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1">Company Name</label><span className="text-danger">*</span></div>
                                        <Field type="text" name="companyName" className="form-control bg-white border-none" placeholder="Enter Your Company Name"


                                        />

                                        <ErrorMessage
                                            name="companyName"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>
                                   

                                    <div className="form-group">
                                        <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1">Your Email Id</label><span className="text-danger">*</span></div>
                                        <Field type="text" name="email" className="form-control bg-white border-none" placeholder="Enter Your Email"


                                        />

                                        <ErrorMessage
                                            name="email"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div>

                                    {/* <div className="form-group">
                                        <div className='text-start w-100 mb-2'>
                                            <label htmlFor="exampleInputPassword1">Enter Phone Number</label><span className="text-danger">*</span></div>
                                        <Field type="text" name='phone' className="form-control bg-white border-none" placeholder="Enter Your Phone"
                                        />

                                        <ErrorMessage
                                            name="phone"
                                            render={(msg) => (
                                                <small style={{ color: "red" }}>{msg}</small>
                                            )}
                                        />
                                    </div> */}

                                    <div className="text-start w-100 mt-4">
                                        <button type='submit' className="text-white m-auto w-100 bg-btn-bg auth_btn"> {status === "loading" ? "Submitting..." : "Submit"}</button>
                                        <br />
                                    </div>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </Col>
                <Col lg="6" className="d-flex justify-content-center align-items-center  flex-column">
                    <img src="/assets/images/setting_account_logo.svg" alt='setting_account_logo' className="w-75" />
                    <div className="text-end ">
                    </div>
                </Col>
            </Row>

            <Row style={{ marginTop: 82 }}>
                <Col lg="12" className="text-center m-auto">
                    <span className="text-start font-weight-bold copyright">
                        By signing up, I agree to the Solis Reality{' '}
                        <Link href="#" className="text-info">Terms of Services</Link> & acknowledge the
                        <Link href="#" className="text-info">Privacy Policy</Link>
                        .
                    </span>
                </Col>

            </Row>
        </div>
    );
};

export default SetupAccount;

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies?.token;
    const { email } = nookies.get(context);
    const hasEmail = email ? true : false;

    let parsedData = '';

    try {
        const response = await axios.get(`https://construction-backend.onrender.com/profile/new`, { headers: { Authorization: `Bearer ${token}` } });

        parsedData = response;
    } catch {
        console.log("error");
    }

    if (!token) {
        return {
            redirect: {
                destination: '/user/login',
                permanent: false
            },
        };
    }
    else if (parsedData?.data?.isNew == false) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
        };
    } else {
        let roles = [];

        try {
            const fetchRolesData = await axios.get(`https://construction-backend.onrender.com/roles`, { headers: { Authorization: `Bearer ${token}` } });
            roles = fetchRolesData.data?.roles;
        } catch (error) {
            toast.error("Error fetching roles data:", error);
        }

        return {
            props: {
                hasEmail,
                email: email || null,
                roles: roles || [],

            }
        };
    }
}