import { NextResponse } from "next/server";
import crypto from "crypto";

function isFromFollowUpBoss(context: string, signature: string) {
  const calculated = crypto
    .createHmac("sha256", process.env.FUB_EMBEDDED_APP_SECRET!)
    .update(context)
    .digest("hex");
  return calculated === signature;
}

export async function POST(req: Request) {
  const { context, signature, personId } = await req.json();
  if (!isFromFollowUpBoss(context, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const res = await fetch(`https://api.followupboss.com/v1/people`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.FUB_COMPANY1_API_KEY + ":"
      ).toString("base64")}`,
    },
  });
  console.log(res);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
