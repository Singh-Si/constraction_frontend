import AllMember from '@/components/member/all-members';
import Indent from '@/pages/sites/material/indent';
import Inventory from '@/pages/sites/material/inventory';
import Postorders from '@/pages/sites/material/grn';
import PurchaseOrder from '@/pages/sites/material/purchase-order';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';

const Material = () => {

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb('Material', '/sites/material')
  }, [])

  const {siteId} = parseCookies();

  return (
    <>
    <div className='row p-2 bg-light-blue mb-3'>
      <span className='fw-bold'>Materials</span>
    </div>

    </>
  )
}

export default Material