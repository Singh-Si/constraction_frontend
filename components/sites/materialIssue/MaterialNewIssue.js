import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaChevronDown, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { getSiteAsync } from "@/store/createSite/GetSites";
import { getAllmember } from "@/store/member/allmember";
import { fetchMaterialBomAsync } from "@/store/material/Bom";
import axios from "axios";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import config from "@/config/config";
import { parseCookies } from "nookies";
import Select from 'react-select';
import { useFormikContext } from 'formik';
import { useRouter } from "next/router";

const MaterialNewIssue = () => {
  const dispatch = useDispatch();
  const route = useRouter()
  const [siteDetails, setSiteDetails] = useState([]);
  const [members, setMembers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [count , setCount] = useState(1)
  const [testing , setTesting] = useState()
  const [task , setTask] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hello , setHello] = useState()
  const [fileUploded , setFileUpload] = useState(null)
  const [loading , setLoading] = useState(false)
  const [name , setName] = useState([])
  const [formData, setFormData] = useState({
    issued_name: 'Sub Contractor',
    sub_category: '',
    materials: [],
    issuedTo: '',
    checkedBy: '',
    remarks: '',
    task: [],
    imageUpload: null
  });
  const { token, currentOrganizationId } = parseCookies();
  const memberTask = [{user  : 'Aditya' } , {user  : 'Aditya' }]

  const siteData = useSelector((state) => state.getSiteAsync);
  const member = useSelector((state) => state.getAllmember);
  const handleTaskChangeSubmit = (e)=>{
    console.log(e)
  }

  const options = task?.data?.map(e => ({
    value: e.taskName,
    label: e.taskName
  }));


  const handleTaskChange = selected => {
    setSelectedOptions(selected || []); 
  };


// fetching categories 

useEffect(()=>{
  const getCategories = async()=>{
  const response =   await axios.get(`https://construction-backend.onrender.com/materialIssuedCategory/get?organization=${currentOrganizationId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
  // console.log("RESPONSE COMES IN THE NAME : " ,  response?.data?.data)
  setName(response?.data?.name)
  console.log(response?.data.data[0].name)
  }
 
 getCategories()
},[])


// handleCreateSubmit 

  const handleCreateSubmit = async () => {
    setLoading(true)
    if (
      formData?.issued_name &&
      // formData?.sub_category &&
      // formData?.materials &&
      formData?.issuedTo &&
      formData?.checkedBy &&
      formData?.remarks 
      // formData?.task &&
      // formData?.imageUpload
    ) {
      let data = JSON.stringify({

        "materialIssueTo": 'Sub Contractor' , 

        "checkedBy": formData?.checkedBy,
        "issueTo" : formData?.issuedTo , 
        "materialIssueTo": formData?.issued_name,
        "material": formData?.materials,
        "task": formData?.task,
        "remark": formData?.remarks,
      });
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://construction-backend.onrender.com/meterialRransfer/add?organization=${currentOrganizationId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: data
      };
  
      try {
        const materialIssue = await axios.request(config);
        console.log(materialIssue)
        const id = materialIssue?.data?.data?._id; 
        console.log(id)
  
        if (id && formData.imageUpload) {
          let formDataFile = new FormData();

          formDataFile.append('attachment', formData?.imageUpload); 
          setHello(formDataFile)
          let uploadConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://construction-backend.onrender.com/meterialRransfer/addFile?organization=${currentOrganizationId}&id=${id}`,
            headers: {
              'Authorization': `Bearer ${token}` , 
               'Content-Type': 'multipart/form-data'
            },
            data: formDataFile
          };
  
          const imageUpload = await axios.request(uploadConfig);
          const imageResponse = imageUpload?.data?.success; 
          console.log(imageResponse)
  
          if (imageResponse) {
            toast.success('THE ISSUE HAS BEEN SUCCESSFULLY RAISED' , {
              position : "top-center"
            })
          }
          setLoading(false)
          route.push('/stock/material-new-issue')
        
        }
  
      } catch (err) {
        console.log('There was an error making the request', err);
      }
    }
  };

  // Task fetching (ALL THE TASK WILL BE POPULATED IN THE COLUMN OF THE TABLE)
  // Setting the task below 

  useEffect(() => {
    const getTask = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization' : `Bearer ${token}`,
          },
        });
        setTask(response?.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const url = `https://construction-backend.onrender.com/task/getTaks?type=Current&organization=${currentOrganizationId}`;

    getTask(url);
  }, [currentOrganizationId, token]); 

  const handleAddAnotherMaterial = (setFieldValue, values) => {
    setFieldValue('materials', [
      ...values.materials,
      { materialName: '', transferQuantity: '' },
    ]);
    setCount((prevCount) => prevCount + 1);
  };


  // removing materials
  
  const removeMaterialEntry = (index) => {
    setFormData(prevData => ({
      ...prevData,
      materials: prevData.materials.filter((_, i) => i !== index)
    }));
    setCount(prevCount => prevCount - 1);
  };


  // creating Validation here 
  const validationSchema = Yup.object({
    issued_name: Yup.string().required('Material Issued To is required'),
    site: Yup.string().required('Site is required'),
    materials: Yup.array().of(
      Yup.object({
        materialName: Yup.string().required('Material Name is required'),
        transferQuantity: Yup.number().required('Transfer Quantity is required').positive('Must be positive')
      })
    ).min(1, 'At least one material is required'),
    issuedTo: Yup.string().required('Issued To is required'),
    checkedBy: Yup.string().required('Checked By is required'),
    remarks: Yup.string().required('Remarks is required')
  });

  const materialIssuedTo = [
    { name: 'Subcontractor' },
    { name: 'Other Site' }
  ];

  useEffect(() => {
    dispatch(getSiteAsync());
    dispatch(getAllmember());
  }, [dispatch]);

  useEffect(() => {
    if (siteData?.data?.sites) {
      setSiteDetails(siteData.data.sites);
    }
  }, [siteData]);

  useEffect(() => {
    if (member?.allMemberData?.members) {
      setMembers(member.allMemberData.members);
    }
  }, [member]);

  useEffect(() => {
    dispatch(fetchMaterialBomAsync());
  }, [dispatch]);

  useEffect(()=>{
    console.log("MATERIAL : " , formData?.materials , "NAME" , formData?.issued_name )
    
  })
  useEffect(()=>{
    console.log("DATA : " ,  formData?.materials , "TASK" , formData?.task , "Material" , formData?.materials , "FILE_IMAGE_UPLOAD" , formData?.imageUpload , hello , ) 
  })
  
  
