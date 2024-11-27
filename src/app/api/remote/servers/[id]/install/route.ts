import { NextRequest, NextResponse } from "next/server";

const res = {
  container_image: "ghcr.io/pterodactyl/installers:alpine",
  entrypoint: "ash",
  script:
    '#!/bin/ash\r\n# Bungeecord Installation Script\r\n#\r\n# Server Files: /mnt/server\r\n\r\ncd /mnt/server\r\n\r\nif [ -z "${BUNGEE_VERSION}" ] || [ "${BUNGEE_VERSION}" == "latest" ]; then\r\n    BUNGEE_VERSION="lastStableBuild"\r\nfi\r\n\r\ncurl -o ${SERVER_JARFILE} https://ci.md-5.net/job/BungeeCord/${BUNGEE_VERSION}/artifact/bootstrap/target/BungeeCord.jar',
};

export async function GET(req: NextRequest) {
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  return new Response(null, { status: 204 });
}
