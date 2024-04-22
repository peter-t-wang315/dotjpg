import { withSessionRoute } from "@/lib/config/withSession";

const VALID_EMAIL = "grant.erickson115@yahoo.com";
const VALID_PASSWORD = "password123";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  console.log(req.method);
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      req.session.user = {
        username: "grant.erickson115@yahoo.com",
        isAdmin: true,
      };
      await req.session.save();
      res.send({ ok: true });
    }
    return res.status(403).send("");
  }
  return res.status(404).send("");
}
