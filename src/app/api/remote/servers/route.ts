import { NextRequest, NextResponse } from "next/server";

const res = {
  data: [
    {
      uuid: "4a7b9654-edde-416c-a3fc-dec58199f203",
      settings: {
        uuid: "4a7b9654-edde-416c-a3fc-dec58199f203",
        meta: {
          name: "Test",
          description: "",
        },
        suspended: false,
        environment: {
          BUNGEE_VERSION: "latest",
          SERVER_JARFILE: "bungeecord.jar",
          STARTUP:
            "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}",
          P_SERVER_LOCATION: "1",
          P_SERVER_UUID: "4a7b9654-edde-416c-a3fc-dec58199f203",
          P_SERVER_ALLOCATION_LIMIT: 0,
        },
        invocation:
          "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}",
        skip_egg_scripts: false,
        build: {
          memory_limit: 1024,
          swap: 0,
          io_weight: 500,
          cpu_limit: 50,
          threads: null,
          disk_space: 5120,
          oom_disabled: true,
        },
        container: {
          image: "ghcr.io/pterodactyl/yolks:java_21",
          oom_disabled: true,
          requires_rebuild: false,
        },
        allocations: {
          force_outgoing_ip: false,
          default: {
            ip: "0.0.0.0",
            port: 25565,
          },
          mappings: {
            "0.0.0.0": [25565],
          },
        },
        mounts: [],
        egg: {
          id: "faa97559-140f-4184-be79-3d3b99bb81b1",
          file_denylist: [],
        },
      },
      process_configuration: {
        startup: {
          done: ["Listening on "],
          user_interaction: [],
          strip_ansi: false,
        },
        stop: {
          type: "command",
          value: "end",
        },
        configs: [
          {
            parser: "yaml",
            file: "config.yml",
            replace: [
              {
                match: "listeners[0].query_port",
                replace_with: "25565",
              },
              {
                match: "listeners[0].host",
                replace_with: "0.0.0.0:25565",
              },
              {
                match: "servers.*.address",
                if_value: "regex:^(127\\.0\\.0\\.1|localhost)(:\\d{1,5})?$",
                replace_with: "{{config.docker.network.interface}}$2",
              },
            ],
          },
        ],
      },
    },
  ],
  links: {
    first:
      "http://localhost:3000/api/remote/servers?page=1",
    last: "http://localhost:3000/api/remote/servers?page=1",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost:3000/api/remote/servers?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    path: "http://localhost:3000/api/remote/servers",
    per_page: 50,
    to: 1,
    total: 1,
  },
};

export async function GET(req: NextRequest) {
  return NextResponse.json(res);
}
