import Link from "next/link";
import { parseCookies } from "nookies";
import React from "react";

const StocksLayout = ({ children, current }) => {
  console.log("Children:", children); // Log children to check their content

  const { siteId } = parseCookies();
  const childElements = React.Children.toArray(children);

  return (
    <div>
      <div>
        <div>
          <ul
            className="nav nav-tabs mb-4 d-flex justify-content-between"
            id="myTab"
            role="tablist"
          >
            <div className="d-flex">
              {/* <Link href={`/stock/bom`} className="nav-item text-decoration-none" role="presentation">
                                <button className={`nav-link ${current == "bom" ? "active" : ""}`} id="home-tab" data-bs-toggle="tab" data-bs-target="#inventary-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">BOM</button>
                            </Link> */}

              <Link
                href={`/stock/inventory`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "inventory" ? "active" : ""
                  }`}
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inventary-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Inventory{" "}
                </button>
              </Link>

              <Link
                href={`/stock/indents?siteId=${siteId}`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${current == "indents" ? "active" : ""}`}
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inventary-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Indents{" "}
                </button>
              </Link>
              <Link
                href={`/stock/purchaseOrders`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "purchaseorders" ? "active" : ""
                  }`}
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inventary-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Purchase Orders{" "}
                </button>
              </Link>
              <Link
                href={`/stock/upcoming-deliveries`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "upcomingdeliveries" ? "active" : ""
                  }`}
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inventary-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Upcoming Deliveries{" "}
                </button>
              </Link>
              {/* <Link
                href={`/stock/site-transfer`}
                className="nav-item text-decoration-none"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "site-transfer" ? "active" : ""
                  }`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#indent-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Site Transfer{" "}
                </button>
              </Link> */}

              <Link
                href={`/stock/grn`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${current == "grn" ? "active" : ""}`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#grn-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  GRN{" "}
                </button>
              </Link>
              <Link
                href={`/stock/material-new-issue`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "material-new" ? "active" : ""
                  }`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#purchase-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Material Issues{" "}
                </button>
              </Link>
              <Link
                href={`/stock/material-issue`}
                className="nav-item text-decoration-none stock-nav"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "material" ? "active" : ""
                  }`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#purchase-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Quality Issues{" "}
                </button>
              </Link>
              {/* <Link
                href={`/stock/boq`}
                className="nav-item text-decoration-none"
                role="presentation"
              >
                <button
                  className={`nav-link ${current == "boq" ? "active" : ""}`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#grn-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  BOQ{" "}
                </button>
              </Link> */}
              {/* <Link
                href={`/stock/site-transfer`}
                className="nav-item text-decoration-none"
                role="presentation"
              >
                <button
                  className={`nav-link ${
                    current == "site-transfer" ? "active" : ""
                  }`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#indent-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Site Transfers{" "}
                </button>
              </Link> */}
            </div>
          </ul>
        </div>
        <div>
          {Array.isArray(childElements) && childElements.length > 0
            ? childElements.map((child, index) => (
                <div key={index}>
                  {React.isValidElement(child) ? child : null}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default StocksLayout;
