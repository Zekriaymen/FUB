import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { leadId } = await req.json();

  const fetchRes = await fetch(
    `https://api.followupboss.com/v1/people/${leadId}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.FUB_COMPANY1_API_KEY + ":"
        ).toString("base64")}`,
      },
    }
  );
  if (!fetchRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch lead to transfer" },
      { status: fetchRes.status }
    );
  }
  const lead = await fetchRes.json();

  const eventSource = "FakeSourceName";
  const eventSystem = "FakeSystemName";
  const eventType = "Registration";
  const eventMessage = "Fake inquiry message from user";

  const body = JSON.stringify({
    source: eventSource,
    system: eventSystem,
    type: eventType,
    message: eventMessage,
    person: {
      firstName: lead.firstName + "copy",
      lastName: lead.lastName + "copy",
      emails: lead.emails.map((el) => {
        {
          return {
            ...el,
            value: "copy" + el.value,
          };
        }
      }),
      phones: lead.phones,
      stage: lead.stage,
      addresses: lead.addresses,
      //to check
      picture: lead.picture,
      socialData: lead.socialData,
      tags: lead.tags,
      source: lead.source,
      customValues: lead.customValues,
    },
  });
  console.log(body);
  const res = await fetch("https://api.followupboss.com/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        process.env.FUB_COMPANY2_API_KEY + ":"
      ).toString("base64")}`,
    },
    body,
  });

  // const res = await fetch("https://api.followupboss.com/v1/people", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Basic ${Buffer.from(
  //       process.env.FUB_COMPANY2_API_KEY + ":"
  //     ).toString("base64")}`,
  //   },
  //   body: JSON.stringify({
  //     firstName: lead.firstName,
  //     lastName: lead.lastName,
  //     emails: lead.emails,
  //     phones: lead.phones,
  //     stage: lead.stage,
  //     tags: lead.tags,
  //     source: lead.source,
  //     customValues: lead.customValues,
  //   }),
  // });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to send lead event" },
      { status: res.status }
    );
  }

  return NextResponse.json({
    message: "Lead event successfully sent to Company 2",
  });
}
