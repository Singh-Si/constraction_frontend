import Link from "next/link";
import { parseCookies } from "nookies";

export default function MaterialLayout({ children, current }) {
    const {siteId}  = parseCookies()
    return (
        <div>
            {/* <div className='row p-2 bg-light-blue mb-3'>
                <span className='fw-bold'>Materials</span>
            </div> */}
            <div>
                <ul className="nav nav-tabs mb-4 d-flex justify-content-between" id="myTab" role="tablist">
                    <div className='d-flex'>
                        {/* <Link href={`/sites/material/inventory?siteId=${siteId}`} className="nav-item text-decoration-none" role="presentation">
                            <button className={`nav-link ${current == "inventory" ? "active" : ""}`} id="home-tab" data-bs-toggle="tab" data-bs-target="#inventary-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Inventory</button>
                        </Link> */}
                        <Link href={`/sites/material/indent?siteId=${siteId}`} className="nav-item text-decoration-none" role="presentation">
                            <button className={`nav-link ${current == "indent" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#indent-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Indent </button>
                        </Link>
                        <Link href={`/sites/material/purchase-order?siteId=${siteId}`} className="nav-item text-decoration-none" role="presentation">
                            <button className={`nav-link ${current == "purchase" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#purchase-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Purchase Orders </button>
                        </Link>
                        <Link href={`/sites/material/grn?siteId=${siteId}`} className="nav-item text-decoration-none" role="presentation">
                            <button className={`nav-link ${current == "grn" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#grn-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">GRN </button>
                        </Link>
                    </div>
                </ul>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
