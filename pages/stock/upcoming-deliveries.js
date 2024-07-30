import React, { useEffect, useState } from "react";
import StocksLayout from "@/layouts/StocksLayout";
import axios from "axios";
import nookies from "nookies";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import Link from "next/link";

const UpcomingDeliveries = ({ deliveryInfo , siteId , currentOrganizationId , token }) => {
  const [upcomingDelivery, setUpcomingDelivery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [poId, setpoId] = useState("");
  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (deliveryInfo) {
      console.log(`Received deliveryInfo: ${JSON.stringify(deliveryInfo)}`);

      const materialData = deliveryInfo?.data?.flatMap((info) => {
        if (info && info.material) {
          return info.material.map((item) => ({
            itemDetails: item.itemDetails , 
            quantity: item.quantity || 0,
          }));
        } 
      });
      
      setTableData(materialData);

      const mappedUpcomingDelivery = deliveryInfo?.data?.map((info) => {
        console.log(info);
        const allItemDetail = (info?.material)
          .map((item) => item.itemDetails || "No Details")
          .join(" ");

        return {
          quantity: info.poId,
          poId: `${info._id}`,
          createdBy: info.createdBy.name,
          vendorName: info.vendorId.vendor.vendorName,
          item: allItemDetail.trim() || "VIEW ",
          status: info.poOrderedStatus.split(" ")[1],
        
        };
      });

      console.log(`Delivery Info : ${token} , ${currentOrganizationId} , ${siteId}`)

      setUpcomingDelivery(mappedUpcomingDelivery);
    }
  }, [deliveryInfo]);

  const handleView = (e) => {
    setShowModal(true);
    setpoId(e.poId);
    console.log(showModal);
  };

  const handleDetail = (e) => {
    console.log(e);
    let poId = e.poId;
    router.push(`/sites/upcoming-delivery-details?poId=${poId}`);
  };

  const headerStyle = {
    backgroundColor: "#405768",
    color: "white",
    borderRight: "1px solid #ddd",
    borderBottom: "2px solid #ddd",
    minWidth : '150px',
  };
  const bodyStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    minWidth : '150px',
  };
  const buttonStyle = {
    borderRight: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    color: "#2075A9",
    overflow: "scrollable",
    background: "none",
  };

  const getStatusStyle = (rowData) => {
    if (rowData.status === "Pendin") {
      return {
        color: "#FFFFFF",
        opacity: "0.6",
        borderRadius: "5px",
        padding: "5px 30px",
        backgroundColor: "#FF1C1C",
      };
    } else if (rowData.status === "Pending") {
      return {
        color: "#FFFFFF",
        borderRadius: "5px",
        padding: "5px 30px",
        background: "linear-gradient(90deg, #EDE75E, #D6C107)",
      };
    }
  };

  const renderButton = (rowData) => {
    return (
      <Button
        label="Details"
        class="button"
        onClick={() => {
          handleDetail(rowData);
        }}
        style={{
          background: "none",
          color: "#2075A9",
          textDecoration: "underline",
        }}
      />
    );
  };
  const renderButton1 = (rowData) => {
    return (
      <Button
        class="button"
        onClick={() => {
          handleView(rowData);
        }}
        label="View"
        style={{
          background: "none",
          color: "#2075A9",
        }}
      />
    );
  };

  return (
    <div>
       <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Commercial /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>UPCOMING DELIVERIES</span>
        </div>

      </div>
      <StocksLayout current="upcomingdeliveries">
        <div className="card" style={{maxWidth :"100%" }}>
        <div className="data-table-container" style={{maxWidth :"1300px" , overflowX :'auto'}}>
          <DataTable
            value={upcomingDelivery}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="p-datatable-striped"
          >
            <Column
              field="poId"
              header="PO ID"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}
          
            />
            <Column
              field="createdBy"
              header="Created By"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="createdBy"
              header="Created By"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="createdBy"
              header="Created By"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="vendorName"
              header="Vendor Name"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="item"
              header="Item"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton1}

            />
            <Column
              field="status"
              header="Status"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={(rowData) => (
                <span style={getStatusStyle(rowData)}>{rowData.status}</span>
              )}
            />
            <Column
              field="addDetails"
              header="Add Details"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton}

            />
           
          </DataTable>
          </div>
        </div>
      </StocksLayout>
      {showModal && (
        <div className="modal-upcoming-delivery">
          <div className="modal-content-upcoming-delivery">
            <h5 style={{ textAlign: "left", color: "#405768" }}>
              PO ID -{poId}
            </h5>

            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <table className="table-container-upcoming-delivery">
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.itemDetails}</td>
                    <td>{row.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
      )}
    </div>
  );
};

export default UpcomingDeliveries;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.token;
  const currentOrganizationId = cookies.currentOrganizationId;
  const siteId = cookies.siteId;

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

    const deliveryInfo = response?.data || [];
    return {
      props: {
        deliveryInfo,
        currentOrganizationId,
        token,
      },
    };
  } catch (err) {
    console.log(`There was an error fetching the data: ${err}`);
    return {
      props: {
        deliveryInfo: `There is an error : ${err}`,
        token:null,
      },
    };
  }
}
