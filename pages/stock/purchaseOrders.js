// pages/purchaseorders.js

import config from "@/config/config";
import StocksLayout from "@/layouts/StocksLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import nookies from "nookies";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PurchaseOrders = ({ poData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (poData) {
      const mappedProducts = poData.map((po, index) => ({
        poId: `PO-2023-24-${po.poId}`,
        indentId: `ID:MT-00${index + 1}`,
        site: po.site?.name || "",
        vendor: po.vendorId?.vendor?.vendorName || "",
        createdOn: po.createdAt?.split("T")[0] || "",
        createdBy: po.createdBy?.name || "",
        deliveryDate: po.expectedDelivery || "",
      }));
      setProducts(mappedProducts);
    }
  }, [poData]);

  return (
    <StocksLayout current="purchaseorders">
      <div className="card">
        <DataTable
          value={products}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="p-datatable-striped"
        >
          <Column field="poId" header="PO ID"  />
          <Column field="indentId" header="Indent ID"  />
          <Column field="site" header="Site"  />
          <Column field="vendor" header="Vendor" />
          <Column field="createdOn" header="Created On"  />
          <Column field="createdBy" header="Created By"  />
          <Column field="deliveryDate" header="Expected Delivery Date"  />
        </DataTable>
      </div>
    </StocksLayout>
  );
};

export default PurchaseOrders;

export async function getServerSideProps(context) {
  const { currentOrganizationId, siteId, token } = nookies.get(context);
  let poData = null;
  try {
    const response = await axios.get(
      `${config.API_URL}/allpurchaseOrder/get?organization=${currentOrganizationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    poData = response.data?.data || [];
    console.log(response.data?.data, "Response Data");
  } catch (err) {
    console.error("Error fetching purchase orders:", err);
  }

  return {
    props: {
      poData,
    },
  };
}
