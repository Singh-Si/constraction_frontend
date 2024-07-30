// pages/issues.js
import React from 'react';
import IssueLayout from '@/layouts/IssueLayout';
import IssuesTable from '@/components/IssuesTable';

const Issues = () => {
  return (
    <IssueLayout>
      <IssuesTable />
    </IssueLayout>
  );
};

export default Issues;
