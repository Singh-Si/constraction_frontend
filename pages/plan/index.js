import nookies from "nookies";
import config from '@/config/config'
import axios from "axios";
import CheckPermissions from "@/components/utils/checkPermissions";

const plan = ({ plan }) => {
    const remove = ["title", "sub-title", "description", "_id", "price", "isTrial"];
    const planKeys = Object.keys(plan);

    const planObject = planKeys.filter(item => !remove.includes(item));

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col">
                <div className="card rounded-3 shadow-xl">
                    <div className="card-body">
                        <div className="mb-3">
                            <div>
                                <h2 className="fw-bolder">{plan.title}</h2>
                                <h4 className="fw-bolder">{plan["sub-title"]}</h4>
                                <p>{plan.description}.</p>
                            </div>
                            <hr className="my-3" />
                            <div>
                                <h3 className="fw-bolder">₹{plan.price} <sub>/ {plan.isTrial ? "Trial" : "Year"}</sub></h3>
                                <h5 className="fw-bolder">+ GST @18%</h5>
                            </div>
                            <div className="mt-4">
                                {
                                    planObject.map((key, index) => {
                                        return (
                                            <p key={index}>
                                                {plan[key] ? <i className="bi bi-check text-success"></i> : <i className="bi bi-x text-danger"></i>}
                                                &nbsp;
                                                <span className="capitalize">{key.replaceAll("_", " ")}</span>
                                                {
                                                    typeof plan[key] != "boolean" ? " : " + plan[key] : ""
                                                }
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="mt-3 d-grid">
                            <button className="btn btn-primary opacity-50" disabled={true}>Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default plan;

export async function getServerSideProps(context) {
    const { token, currentOrganizationId } = nookies.get(context);
    const response = await axios.get(`https://construction-backend.onrender.com/plan`,
        {
            params: { organization: currentOrganizationId },
            headers: { "Authorization": `Bearer ${token}` }
        }
    )

    const permission = await CheckPermissions(context, "admin_settings", "organization-plans");

    if (!permission.success) {
        return {
            redirect: {
                destination: "/AccessDeniedPage"
            }
        }
    }

    return {
        props: {
            plan: response?.data?.plan?.subscription,
            permission: permission.permission
        }
    }
}