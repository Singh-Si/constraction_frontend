import axios from "axios";
import nookies, { parseCookies } from "nookies";

export default async function CheckPermissions(context, plan, feature) {
    let token, currentOrganizationId;

    if (context) {
        const cookies = nookies.get(context);
        token = cookies.token;
        currentOrganizationId = cookies.currentOrganizationId;
    } else {
        const cookies = parseCookies();
        token = cookies.token;
        currentOrganizationId = cookies.currentOrganizationId;
    }

    try {
        const [userPlanResponse, userPermissionsResponse] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/plan/user?organization=${currentOrganizationId}&plan=${plan}`, { headers: { "Authorization": `Bearer ${token}` } }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/permission/user?organization=${currentOrganizationId}&key=${feature}`, { headers: { "Authorization": `Bearer ${token}` } })
        ]);

        const userPlan = userPlanResponse?.data;
        const userPermissions = userPermissionsResponse?.data;

        if (userPlan?.success && userPlan?.plan) {
            if (userPermissions?.success && userPermissions?.permission) {
                return {
                    success: true,
                    permission: userPermissions.permission,
                    error: ""
                };
            } else {
                return {
                    success: false,
                    permissions: { read: false, update: false, insert: false, delete: false },
                    error: "You don't have this feature in your organization."
                };
            }
        } else {
            return {
                success: false,
                permissions: { read: false, update: false, insert: false, delete: false },
                error: "You don't have this feature in your subscription plan."
            };
        }
    } catch (error) {
        return {
            success: false,
            permissions: { read: false, update: false, insert: false, delete: false },
            error: error.message || "An error occurred while fetching data."
        };
    }
}