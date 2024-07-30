// layouts/IssueLayout.js
import React from 'react';
import BackIcon from "@/components/utils/global/BackIcon";

const IssueLayout = ({ children }) => {
  return (
    <div>
      <div className='row bg-light-blue d-flex justify-content-end'>
        <span className='text-blue fw-bold p-2'><BackIcon/> Site Issues </span>
      </div>
      <div className='row-sm d-flex justify-content-end gap-2 mt-4'>
      </div>
      <div className='row-sm'>
        {children}
      </div>
    </div>
  );
};

export default IssueLayout;
