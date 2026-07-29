import express from "express";
import User from "../models/user.model.js";
import { verifyWebhook } from "@clerk/backend/webhooks";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("========== WEBHOOK RECEIVED ==========");

  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!signingSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SIGNING_SECRET");
    }

    const payload = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : String(req.body);

    const request = new Request("http://internal/webhooks/clerk", {
      method: "POST",
      headers: new Headers(req.headers),
      body: payload,
    });

    const evt = await verifyWebhook(request, { signingSecret });

    console.log("Event:", evt.type);

    const u = evt.data;

    console.log("User ID:", u.id);

    const email =
      u.email_addresses?.find(
        (e) => e.id === u.primary_email_address_id
      )?.email_address ?? u.email_addresses?.[0]?.email_address;

    console.log("Email:", email);

    const user = await User.findOneAndUpdate(
      { clerkId: u.id },
      {
        clerkId: u.id,
        email,
        fullName: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim(),
        profilePic: u.image_url,
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log("Saved:", user);

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("========== WEBHOOK ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      message: error.message,
    });
  }
});


export default router;