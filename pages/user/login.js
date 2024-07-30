import { Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setEmail, fetchDataAsync } from "@/store/loginslice/LoginSlice";
import nookies, { setCookie } from 'nookies'
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email, status } = useSelector((state) => state?.auth);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value.replace(/[^0-9]/g, "")));
  };

  const phoneRegex = /^[0-9]{10}$/;

  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(email)) {
      toast.error("Please Enter 10 Digit Valid Phone Number.", {
        position: "top-center",
      });
      return;
    }
    if (!phoneRegex.test(email)) {
      toast.error("Please Enter Valid Phone Number.", {
        position: "top-center",
      });
      return;
    }
    if (!email) {
      toast.error("Please Fill Phone Number.", { position: "top-center" });
      return;
    }

    try {
      const data = await dispatch(fetchDataAsync(email));
      const loginData = data.payload;
      if (loginData?.success) {
        nookies.set(null, "email", email, { path: "/" });
        nookies.set(null, "isValid", loginData?.success, { path: "/" });

        router.push(`/user/verify-otp`);
      } else {
        toast.error(loginData?.error, { position: "top-center" });
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setEmail(""));
    }
  };

  return (
    <div className="p-2 mt-2 d-flex flex-column justify-content-center   bg-background-color">
      <Row className="text-end">
        <Col lg="11" className="m-auto">
          <div className="logo text-start">
            <img src="/assets/images/logo.png" alt="logo" />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg="5" className=" mt-5 ml-5">
          <h1 className="text-blue text-start">Welcome</h1>
          <div className=" mt-4 ml-5 d-flex ">
            <form
              className="form d-flex flex-column gap-5"
              onSubmit={handleGetOtp}
            >
              <div className="form-group mt-4">
                <div className="text-start w-100 mb-2">
                  <label htmlFor="exampleInputPassword1">
                    Enter Mobile No.
                  </label>
                  <span className="text-danger">*</span>
                </div>
                <div className="d-flex gap-2">
                  <span className="rounded-3 bg-white border-blue border-none p-2 text-center">
                    +91
                  </span>
                  <input
                    type="text"
                    className="form-control bg-white border-none"
                    placeholder="Enter Mobile Number"
                    onChange={handleEmailChange}
                    value={email}
                    maxLength={10}
                  />
                </div>

                <div className="">
                  <label
                    id="phone-desc"
                    className="phone-desc form-text text-muted "
                  >
                    We will send an OTP for verification.
                  </label>
                </div>
              </div>
              <div>
                <div className="text-start w-100 mt-2">
                  <button
                    type="submit"
                    className="text-white m-auto w-100 bg-btn-bg auth_btn"
                    disabled={status === "loading"}
                  >
                    {/* {status === "loading" ? "Loading..." :null}
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> */}

                    {status && status === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                        <span className="ms-2" role="status">
                          Loading...
                        </span>
                      </>
                    ) : (
                      "GET OTP"
                    )}
                  </button>
                  {/* </Link> */}
                  <br />
                </div>

                <div className="text-start mt-4">
                  <button className="text-white m-auto w-100 bg-btn-bg auth_btn">
                    <i className="ti ti-qrcode me-1"></i>
                    LOG IN WITH YOUR APP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Col>
        <Col lg="6" className="d-flex gap-5 flex-column">
          <img
            src="/assets/images/login-img.png"
            className=""
            style={{ width: "85%" }}
            alt="login_img"
          />
          <div className="text-end ">
            {/* <Link to="/user/createSite" className="bg-secondary bg-gradient rounded p-2 text-white text-decoration-none">Do it Later</Link> */}
          </div>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col lg="12" className="text-center m-auto ">
          <span className="text-start  copyright">
            By signing up, I agree to the Solis Reality
            <a href="#" className="text-info">
              Terms of Services
            </a>{" "}
            & acknowledge the
            <a href="#" className="text-info">
              Privacy Policy
            </a>
            .
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  const isValid = cookies?.isValid || false;
  const token = cookies?.token;

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
    }
  }

  return {
    props: {}
  }
}
