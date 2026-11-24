# OpalHook MCP

> Formerly BlurHook. First public release: **28 October 2026** (`v0.1.0`).
> The OpalHook rebrand is dated **24 November 2026**. Existing repository URLs and
> `@blurhook/*` package identifiers remain in use for compatibility. Original
> commits, release tags and release assets are retained. The new API names below
> require v0.1.1 or a build from this source; the v0.1.0 tarballs stay unchanged.


An MCP server for Robinhood Chain trading agents. It provides quotes, policy-checked unsigned public-swap calldata, simulation, hook information, prices and OpalHook's deployed-contract directory. It never holds a key, signs or broadcasts.

Derived from the MIT-licensed ZeroHook MCP server. Original attribution and exact upstream revision are retained in LICENSE, NOTICE and UPSTREAM.json. OpalHook adds its own SDK integration, configuration/server identity and a read-only deployment-discovery tool.

## Build and connect

Node 22.13 or newer. The OpalHook SDK dependency is a pinned built GitHub release asset; no sibling checkout is needed.

```sh
git clone https://github.com/BlurHook/blurhook-mcp.git
cd blurhook-mcp
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
npm start
```

Configure your MCP client to run `node /absolute/path/to/blurhook-mcp/dist/index.js` using stdio. Protocol JSON-RPC stays on stdout; logs go to stderr. The library package is not claimed to be published in the npm registry.

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

The `opalhook-mcp` and `blurhook-mcp` commands start the same server. `OPALHOOK_*` environment variables take precedence over matching `BLURHOOK_*` variables. Both `opalhook_deployment` and the legacy `blurhook_deployment` tool return the same deployed-contract directory. The pinned v0.1.0 SDK dependency remains supported.
