"use client";

import { useEffect, useState } from "react";

export default function LeadTransfer() {
  const [context] = useState({
    context:
      "eyJleGFtcGxlIjp0cnVlLCJkZWJ1Z1N0YXRlIjoid29ya2luZyIsImNvbnRleHQiOiJwZXJzb24iLCJhY2NvdW50Ijp7ImlkIjoxMjM0NTY3ODksImRvbWFpbiI6ImV4YW1wbGUiLCJvd25lciI6eyJuYW1lIjoiVG9tIE1pbmNoIiwiZW1haWwiOiJ0b20ubWluY2hAZXhhbXBsZS5jb20ifX0sInBlcnNvbiI6eyJpZCI6MTIzLCJmaXJzdE5hbWUiOiJNZWxpc3NhIiwibGFzdE5hbWUiOiJIYXJ0bWFuIiwiZW1haWxzIjpbeyJ2YWx1ZSI6Im0uaGFydG1hbkBleGFtcGxlLmNvbSIsInR5cGUiOiJob21lIiwic3RhdHVzIjoiTm90IFZhbGlkYXRlZCIsImlzUHJpbWFyeSI6MX1dLCJwaG9uZXMiOlt7InZhbHVlIjoiKDg4OCkgNTU1LTEyMzQiLCJub3JtYWxpemVkIjoiODg4NTU1MTIzNCIsInR5cGUiOiJtb2JpbGUiLCJzdGF0dXMiOiJOb3QgVmFsaWRhdGVkIiwiaXNQcmltYXJ5IjoxfV0sInN0YWdlIjp7ImlkIjoxMiwibmFtZSI6IkFjdGl2ZSBDbGllbnQifX0sInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiai5kb2VAZXhhbXBsZS5jb20ifX0",
    signature:
      "640db5d71f9b56c9c367f4c1771e3ddf521ee902eaf6a06b8779e2869a53ecf7",
    personId: "1",
  });
  const [lead, setLead] = useState(null);

  useEffect(() => {
    if (context?.personId && context?.signature) {
      fetch(`/api/fetch-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: context.context,
          signature: context.signature,
          personId: context.personId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setLead(data))
        .catch(console.error);
    }
  }, [context]);

  const handleSendToCompany2 = async () => {
    if (!lead) return;
    const res = await fetch("/api/send-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead }),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="p-5">
      <h1>Lead Transfer</h1>
      {lead ? (
        <div>
          <pre>{JSON.stringify(lead, null, 2)}</pre>
          <button onClick={handleSendToCompany2} className="mt-2">
            Send Lead to Company 2
          </button>
        </div>
      ) : (
        <p>Loading lead...</p>
      )}
    </div>
  );
}
