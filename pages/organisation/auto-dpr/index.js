import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Autodpr = () => {
  return (
    <div className='row'>

      <Link href={`/organisation/auto-dpr/${1}`} className='text-decoration-none'>
        <div className='col-1 cursor-pointer' >
          <Image src="/assets/images/cards_dummy_image.png" className="p-2 shadow-lg rounded-3 border bg-info" width={100} height={100} />
          <div className='text-center'><span className='text-black text-center'>Site-001</span></div>
        </div>
      </Link>


    </div>
  )
}

export default Autodpr