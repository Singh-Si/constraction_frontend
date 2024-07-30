import StocksLayout from "@/layouts/StocksLayout";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchAllIndentAsync } from "@/store/stock/indents";
import { useDispatch, useSelector } from "react-redux";
const Indents = () => {
  const dispatch = useDispatch();
  const indentsData = useSelector(
    (state) => state?.allIndentSlice?.userData?.data
  );
  console.log(indentsData, "indentsDataindentsData ");

  const [products, setProducts] = useState([
    {
      item: indentsData?.materialId?.[0].material,
      site: indentsData?.site?.name || "",
      createdOn: indentsData?.IssueDate?.split("T")[0] || "",
      deliveryDate: indentsData?.deliveryDate || "",
      createdBy: indentsData?.createdBy?.name || "",
      assinguser: indentsData?.assignUser?.[0].name,
      item: indentsData?.materialId?.[0].material,
    },
  ]);

  console.log(products?.item, "products?.item");

  useEffect(() => {
    dispatch(fetchAllIndentAsync());
  }, [dispatch]);

  useEffect(() => {
    if (indentsData) {
      setProducts([
        {
          item: "",
          site: "",
          createdOn: "",
          deliveryDate: "",
          createdBy: "",
          assinguser: "",
        },
      ]);
      console.log(indentsData,"hjhghghgh");
      const allIndents = indentsData.map((indent, index) =>
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            indentId: `MT-00${index + 1}`,
            site: indent?.site?.name || "",
            createdOn: indent?.IssueDate?.split("T")[0] || "" || "",
            deliveryDate: indent?.deliveryDate || "",
            createdBy: indent?.createdBy?.name || "",
            assinguser: indent?.assignUser?.[0].name,
            item: indent?.materialId?.[0].material?.materialName,
            // item: indentsData?.materialId?.[0].material,
          },
        ])
      );

    }
    console.log(products,"proooddduuctccc");
    
  }, [indentsData]);

  return (
    <StocksLayout current="indents">
      {products && products?.length > 0 && (
        <div className="card">
          <DataTable
            value={products}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            showGridlines
            stripedRows
          >
            <Column field="indentId" header="S.No"></Column>
            <Column field="site" header="Site" ></Column>
            <Column field="assinguser" header="Assign"></Column>
            <Column field="createdOn" header="Created on" ></Column>
            <Column field="createdBy" header="Created By"></Column>
            <Column field="deliveryDate" header="Expected Delivery"></Column>
            <Column field="item" header="Item"></Column>
            <Column field="quantity" header="PO Status"></Column>
            {/* <Column field="quantity" header="Remarks"></Column> */}
          </DataTable>
        </div>
      )}
    </StocksLayout >
  );
};

export default Indents;
