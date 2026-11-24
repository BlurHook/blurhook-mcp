# OpalHook MCP

An MCP server for Robinhood Chain trading agents. It provides quotes, policy-checked unsigned public-swap calldata, simulation, hook information, prices and OpalHook's deployed-contract directory. It never holds a key, signs or broadcasts.

Derived from the MIT-licensed ZeroHook MCP server. Original attribution and exact upstream revision are retained in LICENSE, NOTICE and UPSTREAM.json. OpalHook adds its own SDK integration, configuration/server identity and a read-only deployment-discovery tool.

## Install

Install [v0.1.3](https://github.com/opalhook/opalhook-mcp/releases/tag/v0.1.3) from GitHub in your project. Use Node 22.13 or newer.

```sh
npm install https://github.com/opalhook/opalhook-mcp/releases/download/v0.1.3/opalhook-mcp-0.1.3.tgz
```

The package name is `@opalhook/mcp`. The package is unpublished on the npm registry.

Set your MCP client’s stdio command to the absolute path to `node_modules/.bin/opalhook-mcp` in that project. Protocol JSON-RPC stays on stdout, and logs go to stderr.

## Build and connect

Node 22.13 or newer. The OpalHook SDK dependency is a pinned built GitHub release asset; no sibling checkout is needed.

```sh
git clone https://github.com/opalhook/opalhook-mcp.git opalhook-mcp
cd opalhook-mcp
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
npm start
```

When running from a source checkout, configure your MCP client to run `node /absolute/path/to/opalhook-mcp/dist/index.js` using stdio.

## Tools

- `quote`: routes and policy preview, without executable calldata.
- `build_swap`: policy checks, simulation and unsigned calldata; a separate wallet must review and sign.
- `simulate`: read-only call/gas estimate.
- `list_hook_pools`, `hook_passport`: indexed hook information.
- `token_price`, `stock_tokens`: public market data.
- `spending_policy`: current limits and ledger usage.
- `opalhook_deployment`: OpalHook privacy contracts and approval scope. It does not construct a private proof or activate spending.

## Policy and configuration

`OPALHOOK_POLICY_FILE` selects a policy JSON file; `OPALHOOK_POLICY` supplies inline policy JSON. `OPALHOOK_LEDGER_FILE` persists daily usage across restarts. Configure that file for durable limits: the default in-memory ledger resets when the process restarts. Do not commit your operational ledger.

`OPALHOOK_RPC_URLS` chooses read RPCs. `OPALHOOK_POOLS_FILE` adds pool definitions and `OPALHOOK_DISCOVER_BLOCKS` enables a bounded startup discovery scan. Default discovery is off. The original policy schema remains compatible with the app's exported policy.

Policy rules cover per-trade and daily USD limits, token allowlists, slippage, price impact, pinned contracts/hooks and simulation. The ledger counts returned calldata, not confirmed settlement. Local policy cannot stop a separate wallet/client from acting outside this server. See the source and tests for exact rules; no audit or transaction-success guarantee is made.

This server builds public swaps only. Private spending uses the OpalHook app, a local note vault and OpalHook operator-reviewed deposits. This is not 0xbow screening. The deployment directory is returned by `opalhook_deployment`; inspect addresses on the [Robinhood Chain explorer](https://robinhoodchain.blockscout.com/). Tests use mocked routing and an actual local stdio client; they execute no live swap.

## Compatibility

The first public release shipped on **28 October 2026** as `v0.1.0` under the BlurHook name. The OpalHook rebrand followed on **24 November 2026**. The [original v0.1.0 release](https://github.com/BlurHook/blurhook-mcp/releases/tag/v0.1.0) remains available for existing integrations. The [v0.1.1 release](https://github.com/BlurHook/blurhook-mcp/releases/tag/v0.1.1) also retains the `@blurhook/mcp` package name. The new tarball installs as `@opalhook/mcp`.

The `opalhook-mcp` and `blurhook-mcp` commands start the same server. `OPALHOOK_*` environment variables take precedence over matching `BLURHOOK_*` variables. Both `opalhook_deployment` and the legacy `blurhook_deployment` tool return the same deployed-contract directory. This release pins the `@opalhook/sdk` v0.1.2 GitHub tarball.
