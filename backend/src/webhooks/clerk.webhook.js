import express from "express";;
import User from "../models/user.model";
import {verifyWebhook} from "@clerk/backend/webhooks";

const router = express.Router();

router.post("/", async(req, res)=>{
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if(!signingSecret){
        res.status(503).json({
            message:"Webhook Secret is not provided"})
            return;
    }

    const payload = Buffer.isBuffer(req.body)? req.body.toString("utf8") : String(req.body);
    const request = new Request("http://internal/webhooks/clerk", {
        method:"POST",
        headers: new Headers(req.headers),
        body:payload
    });

    const evt = await verifyWebhook(request, {signingSecret});

    if(evt.type==="user.created" || evt.type === "user.updated"){
        
        const u = evt.data;

        const email = 
        u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ??
        u.email_addresses?.[0]?.email_address;

    }

})


export default router;


