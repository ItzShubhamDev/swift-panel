"use server";

const secret = process.env.TOKEN;

export async function getFiles(serverUuid: string, path?: string) {
  if (!secret) {
    throw new Error("Token secret not found");
  }
  const r = await fetch(
    `http://localhost:8080/api/servers/${serverUuid}/files/list-directory?directory=${encodeURIComponent(
      path as string
    )}`,
    {
      method: "GEt",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${secret}`,
      },
    }
  );
  const data = await r.json();
  return data;
}

export async function getFile(serverUuid: string, path: string) {
  if (!secret) {
    throw new Error("Token secret not found");
  }
  const r = await fetch(
    `http://localhost:8080/api/servers/${serverUuid}/files/contents?file=${encodeURIComponent(
      path
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
    }
  );
  const data = await r.text();
  return data;
}

export async function createNewFolder(
  serverUuid: string,
  path: string,
  name: string
) {
  if (!secret) {
    throw new Error("Token secret not found");
  }
  const r = await fetch(
    `http://localhost:8080/api/servers/${serverUuid}/files/create-directory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        name,
        path,
      }),
    }
  );
  if (!r.ok) {
    console.error(r.statusText);
    return { error: r.statusText };
  }
  return { success: true };
}
