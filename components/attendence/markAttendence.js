import React from "react";
const MarkAttendence = ({ item }) => {
  const [overtime, setOvertime] = useState("");
  const [overtimeHours, setOvertimeHours] = useState('');
  const [overtimeWage, setOvertimeWage] = useState('');
  const { useDispatch } = require('react-redux');
  const { fetchattendanceData } = require('../attendanceSlice');
  const dispatch = useDispatch(); // Initialize useDispatch hoo

console.log(item , "item")

  const handleAddOvertime = async () => {
    try {
      // Make API call to add overtime
      const response = await axios.patch('/attendance/mark', {
        item_id: item._id,
        overtimeHours,
        overtimeWage
      });

      // Dispatch action to fetch updated attendance data
      dispatch(fetchattendanceData(response.data));

      // Clear input fields and hide overtime section
      setOvertimeHours('');
      setOvertimeWage('');
      setOvertime(false);
    } catch (error) {
      console.error('Error adding overtime:', error);
    }
  };

  const handleRemoveOvertime = () => {
    // Clear input fields and hide overtime section
    setOvertimeHours('');
    setOvertimeWage('');
    setOvertime(false);
  };

 

  return (
    <div>
      <>
        <div className="row">
          <div className="col-8">
            <small className="fw-bold fs-5 text-btn-bg">{item.name}</small>
            <br />
            <small className="fw-bold text-blue">{item.role}</small>
          </div>
          <div className="col-4 text-end">
            <small className="fw-bold fs-5">
              <i className="bi bi-three-dots-vertical"></i>{" "}
            </small>

            <br />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-7 d-flex justify-content-evenly  ">
            <div className="row d-flex w-100">
              <div className="d-flex justify-content-between flex-wrap">
                <div className="col-2 ">
                  <button
                    className="bg-gray text-blue rounded-circle px-3  py-2 "
                    onClick={() => marklabourPayload(item._id, 1)}
                  >
                    P
                  </button>
                  {/* <button className='bg-success text-white rounded-circle px-3  py-2 '>P</button>  */}
                </div>
                <div className="col-2">
                  <button
                    className="bg-gray text-black rounded-circle px-3  py-2"
                    onClick={() => marklabourPayload(item._id, 0)}
                  >
                    A
                  </button>
                  {/* <button className="bg-danger text-white rounded-circle px-3  py-2">
                          A
                        </button> */}
                </div>
                <div className="col-3">
                  <button
                    className="bg-gray rounded px-2  py-2 rounded-pill"
                    onClick={() => marklabourPayload(item._id, 2)}
                  >
                    HD
                  </button>
                  {/* <button className="bg-warning rounded px-2  py-2 rounded-pill">
                          HD
                        </button> */}
                </div>
              </div>
              <div className="col-7 mt-3">
                <small className="fw-bold">Working Hour: </small>
                <h5 className="  fw-bold text-primary">{item.dailyHours}</h5>
              </div>
              {/* <div className="col-5 mt-3">
                        <small className="fw-bold">Working Hour: </small>
                      <h5 className="  fw-bold text-primary">{item.workingHour}</h5>
                      </div> */}
              <div></div>
            </div>
          </div>
          <div className="col-5 d-flex justify-content-start gap-3 flex-column">
            <div className="text-center">
              <small>To Pay</small>
              <br />
              <h6 className=" text-center text-primary">{item.payment}</h6>
            </div>
            <div>
              <span
                className="fw-bold text-primary cursor-pointer"
                onClick={() =>
                  setOvertime((prevOvertime) =>
                    prevOvertime.includes(item._id)
                      ? prevOvertime.filter((id) => id !== item._id)
                      : [...prevOvertime, item._id]
                  )
                }
              >
                + Add Overtime
              </span>
            </div>
          </div>
        </div>
        {overtime.includes(item._id) && (
          <div className="row-sm border-top shadow pb-3 rounded">
            <div className="row-sm mt-4 px-3">
              <h6>Add OverTime</h6>
            </div>
            <div className="row-sm d-flex justify-content-between px-3 mt-3">
              <div className="col-4">
                <small className="text">Over Time Hours</small>
                <input
                  type="number"
                  className="form-control"
                  placeholder="01"
                  value={overtimeHours}

                />
              </div>
              <div className="col-5">
                <small>Over Time wage/hr</small>
                <input
                  type="number"
                  className="form-control"
                  placeholder="100"
                  value={overtimeWage}

                />
              </div>
            </div>

            <div className="row-sm justify-content-between p-3 gap-3 d-flex">
              <div>
                {/* <small className="fw-bold">Overtime Payment: </small>
                        <h5 className="  fw-bold text-primary">
                          dfj
                        </h5> */}
              </div>

              <div className="mt-3">
                <button type="button" className="btn border btn-outline-danger" onClick={handleRemoveOvertime}
                >

                  Clear
                </button>
                <button
                  type="submit"
                  className="btn border btn-outline-primary"
                  onClick={handleAddOvertime}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MarkAttendence;