// fetching the materials here 

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(`${config.API_URL}/materials`, {
          params: {
            organization: currentOrganizationId,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        if (response?.data?.success) {
          setMaterials(response?.data?.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.error);
      }
    }

    fetchMaterials();
  }, [currentOrganizationId, token]);



// handling the changes of the forms

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    console.log('Name:' , name , 'VALUE : ' ,value)

    setFormData(prevData => {
      const updatedMaterials = [...prevData.materials];
      if (name === `materialName-${index}`) {
        updatedMaterials[index] = { ...updatedMaterials[index], materialName: value };
      } else if (name === `transferQuantity-${index}`) {
        updatedMaterials[index] = { ...updatedMaterials[index], transferQuantity: value };
      }
      setTesting(updatedMaterials)
    
      return {
        ...prevData,
        [name] : value ,
        materials: updatedMaterials
      };
    });
  };


  // handling the file changes of the form

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imageUpload: file
    }));
  };


  return (
    <div>
      <div className="offcanvas offcanvas-end bg-white" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static" style={{ width: '35%' }}>
        <div className="offcanvas-body p-0">
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleCreateSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="d-flex flex-column">
                <div className="offcanvas-header bg-light-blue mb-0">
                  <span className="offcanvas-title fw-bold text-blue" id="offcanvasRightLabel">
                    Material Issued
                  </span>
                  <button
                    type="button"
                    className="btn-close me-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="d-flex gap-3 flex-column p-3">
                  <div className="row">
                    <div className="form-group col-6 text-start">
                      <label htmlFor="issued_name">
                        Material Issued To<span className="text-danger">*</span>
                      </label>
                      <Field
  as="select"
  name="issued_name"
  id="issued_name"
  className="form-select border-info position-relative"
  onChange={(e) => {
    const { value } = e.target;
    setFieldValue('issued_name', value);
  }}
>
      {name &&  name?.data?.map((issued)=>{
         <option key={issued.name} value={issued.name}>HI</option>
      })}

</Field>
<ErrorMessage
  name="issued_name"
  render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
/>
                    </div>
                    {/* {formData?.issued_name ==="Subcontractor" ?  <div className="form-group col-6 text-start">
                      <label htmlFor="sub_category">
                        SUB-CATEGORY<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="sub_category"
                        id="sub_category"
                        className="form-select border-info position-relative"
                        onChange={handleChange}
                      >
                      </Field>
                      <ErrorMessage
                        name="sub_category"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />

                    </div> : null} */}
                  </div>

                  <div>
  {Array.from({ length: count }, (_, index) => (
    <div key={index}>
      <div className="form-group col-12 text-start" style={{ marginLeft: '-0.4rem' }}>
        <label htmlFor={`materialName-${index}`}>
          Material Name : (Available Quantity)<span className="text-danger">*</span>
        </label>
        <Field
          as="select"
          name={`materialName-${index}`}
          className="form-select border-info position-relative"
          onChange={(e) => {
            setFieldValue(`materialName-${index}`, e.target.value);
            // handleChange(e);
          }}
        >
          <option value="">Select Material</option>
          {materials?.map((issued) => (
            <option key={issued._id} value={issued?.brandName}>
              {`${issued?.brandName} : ${issued?.inStocks}`}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name={`materialName-${index}`}
          render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
        />
      </div>
      <div className="form-group col-12 text-start" style={{ marginLeft: '-0.4rem' }}>
        <label htmlFor={`transferQuantity-${index}`}>
          Transfer Quantity<span className="text-danger">*</span>
        </label>
        <Field
          name={`transferQuantity-${index}`}
          type="number"
          className="form-control border-info position-relative"
          onChange={(e) => {
            setFieldValue(`transferQuantity-${index}`, e.target.value);
            // handleChange(e);
          }}
        />
        <ErrorMessage
          name={`transferQuantity-${index}`}
          render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
        />
      </div>
      {count >1 ? <button
                        type="button"
                        onClick={() => removeMaterialEntry(index)}
                        className="btn btn-danger btn-sm mt-2"
                      >
                        <FaTrashAlt /> Remove
                      </button> : null}
      
    </div>
  ))}
</div>

                      
                  {formData?.issued_name === "Sub Contractor" && (
  <div>
    <button 
     onClick={() => handleAddAnotherMaterial(setFieldValue, values)}
     style={{ color: 'rgba(64, 87, 104, 1)', background: 'none', fontSize: "0.8rem", textAlign: 'left' }}
   >
      +ADD ANOTHER MATERIAL
    </button>

    <div className="form-group col-12 text-start" style={{marginLeft : "-0.4rem"}}>
      <label htmlFor="checkedBy">
        TASK<span className="text-danger">*</span>
      </label>
        {/* <option value="">Select Task <FaChevronDown /></option> */}
   
        <Select
        isMulti
        isSearchable={true}
        // onChange={handleTaskChangeSubmit(options)}
  options={options}
  placeholder="Select Task"
/>
      <ErrorMessage
        name="task"
        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}

      />
    </div>
  </div>
)}
                  <div className="row">
                    <div className="form-group col-5 text-start" style={{marginLeft : "0.1rem"}}>
                      <label htmlFor="issuedTo">
                        Issued To<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="issuedTo"
                        className="form-select border-info"
                        onChange={(e) => {
                          setFieldValue('issuedTo', e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Member <FaChevronDown /></option>
                        {members.map((mem) => (
                          <option key={mem._id} value={mem._id}>
                            {mem.user.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="issuedTo"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />
                    </div>
                    <div className="form-group col-6 text-start">
                      <label htmlFor="checkedBy">
                        Checked By<span className="text-danger">*</span>
                      </label>
                      <Field
                        as="select"
                        name="checkedBy"
                        className="form-select border-info position-relative"
                        onChange={(e) => {
                          setFieldValue('checkedBy', e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Member <FaChevronDown /></option>
                        {members.map((mem) => (
                          <option key={mem._id} value={mem._id}>
                            {mem.user.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="checkedBy"
                        render={(msg) => <small style={{ color: "red" }}>{msg}</small>}
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 text-start" style={{ marginLeft: "-0.4rem" }}>
  <label htmlFor="remarks">Remarks</label>
  <Field
    name="remarks"
    type="text"
    className="form-control border-info position-relative"
    onChange={(e) => {
      setFieldValue('remarks', e.target.value);
      handleChange(e);
    }}
  />
  <ErrorMessage
    name="remarks"
    component="small"
    className="text-danger"
  />
</div>
                  <div className="form-group text-start">
                    <label htmlFor="imageUpload">
                      Image Upload
                    </label>
                    <input
                       type="file"
                       accept="image/*"
                      id="imageUpload"
                      name="imageUpload"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="text-start p-3 mt-1">
                    <button
                        onClick={handleCreateSubmit}
                      type="submit"
                      className="text-white m-auto w-100 auth_btn"
                      style={{ backgroundColor: 'rgba(32, 117, 169, 1)' }}
                      disabled={isSubmitting}
                    >
                        {loading ? 'Submitting...' : 'Create'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MaterialNewIssue;