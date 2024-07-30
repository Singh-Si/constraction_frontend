import GanttView from '@/components/sites/siteplan/GanttView'
import TaskView from '@/components/sites/siteplan/TaskView'
import FilterTask from '@/components/utils/Modal/Filtertask'
import AddTask from '@/components/utils/Modal/AddTask'
import CheckPermissions from '@/components/utils/checkPermissions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasksAsync } from '@/store/taskslice/TaskSlice'
import { useEffect, useState } from 'react'
import SearchInput from '@/components/utils/SearchInput'

const Siteplan = ({ userpermission }) => {
    const [searchInput, setSearchInput] = useState("");
    const { userData, status } = useSelector((state) => state?.TaskSlice);
    const dispatch = useDispatch();

    const filteredTasksData = userData && userData?.filter(
        (item) =>
            item &&
            item?.taskName &&
            item?.taskName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

    const onChange = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    return (
        <>
            <div className="row"
                style={{
                    background: "white", top: 58, padding: 14,
                    position: "sticky",
                    zIndex: 200
                }}
            >
                <div className="d-flex col-4 gap-4 align-items-start">
                    <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button className="nav-link active bg-btn-bg" id="home-tab" data-bs-toggle="pill" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Task View</button>
                        {/* <button className="nav-link bg-btn-bg" id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">+ Gantt</button> */}
                    </div>
                </div>
                <div className="col-4">
                    {/* <input className=" form-control" placeholder="Search Task" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} /> */}
                    <SearchInput className=" form-control" placeholder={"Search Task"} onChange={onChange} value={searchInput} />
                </div>

                <div className="col-4 mt-1 text-end">
                    {/* <button className=' text-black new-site-btn border border-1 border-black' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i className="bi bi-list-task"></i>    Task Filter</button> */}
                    {userpermission?.insert && <button className='btn bg-btn-bg text-white new-site-btn shadow' type="button" data-bs-toggle="offcanvas" data-bs-target="#taskoffcanvasRight" aria-controls="offcanvasRight">+ Add Task</button>}
                </div>
            </div>

            <div className="tab-content" id="myTabContent">
                {/* <div className="tab-pane fade " id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" ><GanttView /></div> */}
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" ><TaskView userpermission={userpermission} userData={filteredTasksData} status={status} /></div>
            </div>
            <AddTask />
            <FilterTask />
        </>
    )
}

export default Siteplan;

export async function getServerSideProps(context) {
    let userpermission;
    const permission = await CheckPermissions(
        context,
        "project_management",
        "tasks"
    );

    userpermission = permission?.permission;
    return {
        props: {
            userpermission: userpermission || null,
        },
    };
}