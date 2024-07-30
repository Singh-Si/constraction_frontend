import { getSiteAsync } from '@/store/createSite/GetSites';
import { fetchmemberBySite } from '@/store/member/memberbysites';
import Image from 'next/image';
import Link from 'next/link';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MemberBySite = () => {
  const [sites, setSites] = useState([]);
  const [sitemembers, setSiteMembers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchdata() {
      const sitesData = await dispatch(getSiteAsync());
      setSites(sitesData?.payload?.sites)
    }
    fetchdata();
    const { currentSiteId } = parseCookies();

    if (!currentSiteId && sites.length > 0) {
      setCookie(null, 'currentSiteId', sites[0]._id, {
        maxAge: 24 * 60 * 60,
        path: '/',
      });
    }

  }, [dispatch, refresh])
  const { currentSiteId } = parseCookies();

  const handleChangeSites = (event) => {
    destroyCookie(null, 'currentSiteId')
    setCookie(null, 'currentSiteId', event.target.value, {
      maxAge: 24 * 60 * 60,
      path: '/',
    });
    setRefresh(!refresh);
  }
  useEffect(() => {
    async function fetchMembers() {

      const response = await dispatch(fetchmemberBySite());
      setSiteMembers(response?.payload?.siteMembers)
    }
    fetchMembers()

  }, [sites])

  return (
    <div>
      {sites ?
        <>
          <div className=" w-25 rounded">
            <div className="d-flex">

              <select className="form-select" aria-label="Default select example" onChange={handleChangeSites} value={currentSiteId} >
                {sites && sites?.map((item, index) =>
                  <option key={index} value={item?._id}>{item?.name}</option>
                )}
              </select>

            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <ul className="mt-4 list-group shadow-sm w-75 m-auto small">
                <li className="list-group-item p-3 text-white fw-bolder bg-blue" >
                  <div className='row'>
                    <div className='col'>Members</div>
                    <div className='col'>Assigned Members</div>
                    <div className='col'>Role</div>
                    {/* <div className='col'>Project</div> */}
                    {/* <div className='col'> Delete</div> */}
                  </div>
                </li>
                {
                  sitemembers ?
                    <>
                      {sitemembers?.map((member, index) => {
                        const nameParts = member?.member?.user?.name.split(' ');
                        const firstNameInitial = nameParts[0] ? nameParts[0].charAt(0) : '';
                        const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '';
                        return (
                          <li key={index} className="list-group-item ">
                            <div href="/member" className='text-decoration-none text-black'>
                              <div className='row gap-5'>
                                <div className='col d-flex align-items-center px-2 m-0 gap-3 ' >
                                  <div className=" profile-logo d-flex justify-content-center align-items-center bg-danger shadow border border-3">
                                    <h2 className="text-white mt-3">{firstNameInitial}{lastNameInitial}</h2>
                                  </div>
                                  <div>
                                    <span className='bold'>{member?.member?.user?.name}</span><br />
                                    <span>{member?.member?.user?.email?.address}</span><br />
                                    <span>{member?.member?.user?.phone?.number}</span>
                                  </div>

                                  {/* <div><span>{member?.user?.phone}</span></div> */}
                                </div>
                                <div className='col d-flex justify-content-start align-items-center ' >

                                  <small className='w-100'>{(member?.inviteAccepted) ?
                                    <span className='fw-bold text-success fs-6'><i className="bi bi-shield-check fs-5"></i> Assigned</span> :
                                    <>
                                      <span className='fw-bolder  fs-6 text-dark-gray'><Image src="/assets/images/pending.png" width={28} height={25} className='text-success fs-xl'></Image> Assigned</span><br />
                                      {/* <span><Link href='#' className='fw-bolder text-info mt-1'>Resend Invitation</Link></span> */}
                                    </>
                                  }</small>

                                  {/* <p className='mb-0'>{permission.createdAt}</p> */}
                                  {/* <p className='mb-0'>{moment(member.createdAt).format('MMMM Do YYYY')}</p> */}

                                </div>
                                <div className='col d-flex justify-content-start align-items-center'>
                                  <span className='form-control'>{member?.member?.permission?.name}</span></div>
                                {/* <div className='col small' style={verticalAlign}><i className='bi bi-trash '></i> </div> */}




                              </div>
                            </div>
                          </li>
                        )
                      })
                      }
                    </> :
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "60vh" }}>There are No Permissions</div>
                }
              </ul>
            </div>
          </div>
        </>
        :
        <div><span>No sites Found</span></div>
      }
    </div>
  )
}

export default MemberBySite