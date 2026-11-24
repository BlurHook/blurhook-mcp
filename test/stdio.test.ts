/**
 * Spawns the built server over stdio (run `pnpm build` first) and checks the protocol stream is clean: stdout carries
 * only JSON-RPC, logs go to stderr.
 */
import { existsSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { describe, expect, it } from "vitest";

import { version } from "../package.json";

const entry = new URL("../dist/index.js", import.meta.url).pathname;

describe.skipIf(!existsSync(entry))("stdio", () => {
  it("lists tools over stdio and logs to stderr only", async () => {
    const transport = new StdioClientTransport({ command: process.execPath, args: [entry], stderr: "pipe" });
    let stderr = "";
    transport.stderr?.on("data", (d: Buffer) => (stderr += d.toString()));
    const client = new Client({ name: "stdio-test", version: "0.0.0" });
    await client.connect(transport);
    expect(client.getServerVersion()).toEqual({ name: "opalhook-mcp", version });
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(10);
    expect(tools.map(tool => tool.name)).toEqual(expect.arrayContaining(["opalhook_deployment", "blurhook_deployment"]));
    await client.close();
    expect(stderr).toContain("[opalhook-mcp]");
    expect(stderr).toContain(`v${version} ready`);
  });
});
