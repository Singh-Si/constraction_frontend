import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { parseCookies } from "nookies";
import { validationSchema } from "@/schemas/taskSchema/EditStatusTimelineLine";

const EditStatusTimeLine = ({ taskresponse, fetchData, progress }) => {
  const [percent, setPercent] = useState(progress);
  const { token, currentOrganizationId, siteId, floorId } = parseCookies();
  const router = useRouter();

  const calculatedPercent = percent - progress;
  const remainingProgress = 100 - percent;

  const initialValues = {
    taskno: taskresponse.taskName || "",
    workdonescore: `${percent}%` || "",
    workleft: `${remainingProgress}%` || "",
  };

  const onSubmit = async (values) => {
    const data = {
      progress: calculatedPercent,
      workleft: values.workleft,
    };

    try {
      const res = await axios.post(
        `https://construction-backend.onrender.com/task/timeline/add?organization=${currentOrganizationId}&site=${siteId}&floor=${floorId}&task=${taskresponse?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data?.success) {
        toast.success("Task Status Updated", { position: "top-center" });
        document.getElementById("edittimelinestatus").click();
        router.push(router.asPath);
        fetchData();
      }
    } catch (error) {
      toast.error("Something Went Wrong", { position: "top-center" });
    }
  };

  const handleRangeChange = (event) => {
    const newProgress = parseInt(event.target.value);
    if (newProgress >= progress) {
      setPercent(newProgress);
    } else {
      setPercent(progress);
    }
  };

  useEffect(() => {
    setPercent(progress);
  }, [progress]);

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex="-1"
      id="editStatusBackdrop"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-body p-0">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            resetForm,
            handleChange,
            isSubmitting,
          }) => {
            return (
              <Form className="d-flex flex-column">
                <div className="offcanvas-header bg-light-blue mb-0">
                  <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Update Task Status Timeline
                  </h5>

                  <button
                    type="button"
                    id="edittimelinestatus"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={resetForm}
                  ></button>
                </div>

                <div className="d-flex gap-3 flex-column p-3 text-start">
                  <div className="form-group ">
                    <div className="text-start w-100 mb-2">
                      <label htmlFor="exampleInputPassword1">
                        Task Name
                      </label>
                      <span className="text-danger">*</span>
                    </div>
                    <Field
                      type="text"
                      name="taskno"
                      className="form-control border-info"
                      placeholder="Task Name"
                      disabled
                    />

                    <ErrorMessage
                      name="taskno"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>

                  {/* <div className="row bg-blue text-white p-2">
                    <div className="col-6">Word Score Measure</div>
                    <div className="col-6">100/100 %</div>
                  </div> */}

                  <div className="row">
                    <div className="form-group">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1">
                          Work Done Score
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="workdonescore"
                        className="form-control border-info"
                        placeholder="Today Work Score"
                        disabled
                      />

                      <ErrorMessage
                        name="name"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>

                    {/* <div className="form-group col-6">
                      <div className="text-start w-100 mb-2">
                        <label htmlFor="exampleInputPassword1">
                          Work Left
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <Field
                        type="text"
                        name="workleft"
                        className="form-control border-info"
                        placeholder="0.00"
                        onChange={(e) => handleChange(e.target.value)}
                        disabled
                      />

                      <ErrorMessage
                        name="name"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div> */}
                  </div>

                  <div className="row p-3">
                    Percent:
                    {percent}%
                    <input
                      id="range"
                      type="range"
                      // min={progress}
                      max="100"
                      value={percent}
                      onChange={(event) => handleRangeChange(event)}
                      required
                    />
                  </div>
                </div>

                <div className="text-start p-3 mt-5">
                  <button
                    type="submit"
                    className="text-white m-auto w-100 bg-btn-bg auth_btn"
                    disabled={isSubmitting || percent > 100}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="ms-2" role="status">
                          Loading...
                        </span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <br />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditStatusTimeLine;
