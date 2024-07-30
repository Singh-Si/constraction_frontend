import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDataAsync } from "@/store/loginslice/LoginSlice";
import { fetchDataAsyncOtp } from "@/store/VerifyOtpSlice";
import Link from "next/link";
import { getOrganizationAsync } from "@/store/organisation/fetchOrganisation";

const VerifyOtp = () => {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [status, setStatus] = useState(false);
    const [counter, setCounter] = useState(30);
    const [resendBtn, setResendBtn] = useState(false);
    const [expiryCounter, setExpiryCounter] = useState(15 * 60); // 15 minutes in seconds

    const dispatch = useDispatch();
    const router = useRouter();
    const { email } = parseCookies();

    const handleInputChange = (index, value) => {
        if (/^[0-9]*$/.test(value) || value === '') {
            const newOtpValues = [...otpValues];

            if (value === '' && index > 0) {
                newOtpValues[index] = ''; // Clear the previous input
                document.getElementById(`otp-input-${index - 1}`).focus();
            } else {
                newOtpValues[index] = value;
            }

            if (value !== '' && index < otpValues.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }

            setOtpValues(newOtpValues);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text');
        const pastedValues = pastedData.split('').slice(0, 6);

        const newOtpValues = Array.from({ length: 6 }, (_, index) => {
            // Use the pasted value if available, otherwise, set it to an empty string
            return pastedValues[index] || '';
        });

        setOtpValues(newOtpValues);
    };

    const handleResendOtp = async () => {
        try {
            // Reset the timer
            setCounter(30);
            setResendBtn(false); // Disable the Resend button
            setExpiryCounter(15 * 60);
            const data = await dispatch(fetchDataAsync(email));
            toast.success("OTP sent successfully", { position: "top-center" });
            setOtpValues(['', '', '', '', '', '']);
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.", { position: "top-center" });
        }
    };

    const onSubmit = async () => {
        if (otpValues.some(value => value === '')) {
            toast.error("Please enter all OTP digits", { position: "top-center" });
            return;
        }

        try {
            setStatus(true)
            const data = await dispatch(fetchDataAsyncOtp({ email, otpValues }));

            if (data?.payload?.success) {
                const token = data?.payload?.token;

                // Store token in cookie with a 24-hour expiration
                setCookie(null, 'token', token, {
                    maxAge: 24 * 60 * 60,
                    path: '/',
                });

                const fetch = await dispatch(getOrganizationAsync());

                if (fetch?.payload?.organizations?.length > 0) {
                    const { currentOrganizationId } = parseCookies();
                    if (!currentOrganizationId || currentOrganizationId == undefined) {
                        setCookie(
                            null,
                            "currentOrganizationId",
                            fetch?.payload?.organizations[0]?._id,
                            {
                                maxAge: 24 * 60 * 60,
                                path: "/",
                            }
                        );
                    }
                }

                router.push({
                    pathname: `/user/settingup-account`,
                });
            } else {
                toast.error("Please Provide Correct OTP", { position: "top-center" });
            }
        } catch (error) {
            toast.error("An error occurred during OTP verification. Please try again.", { position: "top-center" });
        } finally {
            setStatus(false)
        }
    };

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter((prev) => {
                // Decrease the counter by 1
                const newCounter = prev - 1;

                // If the counter reaches 0, clear the interval and enable the 4button
                if (newCounter === 0) {
                    clearInterval(timer);
                    setResendBtn(true);
                }
                const formattedCounter = newCounter < 10 ? `0${newCounter}` : newCounter;

                return formattedCounter;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        const timer = expiryCounter > 0 && setInterval(() => {
            setExpiryCounter((prev) => {
                let newCounter = prev - 1;

                if (newCounter === 0) {
                    clearInterval(timer);
                    // setExpired(true);
                }

                return newCounter;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryCounter]);

    return (
        <div className="d-flex flex-column justify-content-center gap-2 ">
            <Row className="text-end">
                <Col lg="11" className="m-auto" >
                    <div className='logo text-start'>
                        <img src="/assets/images/logo.png" />
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col lg="5" className=' ml-5'>
                    <h1 className='text-blue text-start'>Verify OTP</h1>
                    <div className=' mt-4 h-100 d-flex '>
                        <Formik>
                            <Form className="form d-flex flex-column gap-5" >
                                <div className="form-group mt-5">
                                    <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1 ">Enter Verification Code </label><span className="text-danger">*</span></div>
                                    <div className="d-flex justify-content-between">
                                        {otpValues?.map((value, index) => (
                                            <input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                className="otp-input rounded text-center bg-white border-white"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                maxLength={1}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                onPaste={handlePaste}
                                                value={value}
                                                style={{
                                                    width: '46px',
                                                    height: '46px',
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <Row className="row mt-2">
                                        <Col className="col-12 text-end">
                                            {resendBtn ? <label
                                                onClick={handleResendOtp}
                                                className="cursor-pointer"
                                                suppressHydrationWarning={true}
                                            >
                                                Resend OTP
                                            </label> : <label className="text-primary"><label className="text-muted">Resend Otp in </label> 00:{counter}</label>}
                                        </Col>
                                    </Row>
                                </div>

                                <div className="text-start w-100 mt-2">
                                    {status ?
                                        <button className="btn btn-primary bg-btn-bg text-white m-auto w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            <span role="status">Loading...</span>
                                        </button>
                                        :

                                        <button type="button" onClick={onSubmit} className="bg-btn-bg text-white m-auto w-100 btn-bg auth_btn"
                                            disabled={status}
                                        > Verify OTP</button>
                                    }
                                    <br />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Col>

                <Col lg="6" className="d-flex gap-5 flex-column align-items-end ">
                    <img src="/assets/images/verify-otp-new.png" width={600} />
                    <div className="text-end ">
                        {/* <Link to="/user/createSite" className="bg-secondary bg-gradient rounded p-2 text-white text-decoration-none">Do it Later</Link> */}
                    </div>
                </Col>
            </Row>

            <Row style={{ marginTop: 30 }}>
                <Col lg="12" className="text-center m-auto">
                    <span className="text-start font-weight-bold copyright">
                        By signing up, I agree to the Solis Reality{' '}
                        <Link href="" className="text-info">Terms of Services</Link> & acknowledge the
                        <Link href="" className="text-info">Privacy Policy</Link>
                        .
                    </span>
                </Col>
            </Row>
        </div>
    );
};

export default VerifyOtp;

// export async function getServerSideProps(context) {
//     const { token, currentOrganizationId } = parseCookies(context)

//     if (token || currentOrganizationId) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: {}
//     };
// }