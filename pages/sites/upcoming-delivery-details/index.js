import React, { useEffect, useState } from "react";
import StocksLayout from "@/layouts/StocksLayout";
import nookies from "nookies";
import axios from "axios";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const Index = ({ filtered_data, poId }) => {
  const router = useRouter()
  const [info, setInfo] = useState(null);
  const [materialInfo, setMaterialInfo] = useState([]);
  const { token, currentOrganizationId, siteId } = nookies.get();
  const [receivedQunatity , setReceivedQuantity] = useState("");
  const [invoiceQty , setInvoiceQty] = useState('');
  const [fileUpload , setFileUpload] = useState("")
 
  async function fetchingMaterialInfo() {
    try {
      console.log(`DATA : ${filtered_data}`)
      if (poId && token && currentOrganizationId && siteId && poId) {
        const response = await axios.get(
          `https://construction-backend.onrender.com/GRN/deliveryItems?organization=668bc02b3d82b81b1942aee5&site=66695b9452ae92457fefa1f8&poId=668cbbcf9ce459a586fbf01a`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (
          response.data.data &&
          response.data.data.length > 0 &&
          response.data.data[0] !== null
        ) {
          setMaterialInfo(response.data.data[0]);
        } else {
          console.log(
            "There is an error with the response data structure or it is empty."
          );
        }
      }
    } catch (error) {
      console.log(`This is the error ${JSON.stringify(error.response.data)}`);
    }
  }

  async function updatingGrnDetails(){
    if(receivedQunatity && invoiceQty ) {
      try{
  // condition of file upload needs to be updated
  let response = await fetch(`https://construction-backend.onrender.com/GRN/add?organization=66584f2ab4b09451743bb357&site=66695b9452ae92457fefa1f8&poId=668cbbcf9ce459a586fbf01a` , {
    method : 'POST' ,
    headers : {
      Authorization : `Bearer ${token}`
    } ,
    body: JSON.stringify({
      invoice: invoiceQty,
    }),
  })

   response ='true'
  // have to check the response sucess case 
  if(response =="true"){
    toast.success('GRN DETAILS SUCCESSFULLY UPDATED' , {
      position : 'top-center'
    })
  }
      }catch(err){
        console.log(`There is an error ${err}`)
      }
  }
  }
  const handleGrnSubmit = ()=>{
    console.log(`The GRN DETAILS NEEDS TO BE SUBMITED NOW`)
    router.push(`/stock/grn?poId=${poId}`)
  }
  useEffect(() => {
    if (filtered_data && filtered_data.length > 0) {
      const info = filtered_data[0];
      setInfo(info);
      fetchingMaterialInfo();

    }
  }, [filtered_data, poId]);

  return (
    <div>
      <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Commercial / Upcoming Delivery /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Details</span>
        </div>
        <StocksLayout current="upcomingdeliveries" />
      </div>
      <div
        style={{
          backgroundColor: "#E3F4FF",
          padding: "1.5rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Created By :
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {info?.createdBy.name}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Vendor :
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {info?.vendorId.vendor.contactPerson}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Expected Delivery{" "}
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {info?.expectedDelivery}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Office POC :{" "}
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {/* Replace with actual data */}
            {/* {info?.office_poc} */}
            {"NULL"}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Site POC :{" "}
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {/* Replace with actual data */}
            {/* {info?.site_poc} */}
            {"NULL"}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Vendor Contact :{" "}
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {info?.vendorId.vendor.contactPerson}
          </p>
        </div>

        <div style={{ color: "#666767", fontWeight: "bolder" }}>
          Status :{" "}
          <p
            style={{
              color: "black",
              marginLeft: "0.3rem",
              marginTop: "1rem",
              fontWeight: "normal",
            }}
          >
            {info?.poOrderedStatus}
          </p>
        </div>
      </div>
      <div className="site-profile-heading" style={{ width: "102.4%" }}>
        <span style={{ color: "#FFFFFF" }}>Pending Items </span>
      </div>

      <table
        className="table-container-upcoming-delivery-details"
        style={{ marginLeft: "-1.3rem" }}
      >
        <thead>
          <tr>
            <th style={{ width: "228px", color: "#545454", opacity: "60%" }}>
              Material Name :
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].materialName
                  : "Material Name Not Available"}
              </p>
            </th>
            <th style={{ width: "228px", color: "#545454", opacity: "60%" }}>
              Ordered Qty:
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.deliveredItems &&
                materialInfo.deliveredItems.length > 0
                  ? materialInfo.deliveredItems[0].material[0].orderedQuantity
                  : "Material Name Not Available"}
              </p>
            </th>
            <th style={{ width: "228px", color: "#545454", opacity: "60%" }}>
              Pending Qty:
              <p style={{ color: "black" }}>
                {/* {materialInfo.deliveredItems[0].material[0].orderedQuantity -
                  materialInfo.deliveredItems[0].material[0].receiveQuantity} */}
                {"null"}
              </p>{" "}
            </th>
            <th style={{ width: "228px", color: "#545454", opacity: "60%" }}>
              Received Qty : <span style={{ color: "red" }}>*</span>
              <p style={{ color: "black" }}>
                <input
                  type="text"
                  placeholder="Enter Received Quantity"
                  value={receivedQunatity}
                  onChange={(e)=>{
                    setReceivedQuantity(e.target.value)
                  }}
                  style={{
                    background: "none",
                    border: "1px solid gray",
                    padding: "1rem",
                    width: "100%",
                    marginLeft: "0.2rem",
                  }}
                />
              </p>{" "}
            </th>
            <th style={{ width: "228px", color: "#545454", opacity: "60%" }}>
              Invoice Amount : <span style={{ color: "red" }}>*</span>
              <p style={{ color: "black" }}>
                <input
                  type="text"
                  placeholder="Enter Invoice Amount"
                  style={{
                    background: "none",
                    border: "1px solid gray",
                    padding: "1rem",
                    width: "100%",
                    marginLeft: "0.2rem",
                  }}
                />
              </p>{" "}
            </th>
            <th
              style={{
                width: "228px",
                color: "#545454",
                opacity: "60%",
              }}
            >
              File Upload : <span style={{ color: "red" }}>*</span>
              <p style={{ color: "black" }}>
                <input
                  type="file"
                  style={{
                    width: "85%",
                    height: "40px",
                    zIndex: "1",
                    marginLeft: "0.6rem",
                    paddingTop: "0.6rem",
                    // border: "1px solid red",
                  }}
                />
              </p>{" "}
            </th>
          </tr>
        </thead>
      </table>
      <div className="site-profile-heading" style={{ width: "102.5%" }}>
        <span style={{ color: "#FFFFFF" }}>Delivered Items </span>
      </div>

      <table
        className="table-container-upcoming-delivery-details"
        style={{ marginLeft: "-1.4rem" }}
      >
        <thead>
          <tr>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Brand :{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].brandName
                  : "undefined"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Length :{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].length
                  : "undefined"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Breadth:{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].breadth
                  : "undefined"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Height:{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].height
                  : "Material Name Not Available"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Diameter:{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0 &&
                materialInfo.materialDetails[0].diameter !== ""
                  ? materialInfo.materialDetails[0].diameter
                  : "undefined"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Weight:{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0 &&
                materialInfo.materialDetails[0].weight !== ""
                  ? materialInfo.materialDetails[0].weight
                  : "undefined"}
              </p>
            </th>
            <th style={{ width: "260px", color: "#545454", opacity: "60%" }}>
              Colour:{" "}
              <p style={{ color: "black" }}>
                {materialInfo &&
                materialInfo.materialDetails &&
                materialInfo.materialDetails.length > 0
                  ? materialInfo.materialDetails[0].color
                  : "undefined"}
              </p>
            </th>
          </tr>
        </thead>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          className="site-profile-heading"
          style={{
            width: "20%",
            marginLeft: "-10rem",
            padding: "1rem 0rem",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>
            Linked Indents -
            {materialInfo &&
            materialInfo.indents &&
            materialInfo.indents.length > 0
              ? materialInfo.indents[0].indentId
              : "undefined"}
          </span>
          <p
            style={{
              color: "white",
              backgroundColor: "none",
              marginTop: "1rem",
            }}
          ></p>
        </div>

        <div
          className="site-profile-heading"
          style={{
            width: "20%",
            marginLeft: "-16rem",
            padding: "1rem 0rem",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>
            Linked GRN -{" "}
            {materialInfo &&
            materialInfo.deliveredItems &&
            materialInfo.deliveredItems.length > 0
              ? materialInfo.deliveredItems[0].GRNId
              : "undefined"}
          </span>
          <p
            style={{
              color: "white",
              backgroundColor: "none",
              marginTop: "1rem",
            }}
          ></p>
        </div>

        <Button
          colorScheme="teal"
          variant="solid"
          style={{
            backgroundColor: "#2075A9",
            padding: "0.6rem 4rem",
            borderRadius: "0.3rem",
            marginLeft: "2rem",
            marginTop: "0.2rem",
            color: "white",
          }}
          onClick={handleGrnSubmit}
        >
          CREATE GRN
        </Button>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const { currentOrganizationId, token, siteId } = nookies.get(context);
  const { poId } = context.query;

  if (currentOrganizationId && token && siteId) {
    try {
      const response = await axios.get(
        "https://construction-backend.onrender.com/purchaseOrder/upcoming",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            organization: currentOrganizationId,
            status: "",
          },
        }
      );

      const deliveryInfo = response?.data.data || [];
      let filtered_data = null;

      if (deliveryInfo) {
        filtered_data = deliveryInfo.filter((info) => info.poId === poId);
      }

      return {
        props: {
          deliveryInfo,
          filtered_data,
          poId,
          siteId,
          currentOrganizationId,
          token,
        },
      };
    } catch (err) {
      console.log(`There was an error fetching the data: ${err}`);
      return {
        props: {
          deliveryInfo: `error ${err}`,
          token: null,
        },
      };
    }
  } else {
    console.log(`hi `)
    return {
      props: {
        deliveryInfo: [],
        token: null,
      },
    };
  }
}
