import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'primereact/dropdown';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { parseCookies } from 'nookies';
import config from '@/config/config';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/router';
import { CreatePoSchema } from '@/schemas/materialSchema/CreatePoSchema';

const Indd = () => {
  const gstRateOptions = [
    { label: '0%', value: 0 },
    { label: '3%', value: 3 },
    { label: '5%', value: 5 },
    { label: '6%', value: 6 },
    { label: '12%', value: 12 },
    { label: '18%', value: 18 },
    { label: '28%', value: 28 },
  ];
  const discountOptions = [{ label: '₹', value: '₹' }, { label: '%', value: '%' }];

  const [discountType, setDiscountType] = useState('%'); // Initial Discount type
  const [gstType, setGstType] = useState('IGST'); // Initial value for GST type
  const gstOptions = [
    { label: 'IGST', value: 'IGST' },
    { label: 'CGST/SGST', value: 'CGST/SGST' },
  ];
  // let total = 0;
  const [isFormVisible, setIsFormVisible] = useState(true); // State to manage form visibility

  const [getvendorDetails, setVendorDetails] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [subTotalValues, setSubTotalValues] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
  const [materialData, setMaterialData] = useState([]);
  const router = useRouter();
  const { token, currentOrganizationId, siteId } = parseCookies();
  const handleClose = () => {
    setIsFormVisible(false);
    router.push(`/sites/material/indent?siteId=${siteId}`);
  };
  const initialValues = {
    poid: "",
    vendorId: "",
    expectedDelivery: "",
    deliveryAddress: "",
    poNumber: "",
    termsandcondition: "",
    remarks: "",
    billingDetails: addressDetails?.name,
    disCount: '',
    quantity: '',
    unitCost: "",
    gst: "",
    totalDiscount: ""



  }
  // Log the entire addressDetails object
console.log(addressDetails?.name, "addressDetails object");

// Check if addressDetails is defined
if (!addressDetails) {
    console.log("addressDetails is undefined or null");
} else {
    // Log the properties of addressDetails
    console.log("Properties of addressDetails:", Object.keys(addressDetails));

    // Check if address property exists
    if (addressDetails.address) {
        console.log(addressDetails.address, "addressDetails?.address");
    } else {
        console.log("addressDetails.address is undefined");
    }
}

// Provide a fallback value when logging address
console.log(addressDetails?.address || "Address not available", "addressDetails?.address");

  console.log(addressDetails?.address, "addressDetails?.address,addressDetails?.address,addressDetails?.address,addressDetails?.address,addressDetails?.address,")

  const onSelectVendor = (vendorId) => {
    const selectedVendor = getvendorDetails.find(vendor => vendor._id === vendorId);
    setSelectedVendorDetails(selectedVendor);
  };

  // useEffect(() => {
  //   const data = localStorage.getItem("signelData");
  //   setMaterialData(JSON.parse(data))
  // }, [])

  // fetchVendor
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getAllvendors`,
          {
            params: {
              organization: currentOrganizationId,

            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response?.data?.success) {
          setVendorDetails(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchVendor();
  }, [])

  // organization data fetch 
  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/organization/get?organization=${currentOrganizationId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response?.data && response?.data.organizationDetails) {
          const parsedData = response.data.organizationDetails;
          setAddressDetails(parsedData)
        } else {
          console.error('Invalid response data:', response);
        }
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    }

    fetchOrgData();
  }, [])

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(`${config.API_URL}/materials`,
          {
            params: {
              site: siteId,
              organization: currentOrganizationId,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response?.data?.success) {

          setMaterials(response?.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.error);
      }
    }

    fetchMaterials();
  }, [])

  // const materialPayload = materialData && materialData?.materialId?.map(item => ({
  //   itemDetails: item?._id, // Assuming this is the ID of the material/item
  //   quantity: item.quantity,
  // rate: item.material.unitCost,
  //   gst: parseFloat(item.material.gst.replace("%", "")), // Assuming GST is a string with percentage sign
  //   amount: (item.quantity * item.material.unitCost) + ((item.quantity * item.material.unitCost) * parseFloat(item.material.gst.replace("%", "")) / 100)
  // }));
  // console.log(materialPayload, "gstgggggggggggggggggg");


  useEffect(() => {
    const fetchSelectedIndents = async () => {
      try {
        // Retrieve the selected indent IDs from router query or localStorage
        const selectedIndentIds = router.query.selectedIndentIds
          ? JSON.parse(router.query.selectedIndentIds)
          : JSON.parse(localStorage.getItem('selectedIndentIds'));

        if (selectedIndentIds && selectedIndentIds.length > 0) {
          // Prepare the data to be sent in the body of the POST request
          let data = { indentId: selectedIndentIds };

          console.log("Data for API request:", data); // Debug: Log the API request data
          console.log("Davvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvsta for API request:", selectedIndentIds); // Debug: Log the API request data

          // Make a POST request with the indent IDs in the body
          const response = await axios.post(
            `${config.API_URL}/checkBoxSelectIndents`,
            data,
            {
              params: {
                site: siteId,
                organization: currentOrganizationId
              },
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          );

          console.log("API Response:", response); // Debug: Log the API response

          if (response?.data?.success) {
            const indents = response.data.data;
            const materials = indents.flatMap(indent =>
              indent.materialId.map(material => ({
                ...material,
                quantity: material.quantity
              }))
            );

            setMaterialData(materials);
            console.log("Materials:", materials); // Debug: Log the materials
            const { subTotalValues, totalAmount } = calculateSubTotal(materials);
            setSubTotalValues(subTotalValues);
            setTotalAmount(totalAmount);
            // const subtotals = materials.map(material => material.unitCost * material.quantity);
            // setSubTotalValues(subtotals);
            // setTotalAmount(subtotals.reduce((acc, curr) => acc + curr, 0));
          }
        }
      } catch (error) {
        console.error('Error fetching selected indents:', error);
      }
    };

    fetchSelectedIndents();
  }, [siteId, currentOrganizationId, token, router.query.selectedIndentIds]);


  const calculateSubTotal = (rowData) => {
    const subTotalValues = rowData.map((item) => {

      // Extract GST value and handle undefined or missing GST
      const gstString = item?.material?.gst ? item.material.gst : "0%";
      const percentageNumber = parseFloat(gstString.replace("%", ""));

      // Calculate the subtotal for the item
      const res = (item.quantity * item.rate) + ((item.quantity * item.rate) * percentageNumber) / 100;
      return res;
    });

    // Calculate the total amount by summing up all subtotals
    const totalAmount = parseFloat(subTotalValues.reduce((acc, curr) => acc + curr, 0).toFixed(1));

    return { subTotalValues, totalAmount };
  };
  const calculateTotalDiscount = (materialData) => {
    return materialData.reduce((totalDiscount, rowData) => {
      const rate = parseFloat(rowData?.rate || 0);
      const quantity = parseFloat(rowData?.quantity || 0);
      const discount = parseFloat(rowData?.discount || 0);

      let discountAmount = 0;
      if (discountType === '%') {
        discountAmount = (rate * quantity * discount) / 100;
      } else {
        discountAmount = discount;
      }

      return totalDiscount + discountAmount;
    }, 0);
  };


  const onSubmit = async (values) => {
    
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkananna", materialData)
    // let materialPayload = []
    // for (let i = 0; i < materialData.length; i++) {
    //   materialPayload.push({
    //     gst: materialData[i]?.material?.gst,
    //     unitCost: materialData[i]?.material?.unitCost,   
    //     quantity: materialData[i]?.quantity,
    //     itemDetails: materialData[i]?._id,
    //     amount: totalAmount,
    //   })
      
    // };
    // console.log(selectedIndentIds, "selectedIndentIdsselectedIndentIdsselectedIndentIds")
    console.log("Initial materialData:", materialData);

    const calculateTotal = (quantity = 0, rate = 0, discount = 0, gstRate = 0, discountType = '%') => {
      let discountAmount = 0;
      if (discountType === '%') {
        discountAmount = (rate * quantity * discount) / 100;
      } else {
        discountAmount = discount;
      }
    
      const gstAmount = calculateGstAmount(rate, quantity, discountAmount, gstRate);
      console.log(gstAmount, "gstAmount");
    
      return (rate * quantity) - discountAmount + gstAmount;
    };
    
    let materialPayload = [];
    
    for (let i = 0; i < materialData.length; i++) {
      const rowData = materialData[i];
      const rate = parseFloat(rowData?.rate || 0);
    
      console.log("rate:", rate);
    
      const totalAmount = calculateTotal(rowData.quantity, rowData.rate, rowData.discount, rowData.gst || parseFloat(rowData?.material?.gst));
    
      materialPayload.push({
        gst: rowData?.gst || parseFloat(rowData?.material?.gst) || 0, // Use rowData.gst or parse material.gst if available
        unitCost: rate, // Use rate but keep the property name as unitCost
        quantity: rowData?.quantity,
        itemDetails: rowData?._id,
        amount: totalAmount,
      });
    }
    
    console.log("Final materialPayload:", materialPayload);
    
    const data = {
      indentId: router.query.selectedIndentIds
        ? JSON.parse(router.query.selectedIndentIds)
        : JSON.parse(localStorage.getItem('selectedIndentIds')),
      poId: values.poid,
      vendorId: values.vendorId,
      expectedDelivery: values.expectedDelivery,
      deliveryAddress: values.deliveryAddress,
      termsandcondition: values.termsandcondition,
      remarks: values.remarks,
      billingDetails: values.billingDetails,
      material: materialPayload,
      subTotal: total,
      disCount: disCount,
      gstType: gstType,
      totalIncludingTax: totalIncludingTax,
      roundOfTotal: Math.round(totalIncludingTax),
      gstDetails: gstDetails
    };
    

    console.log(data);
    console.log(disCount, "fffffffffffffffff")

    console.log("data....88hhhhhhhhhhhhhhhhhhhhhhhhh8888888888888.....................", data)
    try {
      const response = await axios.post(
        `${config.API_URL}/purchaseOrder/add`,
        data,
        {
          params: {
            organization: currentOrganizationId,
            site: siteId,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.success) {
        toast.success("PO Successfully Created", { position: "top-center" });
        handleClose(); // Close the form and redirect after successful submission

      } else {
        console.error("Failed to create Purchase Order:", response.data);
        toast.error("Failed to create Purchase Order. Please try again.", { position: "top-center" });
      }
    } catch (error) {
      // console.error("Error creating Purchase Order:", error);
      // toast.error("An error occurred while processing your request. Please try again.", { position: "top-center" });
    }
  };
  // Calculate CGST and SGST based on the given GST value


  // State for discount value


  const [disCount, setdisCount] = useState('');
  let discountAmount = 0;
  let rate = 0;
  let quantity = 0;
  let discount = 0
  if (discountType === '%') {
    discountAmount = (rate * quantity * discount) / 100;
  } else {
    discountAmount = discount;
  }
  const calculateGstAmount = (rate, quantity, discountAmount, gstRate) => (((rate * quantity) - discountAmount) * gstRate) / 100;

  useEffect(() => {
    // Update any effects that depend on gstType or materialData changes
  }, [gstType, materialData]);

  const calculateTotals = () => {
    let total = 0;
    let gstDetails = [];

    // Calculate total and GST details based on rowData
    for (let i = 0; i < materialData.length; i++) {
      const rowData = materialData[i];
      const rate = parseFloat(rowData?.rate || 0);
      const quantity = parseFloat(rowData?.quantity || 0);
      const discount = parseFloat(rowData?.discount || 0);

      total += rate * quantity;

      let discountAmount = 0
      if (discountType === '%') {
        discountAmount = (rate * quantity * discount) / 100;
      } else {
        discountAmount = discount;
      }

      const gstRate = parseFloat(rowData?.gst || rowData?.material?.gst);
      if (gstType === 'IGST') {
        gstDetails.push({ [`IGST(${gstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, gstRate) });
      } else {
        const halfGstRate = gstRate / 2;
        gstDetails.push({ [`CGST(${halfGstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, halfGstRate) });
        gstDetails.push({ [`SGST(${halfGstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, halfGstRate) });
      }
    }

    const discountedTotal = total - disCount;
    const gstofTotalamount = gstDetails.reduce((acc, detail) => {
      const gstAmount = parseFloat(Object.values(detail)[0]);
      return acc + gstAmount;
    }, 0);

    const totalIncludingTax = parseFloat((discountedTotal + gstofTotalamount).toFixed(2));

    return { total, totalIncludingTax, gstDetails };
  };

  // const { total, totalIncludingTax, gstDetails } = calculateTotals();

  const calculateFinalTotal = (materialData, disCount) => {
    let total = 0;
    let totalDiscount = 0;
    let gstDetails = [];

    for (let i = 0; i < materialData.length; i++) {
      const rowData = materialData[i];
      const rate = parseFloat(rowData?.rate || 0);
      const quantity = parseFloat(rowData?.quantity || 0);
      total += rate * quantity;

      let discountAmount = 0;
      if (discountType === '%') {
        discountAmount = (rate * quantity * (rowData?.discount || 0)) / 100;
      } else {
        discountAmount = parseFloat(rowData?.discount || 0);
      }
      totalDiscount += discountAmount;

      const gstRate = parseFloat(rowData?.gst || rowData?.material?.gst || 0);
      if (gstType === 'IGST') {
        gstDetails.push({ [`IGST(${gstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, gstRate) });
      } else {
        const halfGstRate = gstRate / 2;
        gstDetails.push({ [`CGST(${halfGstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, halfGstRate) });
        gstDetails.push({ [`SGST(${halfGstRate}%)`]: calculateGstAmount(rate, quantity, discountAmount, halfGstRate) });
      }
    }

    totalDiscount += parseFloat(disCount || 0);

    const discountedTotal = total - totalDiscount;
    const gstofTotalamount = gstDetails.reduce((acc, detail) => {
      const gstAmount = parseFloat(Object.values(detail)[0]);
      return acc + gstAmount;
    }, 0);

    const totalIncludingTax = parseFloat((discountedTotal + gstofTotalamount).toFixed(2));

    return { total, totalDiscount, totalIncludingTax, gstDetails };
  };

  const { total, totalDiscount, totalIncludingTax, gstDetails } = calculateFinalTotal(materialData, disCount);

  const data = {
    "Amount": total,
    "Additional Discount(₹)": disCount,
    "Total Discount(₹)": totalDiscount.toFixed(2),
    "GST Type": gstType, // Assuming default GST type is IGST
    gstDetails: gstDetails,
    "Total Amount(Inc. taxes)": totalIncludingTax,
    "Round off Total": Math.round(totalIncludingTax)
  };

  const orderedKeys = [
    "Amount",
    "GST Type",
    "gstDetails",
    "Additional Discount(₹)",
    "Total Discount(₹)",
    "Total Amount(Inc. taxes)",
    "Round off Total",
  ];
  // JSX to display the data


  console.log(materialData?.materialId, "materialData?.materialId?.material");
  console.log(materialData, "materialDatamaterialDatamaterialDatamaterialDatamaterialDatamaterialDatamaterialData")
  const gstHeaderTemplate = () => {
    return (
      <div className="d-flex align-items-center">
        <span className="me-3">GST</span>
        <Dropdown
          value={gstType}
          options={gstOptions}
          onChange={(e) => setGstType(e.value)}
        />
      </div>
    );
  };
  const renderTableRows = () => {
    const data = {
      "Amount": total,
      "Additional Discount(₹)": disCount,
      "Total Discount(₹)": totalDiscount.toFixed(2),
      "GST Type": gstType, // Assuming default GST type is IGST
      gstDetails: gstDetails,
      "Total Amount(Inc. taxes)": totalIncludingTax,
      "Round off Total": Math.round(totalIncludingTax)
    };

    const rows = [];

    orderedKeys.forEach((key) => {
      const value = data[key];

      const isBold = ["Amount", "Total Amount(Inc. taxes)", "Round off Total"].includes(key);

      if (key === 'gstDetails') {
        data.gstDetails.forEach((detail, index) => {
          const [gstType, gstAmount] = Object.entries(detail)[0];
          rows.push(
            <tr key={`gstDetail-${index}`} className="table-row">
              <td className="gray-text">{gstType}</td>
              <td className="gray-text">{gstAmount.toFixed(2)} </td>
            </tr>
          );
        });
        rows.push(
          <tr key="grayLine" className="gray-line">
            <td colSpan="2"></td>
          </tr>
        );
      } else {
        rows.push(
          <tr key={key} className="table-row">
            <td className={isBold ? "bold" : ""}>{key}</td>
            <td>
              {key === 'Additional Discount(₹)' ? (
                <input
                  type="number"
                  className="discount-input"
                  value={value}
                  onChange={(e) => setdisCount(parseFloat(e.target.value) || 0)}
                />
              ) : (
                typeof value === 'object' ? JSON.stringify(value) : value
              )}
            </td>
          </tr>
        );
      }
    });
    return rows;
  };
  const onQuantityChange = (e, index) => {
    const newValue = parseFloat(e.target.value);
    const updatedMaterialData = [...materialData];
    updatedMaterialData[index].quantity = isNaN(newValue) ? 0 : newValue;
    setMaterialData(updatedMaterialData);
  };

  const onRateChange = (e, index) => {
    const newValue = parseFloat(e.target.value);
    const updatedMaterialData = [...materialData];
    updatedMaterialData[index].rate = isNaN(newValue) ? 0 : newValue;
    setMaterialData(updatedMaterialData);
  };

  const onDiscountChange = (e, index) => {
    const newValue = parseFloat(e.target.value);
    const updatedMaterialData = [...materialData];
    updatedMaterialData[index].discount = isNaN(newValue) ? 0 : newValue;
    setMaterialData(updatedMaterialData);
  };

  // const onGstChange = (e, index) => {
  //   const newValue = parseFloat(e.target.value);
  //   const updatedMaterialData = [...materialData];
  //   updatedMaterialData[index].gst = isNaN(newValue) ? 0 : newValue;
  //   setMaterialData(updatedMaterialData);
  // };

  const handleGstRateChange = (value, index) => {
    const updatedMaterialData = [...materialData];
    updatedMaterialData[index].gst = value;
    setMaterialData(updatedMaterialData);
  };

  const calculateTotal = (quantity = 0, rate = 0, discount = 0, gstRate = 0) => {
    let discountAmount = 0;
    if (discountType === '%') {
      discountAmount = (rate * quantity * discount) / 100;
    } else {
      discountAmount = discount;
    }

    const gstAmount = calculateGstAmount(rate, quantity, discountAmount, gstRate);
    console.log(gstAmount, "gstAmountgstAmountgstAmount")

    return (rate * quantity) - discountAmount + gstAmount;
  };
  console.log(calculateTotal, "total")
  const discountHeaderTemplate = () => {
    return (
      <div className="d-flex align-items-center">
        <span className="me-3">Discount</span>
        <Dropdown
          value={discountType}
          options={discountOptions}
          onChange={(e) => setDiscountType(e.value)}
        />
      </div>
    );
  };
  return (
    <>
      <div className='row bg-light-blue p-2'>
        <span className='fw-bolder'> <Link href={`/sites/material/indent?siteId=${siteId}`}><i className='bi bi-arrow-left'></i></Link> Create Purchase Order</span>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CreatePoSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className='row mt-4'>
                <div className=' bg-gray p-2'>
                  <small className='fw-bolder'>Purchase Order Id </small>
                </div>

                <div className='col-12 mt-5 d-flex gap-3'>
                  <div className='col-3'>
                    <Field
                      as="select"
                      type="text"
                      className="form-select"
                    >
                      <option value="PO-2023-24">PO-2023-24</option>
                    </Field>
                  </div>

                  <div className='col-3'>
                    <Field
                      type="text"
                      name="poid"
                      className="form-control"
                      placeholder="Eg. PO-2023-24-001"
                    />

                    <ErrorMessage
                      name="poid"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>

                </div>
              </div>

              <div className='row mt-5'>
                <div className=' bg-gray p-2'>
                  <small className='fw-bolder'>Vendor Details</small>
                </div>

                <div className='col-12 mt-5 d-flex gap-3'>
                  <div className='col-2'>
                    Vendor <span className='text-danger'>*</span>
                  </div>
                  <div className='col-4'>
                    <Field
                      as="select"
                      name="vendorId"
                      className="form-select border-gray"
                      aria-label="Default select example"
                      onChange={(e) => {
                        onSelectVendor(e.target.value);
                        setFieldValue('vendorId', e.target.value); // Update the field value
                      }}
                    >
                      <option value="">Select Vendor</option>
                      {getvendorDetails && getvendorDetails?.map((item) =>
                        <option
                          key={item?._id}
                          value={item?._id}
                          data-id={item?._id}
                          data-name={item?.name}
                          data-inviteaccepted={item?.inviteAccepted}
                        >
                          {item?.vendor?.vendorName}
                        </option>
                      )}
                    </Field>

                    <ErrorMessage
                      name="vendorId"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />

                    {selectedVendorDetails &&
                      <div className="mt-3 border rounded p-2">
                        <div className='col'>{selectedVendorDetails?.vendor?.vendorName}</div>
                        <div className='col'>{selectedVendorDetails?.vendor?.address}</div>
                        <div className='col'>{selectedVendorDetails?.vendor?.contactNo}</div>
                        <div className='col'>{selectedVendorDetails?.vendor?.vendorEmail}</div>
                      </div>}
                  </div>
                </div>
              </div>

              <div className='row mt-5'>
                <div className=' bg-gray p-2'>
                  <small className='fw-bolder'>Delivery and Billing Address </small>
                </div>

                <div className='col-12 mt-5 d-flex gap-3 align-items-center'>
                  <div className='col-2'>
                    Expected Delivery By <span className='text-danger'>*</span>
                  </div>

                  <div className='col-4'>
                    <Field
                      type="date"
                      name="expectedDelivery"
                      className="form-control col-6"
                      min={new Date().toISOString().split('T')[0]}
                    />

                    <ErrorMessage
                      name="expectedDelivery"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>
                </div>

                <div className='col-12 mt-5 d-flex gap-3 align-items-center'>
                  <div className='col-2'>
                    Delivery Address <span className='text-danger'>*</span>
                  </div>

                  <div className='col-4'>
                    <Field
                      type="text"
                      name="deliveryAddress"
                      className="form-control"
                      placeholder="Enter Delivery Address"
                    />

                    <ErrorMessage
                      name="deliveryAddress"
                      render={(msg) => (
                        <small style={{ color: "red" }}>{msg}</small>
                      )}
                    />
                  </div>
                </div>

                <div className='col-12 mt-5 d-flex gap-3 align-items-start '>
                  <div className='col-2 d-flex ' >
                    Billing Details <span className='text-danger'>*</span>
                  </div>

                  <div className='col-4 border border-left-0 border-2 rounded p-2'>
                    <div>
                      {addressDetails?.name}
                    </div>

                    <div>
                      {addressDetails?.address}
                    </div>

                    <div>
                      {addressDetails?.city}
                    </div>

                    <div>
                      GSTIN:
                      {""}  {addressDetails?.gst_number}
                    </div>
                  </div>
                </div>

                {/* <div className='col-12 mt-5 d-flex align-items-center gap-3'>
                  <div className='col-2'>
                    Phone Number
                  </div>

                  <div className="col-4">
                    <Field
                      type="text"
                      name="poNumber"
                      className="form-control"
                      placeholder="Enter Phone no."
                    />
                  </div>
                </div> */}
              </div>

              <div className='row mt-5'>
                <div className=' bg-gray p-2'>
                  <small className='fw-bolder'>Item Details</small>
                </div>

                <div className="shadow mt-3">

                  <div className="table-container1">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Material Name</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>{discountHeaderTemplate()}</th>
                          <th>{gstHeaderTemplate()}</th>

                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {materialData.map((rowData, index) => {
                          console.log(rowData); // Logging rowData to console
                          console.log(rowData?.material?.gst); // Logging rowData to console


                          return (
                            <tr key={index}>
                              <td>{rowData.material.materialName}</td>
                              <td>
                                <input
                                  type="number"
                                  className="discount-input"
                                  value={rowData.quantity}
                                  onChange={(e) => onQuantityChange(e, index)}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="discount-input"
                                  value={rowData.rate}
                                  onChange={(e) => onRateChange(e, index)}
                                />
                              </td>
                              <td>
                                {/* <input
            type="number"
            className="discount-input"
            value={rowData.discount}
            onChange={(e) => onDiscountChange(e, index)}
          /> */}
                                <input
                                  type="number"
                                  className="discount-input"
                                  value={rowData.discount || ''}
                                  onChange={(e) => onDiscountChange(e, index)}
                                />
                              </td>
                              <td>
                                {/* <input
                                  type="number"
                                  className="discount-input"
                                  value={rowData.gst || parseFloat(rowData?.material?.gst) || ''}
                                  onChange={(e) => onGstChange(e, index)}
                                /> */}
                                <Dropdown
            className="discount-input"
            value={rowData.gst !== undefined ? rowData.gst : (parseFloat(rowData?.material?.gst) || 0)}
            options={gstRateOptions}
            onChange={(e) => handleGstRateChange(e.value, index)}
            placeholder="Select GST Rate"
            dropdown // Add this line to enable the dropdown icon
          />
                              </td>
                              <td>{calculateTotal(rowData.quantity, rowData.rate, rowData.discount, rowData.gst || parseFloat(rowData?.material?.gst||0))} ₹</td>
                            </tr>

                          );
                        })}
                      </tbody>

                      <tfoot>
                        {/* <tr>
            <td colSpan="5">Subtotal</td>
            <td>
              {materialData.reduce((acc, rowData) => {
                return acc + parseFloat(calculateTotal(rowData));
              }, 0)} ₹
            </td>
          </tr> */}
                      </tfoot>
                    </table>

                  </div>
                </div>

              </div>
              <div className="table-container" >
                {renderTableRows()}

              </div>

              <div className='row mt-5'>
                <div className='bg-gray p-2'>
                  <small className='fw-bolder'>Terms and Conditions</small>
                </div>

                <div className='col-7 mt-5 d-flex align-items-center gap-3'>
                  <div className='col-3'>
                    Add Terms & Conditions:
                  </div>

                  <div className='col-7'>
                    <Field
                      type="text"
                      name="termsandcondition"
                      placeholder="Terms and Conditions"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className='row mt-5'>
                <div className='bg-gray p-2'>
                  <small className='fw-bolder'>Vendor and Team Remarks</small>
                </div>

                <div className='col-7 mt-5 d-flex align-items-center gap-3'>
                  <div className='col-3'>
                    Vendor Remarks
                  </div>

                  <div className='col-7'>
                    <Field
                      type="text"
                      name="remarks"
                      placeholder="Vendor Remarks"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {/* 
              <div className='row mt-5'>
                <div className=' bg-gray p-2'>
                  <small className='fw-bolder'>Attach File <span>Optional</span></small>
                </div>
                <div className='col-4 mt-5 d-flex gap-3'>
                  <input
                    className='form-control'
                    type='file'
                    placeholder="Enter terms & Conditions"
                  />

                </div>
              </div> */}
              <hr />

              <div className='d-flex mt-4 justify-content-end'>
                {/* <div>
                  <button className='fw-bold text-dark-gray p-2 border-2 rounded shadow border bg-white'>CANCEL</button>
                </div> */}

                <div
                  className='d-flex justify-content-end gap-3'
                >
                  <button type='button' className='bg-white text-info border p-2 fw-bold border-info rounded'>SAVE DRAFT</button>

                  <button type='submit' className='bg-btn-bg text-white fw-bold rounded' onClick={onSubmit}
                  >CREATE PO</button>

                </div>
              </div>

            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default Indd;