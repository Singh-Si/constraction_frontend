import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { validationSchema } from "@/schemas/createOrgSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createOrgAsync } from "@/store/createorgslice/CreateOrgSlice";
import config from "@/config/config";
import Link from "next/link";
import nookies, { parseCookies, setCookie } from "nookies";
import axios from "axios";
import { getOrganizationAsync } from "@/store/organisation/fetchOrganisation";

const CreateOrganization = ({ organizations }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
  };

  const onSubmit = async (values) => {
    const { name, phone, email } = values;
    const response = await dispatch(createOrgAsync({ name, phone, email }));

    const userData = response?.payload;
    if (userData?.success) {
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
      router.push("/");
    } else {
      toast.error(response?.payload?.error, { position: "top-center" });
    }
  };

  return (
    <div className=" d-flex flex-column justify-content-center">
      <Row className="text-end">
        <Col lg="11" className="m-auto">
          <div className="logo text-start">
            <img src="/assets/images/logo.png" alt="accoung image" />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="5" className="mt-5">
          <h1 className="text-blue text-start"> Create Organization</h1>
          <div className=" mt-2 ml-5 d-flex">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                values: { name, phone, email },
                setFieldValue,
                errors,
                handleBlur,
                handleChange,
                dirty,
                isValid,
                resetForm,
                isSubmitting,
              }) => {
                return (
                  <Form className="form d-flex flex-column gap-2">
                    <div className="form-group mt-4">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1 ">
                          Enter Organization
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="name"
                        className="form-control bg-white border-none"
                        placeholder="Organization Name"
                        onBlur={handleBlur}
                      // onChange={handleChange}
                      // value={accountName}
                      />

                      <ErrorMessage
                        name="name"
                        render={(msg) => (
                          <small style={{ color: "red", fontSize: "12px" }}>{msg}</small>
                        )}
                      />
                    </div>

                    <div className="form-group">
                      <div className='text-start w-100 mb-2'><label htmlFor="exampleInputPassword1">Enter Contact No.</label><span className="text-danger">*</span></div>
                      <Field
                        type="text"
                        name='phone'
                        className="form-control form-control-bg-color"
                        placeholder="Organization Contact"
                        onChange={(e) => {
                          let phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                          phoneNumber = phoneNumber.slice(0, 10);
                          setFieldValue('phone', phoneNumber); // Set the modified value
                        }}
                      // value={values.phone}
                      />

                      <ErrorMessage
                        name="phone"
                        render={(msg) => (
                          <small style={{ color: "red", fontSize: "12px" }}>{msg}</small>
                        )}
                      />
                    </div>

                    <div className="form-group">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1">
                          Enter E-mail ID
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="email"
                        className="form-control bg-white border-none"
                        placeholder="Organization E-mail ID"
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // value={phone}
                      />

                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <small style={{ color: "red", fontSize: "12px" }}>{msg}</small>
                        )}
                      />
                    </div>

                    <div className="text-start w-100 mt-4">
                      <button
                        type="submit"
                        className="text-white m-auto w-100 bg-btn-bg auth_btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            ></span>
                            <span role="status">Loading...</span>
                          </>
                        ) : (
                          "Create"
                        )}
                      </button>
                      <br />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Col>
        <Col lg="6" className="d-flex gap-2 flex-column">
          <img
            src="/assets/images/create_org_logo.svg"
            alt="create_org_logo"
            //  className="w-75"
            style={{ height: "90%", width: "87%" }}
          />
          <div className="text-end ">
            {/* <Link href="/user/create-site" className="bg-secondary bg-gradient rounded p-2 text-white text-decoration-none">Do it Later</Link> */}
          </div>
        </Col>
      </Row>
      {organizations !== null ? (
        <div className="row d-flex justify-content-end">
          <div className="col-2">
            <button

              className="text-white m-auto w-100 bg-btn-bg rounded p-2"
              aria-hidden="true"
            >
              <Link href="/" className="text-white text-decoration-none ">Skip</Link>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateOrganization;

export async function getServerSideProps(context) {
  const { token, currentOrganizationId } = nookies.get(context);
  let organizations = currentOrganizationId;



  try {
    const response = await axios.get(`${config.API_URL}/organization/switch`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    organizations = response.data.organizations;
  } catch (error) {
    console.error("Error fetching organization data:", error);
  }
  if (organizations?.length > 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      organizations: organizations || null,
    },
  };
}