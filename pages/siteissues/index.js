// pages/issues.js
import React, { useState } from 'react';
import SiteIssueLayout from '@/layouts/SiteIssueLayout';
import SiteIssueTable from '@/components/SiteIssueTable';
import AddSiteIssue from '@/components/utils/Modal/AddSiteIssue';
import ResolvedSiteIssueTable from '@/components/ResolvedSiteIssueTable';

const SiteIssues = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSiteTablePending, setShowSiteTablePending] = useState(true);
  const [showSiteTableResolved, setShowSiteTableResolved] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalpending = () => {
    setShowSiteTablePending(true);
    setShowSiteTableResolved(false); // Ensure resolved table is hidden
  };

  const handleOpenModalresolved = () => {
    setShowSiteTableResolved(true);
    setShowSiteTablePending(false); // Ensure pending table is hidden
  };

  return (
    <SiteIssueLayout>
      <div className="row">
        <div className="col-3 py-3">
          <button
            className="btn btn-danger text-white new-site-btn"
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
            onClick={handleOpenModalpending}
          >
            Pending Issues
          </button>
        </div>

        <div className="col-4 py-3">
          <button
            className="btn btn-success text-white new-site-btn"
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
            onClick={handleOpenModalresolved}
          >
            Resolved Issues
          </button>
        </div>

        <div className="col-4 py-3 text-end">
          <button
            className='btn bg-btn-bg text-white new-site-btn'
            style={{ boxShadow: "2px 2px 13px #8CBCD9" }}
            type="button"
            onClick={handleOpenModal}
          >
            + Add Issue
          </button>
        </div>
      </div>

      {showModal && <AddSiteIssue showModal={showModal} handleClose={handleCloseModal} />}

      {showSiteTablePending && <SiteIssueTable />}

      {showSiteTableResolved && <ResolvedSiteIssueTable />}

    </SiteIssueLayout>
  );
};

export default SiteIssues;
