import StocksLayout from '@/layouts/StocksLayout'
import BackIcon from "@/components/utils/global/BackIcon";
import nookies from "nookies";
import { useEffect , useState } from 'react'
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import { Column } from '@react-email/components';
import { Button } from "primereact/button";

const GRN = ({info }) => {
  const [grn , setGrn] = useState([])
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
    useEffect(()=>{
      if(info){
    let mappedGrn = info.map((e)=>{
        return {
          grnId : e.GRNId,
          materialName : e?.materialDetails[0]?.materialName, 
        }
    })
setGrn(mappedGrn)
console.log(`THIS IS THE ${JSON.stringify(mappedGrn)}`)
  } 
},[info])
    return (
      <div>
          <div className="site-profile">
        <div className="site-profile-heading">
          <span style={{ color: "#FFFFFF", opacity: "0.6" }}>
            Commercial /{" "}
          </span>
          <span style={{ color: "white", marginLeft: "0.2rem" }}>Inventory</span>
        </div>

      </div>
        <StocksLayout current="grn">
            <div className='row-sm d-flex justify-content-end gap-2 mt-4'>
                <div className='col-2 text-end '>
                    <button type="button"  style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-pdf-fill"></i> Export PDF</button>
                </div>
                <div className='col-2'>
                    <button type="button" style={{background : "none" , border : '1px solid rgba(42 , 62 , 78 , 0.6) ' , borderRadius : '2px'}} data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i class="bi bi-file-earmark-spreadsheet"></i>  Export Excel</button>
                </div>

            </div>
            <div className="card" style={{marginTop : "3rem"}}>
            <div className="card" style={{maxWidth :"100%" }}>
        <div className="data-table-container" style={{maxWidth :"1300px" , overflowX :'auto'}}>
          <DataTable
            value={grn}
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
              field="grnId"
              header="GRN ID"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="materialName"
              header="Material Name"
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
              field="vendorName"
              header="Received Name"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="vendorName"
              header="Ordered Qty"
              headerStyle={headerStyle}
              bodyStyle={bodyStyle}

            />
            <Column
              field="item"
              header="Received Qty"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton1}

            />
            <Column
              field="addDetails"
              header="Invoice Amount"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton}

            />
            <Column
              field="addDetails"
              header="File"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton}

            />
            <Column
              field="addDetails"
              header="Action"
              headerStyle={headerStyle}
              bodyStyle={buttonStyle}
              body={renderButton}

            />
          </DataTable>
          </div>
        </div>
         
        </div>
        

        </StocksLayout>
        </div>
    )
}
export default GRN


export async function getServerSideProps(context) {
    const { currentOrganizationId, token } = nookies.get(context);
    const { poId } = context.query;
      try {
        const response = await axios.get(
          `https://construction-backend.onrender.com/GRN/getAllGRN?organization=66584f2ab4b09451743bb357&site=66695b9452ae92457fefa1f8&poId=668cbbcf9ce459a586fbf01a`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiaXNTdXBlckFkbWluIjoiaW5pdCIsImxvZ2dlZEluVGltZSI6ImluaXQiLCJpc0xvZ2dlZEluIjoiaW5pdCIsImJsb2NrZWQiOiJpbml0IiwicGhvbmUuaXNWYWxpZCI6ImluaXQiLCJwaG9uZS5udW1iZXIiOiJpbml0IiwiZW1haWwuaXNWYWxpZCI6ImluaXQiLCJfaWQiOiJpbml0IiwiZW1haWwuYWRkcmVzcyI6ImluaXQiLCJjcmVhdGVkQXQiOiJpbml0IiwidXBkYXRlZEF0IjoiaW5pdCIsIl9fdiI6ImluaXQiLCJuYW1lIjoiaW5pdCIsInJvbGUiOiJpbml0IiwicHJvZmlsZSI6ImluaXQifSwic3RhdGVzIjp7InJlcXVpcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsImVtYWlsLmFkZHJlc3MiOnRydWUsImVtYWlsLmlzVmFsaWQiOnRydWUsInBob25lLm51bWJlciI6dHJ1ZSwicGhvbmUuaXNWYWxpZCI6dHJ1ZSwiYmxvY2tlZCI6dHJ1ZSwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNTdXBlckFkbWluIjp0cnVlLCJsb2dnZWRJblRpbWUiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWUsIm5hbWUiOnRydWUsInJvbGUiOnRydWUsInByb2ZpbGUiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiZW1haWwiOnsiYWRkcmVzcyI6Im5vaWRhQGdtYWlsLmNvbSIsImlzVmFsaWQiOmZhbHNlfSwicGhvbmUiOnsibnVtYmVyIjoiOTQ1MTg4MzM3NyIsImlzVmFsaWQiOnRydWV9LCJfaWQiOiI2NjU4NGViZWI0YjA5NDUxNzQzYmIzNDciLCJibG9ja2VkIjpmYWxzZSwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNTdXBlckFkbWluIjpmYWxzZSwibG9nZ2VkSW5UaW1lIjoiMjAyNC0wNy0wNVQxMDoyNTowMy42MDJaIiwiY3JlYXRlZEF0IjoiMjAyNC0wNS0zMFQxMDowMjozOC4wODdaIiwidXBkYXRlZEF0IjoiMjAyNC0wNy0wNVQxMDoyNTowMy42MDJaIiwiX192IjowLCJuYW1lIjoiTm9pZGEiLCJyb2xlIjoiNjVkZWZjMzE4NWVlMjAxZjRlNDFlMzE5IiwicHJvZmlsZSI6IjY2NjdjZDNhMjQyOTMxYTg0MWNkMDQ2NyJ9LCJpYXQiOjE3MjA0OTYwODN9.-uUXuNXABaTNX4ZhaCZ1_7Kc35az3PBjvIs0LxhUQe8`,
            },
          }
        );
  
        const info = response?.data.data || [];

        return {
          props: {
            info,
          },
        };
      } catch (err) {
        console.log(`There was an error fetching the data: ${err}`);
        return {
          props: {
           info: `error ${err}`,
            token: null,
          },
        };
      }
    } 
