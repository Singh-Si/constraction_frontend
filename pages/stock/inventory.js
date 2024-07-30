import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import StocksLayout from "@/layouts/StocksLayout";
import BomCreate from '@/components/sites/bom/BomCreate';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchMaterialBomAsync } from "@/store/material/Bom";
import { parseCookies } from 'nookies';

const Inventory = () => {
  const dispatch = useDispatch();
  const { userData, status } = useSelector((state) => state.bomMaterialSlice);
  const [materials, setMaterials] = useState([]);
  const { token, currentOrganizationId, siteId } = parseCookies();

  useEffect(() => {
    dispatch(fetchMaterialBomAsync());
  }, [dispatch]);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await axios.get(`${config.API_URL}/materials`, {
          params: {
            site: siteId,
            organization: currentOrganizationId,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response?.data?.success) {
          setMaterials(response?.data?.data); // Update materials state with fetched data
        }
      } catch (error) {
        console.log(error?.response?.data?.error);
      }
    }

    fetchMaterials();
  }, []); // Empty dependency array to run only once on component mount

  const handleAddMaterial = (newMaterial) => {
    // Assuming newMaterial is the format expected in your materials array
    // Add the new material to the materials state
    setMaterials([...materials, newMaterial]);
  };

  const gstHeaderTemplate = () => {
    // Define GST header template if needed
    return <span>GST</span>;
  };

  return (
    <StocksLayout current="inventory">
      <div className="col-11 text-end mb-3">
        <button className='btn bg-btn-bg text-white new-site-btn' style={{ boxShadow: "2px 2px 13px #8CBCD9" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Material</button>
      </div>

      {/* Render BomCreate component to add new materials */}
      <BomCreate onAddMaterial={handleAddMaterial} />

      <div className='col p-6 overflow-scroll ' style={{ height: '100%',width:'100%' }}>
        <div className="shadow mt-3">
          {status === 'loading' ? (
            <ProgressSpinner className='mt-5' style={{ width: 50, height: 50 }} />
          ) : (
            <DataTable
              value={userData?.data}
              emptyMessage="No Data Found"
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50,100]}
              responsive
              className="p-datatable-striped"

              >
              <Column field="materialCode" header="Material ID"  className='border-bottom' style={{ width: '100rem' }}></Column>
              <Column field="materialName" header="Material Name"  className='border-bottom' style={{ width: '170rem' }}></Column>
              <Column field="uom" header="UOM"  className='border-bottom' style={{ width: '100rem' }}></Column>
              <Column field="brandName" header="Brand Name"  className='border-bottom' style={{ width: '150rem' }}></Column>
              <Column field="gst" header="GST %"  className='border-bottom' style={{ width: '100rem' }}></Column>
              <Column field="usedFromStocks" header="Used Stocks "  className='border-bottom' style={{ width: '150rem' }}></Column>
              <Column field="inStocks" header="In Stocks"  className='border-bottom' style={{ width: '100rem' }}></Column>
              <Column field="unitCost" header="Unit Cost"  className='border-bottom' style={{ width: '120rem' }}></Column>
              <Column field="description" header="Description"  className='border-bottom' style={{ width: '100rem' }}></Column>
              <Column field="hsn" header="HSN"  className='border-bottom' style={{ width: '133rem' }}></Column>

              {/* <Column header="Actions" body={() => <button className="btn btn-sm btn-primary">Edit</button>} style={{ width: '6rem', textAlign: 'center' }}></Column> */}
            </DataTable>
          )}
        </div>
      </div>
    </StocksLayout>
  );
};

export default Inventory;

