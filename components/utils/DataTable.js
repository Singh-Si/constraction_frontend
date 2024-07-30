import { DataTable as Table } from "primereact/datatable";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MultiSelect } from "primereact/multiselect";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

export default function DataTable(props) {
    const router = useRouter();

    const [selectedItems, setSelectedItems] = useState(null);
    const [records, setRecords] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(props.columns);
    const [entries, setEntries] = useState(10);
    const [deleteId, setDeleteId] = useState("");
    const [error, setError] = useState("");

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = props.columns.filter((col) => selectedColumns.some((sCol) => scol?.field === col?.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    const textEditor = (data) => {
        return <InputText type="text" value={data.value} onChange={(e) => data.editorCallback(e.target.value)} />;
    };

    const selectEditor = (data, options) => {
        return <Dropdown value={data.value} options={options} onChange={(e) => data.editorCallback(e.value)} placeholder="-- Select a option --" />
    };

    const onRowEditComplete = (e) => {
        let _records = [...records];
        let { newData, index } = e;
        _records[index] = newData;
        setRecords(_records);
    };

    function DeleteButtons(rowData) {
        return <Button icon="ti ti-trash" rounded text severity="secondary" data-bs-toggle="modal" data-bs-target="#DeleteModel" onClick={() => setDeleteId(rowData._id)} />
    }

    function Refresh() {
        router.reload();
    }

    function DeleteSingleRecord() {
        if (deleteId) {

        }
        else {
            setError("Please Try Again...")
        }
    }

    useEffect(() => {
        const FetchRecords = async (api) => {
            const response = await fetch(api);
            const records = await response.json();
            setRecords(records);
        }
        FetchRecords(props.records);
    }, [props.records])

    return (
        <Fragment>
            <div className="row row-cols-1 gy-4 mb-4">
                <div className="col">
                    <div className="row  ">
                        <div className="col ">
                            {/* <div className="w-50 btn-group text-end  gap-3">
                                <button type="button" className="border-info border-2 text-info m-auto w-25 bg-white rounded  py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Export Excel</button>

                                <button type="button" className="border-info border-2 text-info m-auto w-25 bg-white rounded  py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> +Inventary </button>

                                
                            </div> */}
                        </div>
                        <div className="col text-end">
                            <div className="btn-group w-50 text-end">

                                <div className="w-100 btn-group text-end  gap-3">
                                    <button type="button" className="border-info border-2 text-info m-auto w-50 bg-white rounded  py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> Export Excel</button>

                                    <button type="button" className="border-info border-2 text-info m-auto w-50 bg-white rounded  py-1 btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl"><i className="bi bi-file-earmark-excel"></i> +Inventary </button>

                                    {/* <button className="btn btn-primary btn-sm">
                                    <span className="me-2 d-none d-lg-inline">Print</span>
                                    <i className="ti ti-printer"></i>
                                </button> */}
                                </div>
                                {/* {props.create && <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target={`#${props.tableName}`}>
                                    <i className="ti ti-plus"></i>
                                    <span className="ms-2 d-none d-lg-inline">New</span>
                                </button>}
                                {props.delete && <button className="btn btn-danger btn-sm">
                                    <i className="ti ti-trash"></i>
                                    <span className="ms-2 d-none d-lg-inline">Delete</span>
                                </button>} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-md-flex align-items-center justify-content-between">
                        {/* <div className="d-flex align-items-center mb-4 mb-md-0">
                            <span className="me-1">Show</span>
                            <select className="form-select form-select-sm" onChange={(e) => setEntries(e.target.value)}>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            <span className="ms-1">entries</span>
                        </div> */}
                        {/* <div className="d-flex align-items-center justify-content-end">
                            <MultiSelect value={visibleColumns} options={props.columns} optionLabel="header" filter onChange={onColumnToggle} className="w-full sm:w-20rem" placeholder="Select fields" />
                            <div className="position-relative ms-2">
                                <input className="form-control form-control-sm ps-5" type="search" placeholder="Search for specific record..." />
                                <span className="ps-2 position-absolute top-50 start-0 translate-middle-y">
                                    <i className="ti ti-search ps-2 small text-muted"></i>
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <Table
                value={records} size="small" removableSort resizableColumns
                paginator rows={entries} rowsPerPageOptions={[entries, entries * 2, entries * 3]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)}
                reorderableColumns reorderableRows onRowReorder={(e) => setRecords(e.value)}
                editMode="cell" onRowEditComplete={onRowEditComplete}
                emptyMessage={`No ${props.tableName} found.`}
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3.5rem" }}></Column>
                {props.rowReorder && <Column rowReorder field="#" header="#" style={{ width: "3rem" }} />}
                {visibleColumns.map((col, i) => {
                    let edit = textEditor;
                    if (col?.edit === "select") edit = selectEditor;

                    return <Column
                        key={i} sortable={col?.sortable} field={col?.field} header={col?.header}
                        filter={col?.filter} filterPlaceholder={`Search by ${col?.header}`}
                        editor={(options) => edit(options, col?.options)}
                    >
                    </Column>
                })}
                {/* {props.update && <Column rowEditor field="edit" header="Edit" style={{ width: "7.5%" }}></Column>}
                {props.delete && <Column field="delete" header="Delete" style={{ width: "7.5%" }} body={DeleteButtons} />} */}
            </Table>
            <div id="DeleteModel" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="DeleteTitle" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="mb-5">
                                <h5>Are you sure?</h5>
                            </div>
                            <div className="text-end">
                                <button type="button" className="btn btn-danger btn-sm me-2" onClick={DeleteSingleRecord}>Delete</button>
                                <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal" aria-label="Close" onClick={() => setDeleteId("")}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {props.create && <div id={`${props.tableName}`} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby={`${props.tableName}Title`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header pb-3">
                            <h5 className="modal-title" id={`${props.tableName}Title`}>Add {props.tableName}</h5>
                            <button type="button" className="btn-close me-0" data-bs-dismiss="modal" aria-label="Close" onClick={Refresh}></button>
                        </div>
                        <div className="modal-body pt-3">
                            {props.create}
                        </div>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )
}