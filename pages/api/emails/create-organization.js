
import CreateOrganisationEmail from "@/emails/CretaeOrganisation";
import { render } from "@react-email/render";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { name, email, phone } = req.body;

            const emailRoute = `https://construction-backend.onrender.com/email`;
            const response = await fetch(emailRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer PUBLIC_API_TOKEN}`
                },
                body: JSON.stringify({
                    email: email,
                    subject: "Congrats on Create Organization",
                    content: render(<CreateOrganisationEmail name={name} email={email} phone={phone} />)
                })
            });

            const data = response.json();

            return res.json({ success: data.success, error: data.error, message: data.message });
        }
        catch (error) {
            return res.json({ success: false, error: "Email Sending error: " + error });
        }
    }
    else {
        return res.json({ error: `Request ${req.method} method not supported.` });
    }
}