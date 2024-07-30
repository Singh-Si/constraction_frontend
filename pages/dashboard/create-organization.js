import { Col, Row } from "reactstrap";
import Link from "next/link";

const CreateOrganization = () => {
  
  return (
    <div className="p-4 d-flex flex-column justify-content-center gap-2 vh-100">
      <Row className="text-end">
        <Col lg="11" className="m-auto" >
          <div className='logo text-start'>
            <img src="/assets/images/logo.png" />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col lg="5" className=' mt-4 ml-5'>
          <h2 className='text-blue text-start'>Create Organisation</h2>
          <div className=' mt-4 ml-5 h-100 d-flex '>
            <form className="form d-flex flex-column gap-5" >
              <div className="form-group mt-4">
                <div className='text-start w-100 mb-2'><label for="exampleInputPassword1 ">Organisation Name</label></div>
                <input type="text" className="form-control form-control-bg-color" placeholder="Enter Organisation Name" />
              </div>
              {/* <div className="form-group mt-4">
                  <div className='text-start w-100'><label for="exampleInputPassword1 ">Client Name</label></div>
                  <input type="text" className="form-control " id="exampleInputPassword1" placeholder="Enter Client Name" />
                </div>
                <div className="form-group mt-4">
                  <div className="d-flex gap-2  ">
                    <div className='text-start text-bold'><label for="exampleInputPassword1 ">Start Date</label><br/>
                    <input type="date" className="date-input" placeholder=""/>
                    </div>
                    <div className='text-start '><label for="exampleInputPassword1 ">End Date</label><br/>
                    <input type="date" className="date-input" />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-4 ">
                  <div className="text-end cursor-pointer"><span className="add-team text-end"><img src={addteam}/> ADD TEAM</span></div>
                </div>
                <div className="form-group mt-4">
                  <input type="text" className="form-control " placeholder="Team Member Numbers" disabled />
                  <div className='text-end w-100 '><small ><img src={sync}/> Sync</small></div>
                </div> */}
              <div className="text-start w-100 mt-5">
                <Link href="/user/create-site">
                  <button className="text-white m-auto w-100 bg-btn-bg auth_btn">CREATE</button>
                  <br />
                </Link>
              </div>
            </form>
          </div>
        </Col>

        <Col lg="6" className="d-flex gap-5 flex-column">
          <img src="/assets/images/addproject.png" className="w-75" />
          <div className="text-end ">
            {/* <Link href="/user/create-site" className="bg-secondary bg-gradient rounded p-2 text-white text-decoration-none">Do it Later</Link> */}
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg="11" className="text-end">
          <Link href="/user/create-site" className="  p-2 text-white text-decoration-none doitLater">Do it Later</Link>
        </Col>
      </Row>
    </div>
  );
};

export default CreateOrganization;




