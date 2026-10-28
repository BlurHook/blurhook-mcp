# BlurHook MCP

An MCP server for Robinhood Chain trading agents. It provides quotes, policy-checked unsigned public-swap calldata, simulation, hook information, prices and BlurHook's deployed-contract directory. It never holds a key, signs or broadcasts.

Derived from the MIT-licensed ZeroHook MCP server. Original attribution and exact upstream revision are retained in LICENSE, NOTICE and UPSTREAM.json. BlurHook adds its own SDK integration, configuration/server identity and a read-only deployment-discovery tool.

## Build and connect

Node 22.13 or newer. The BlurHook SDK dependency is a pinned built GitHub release asset; no sibling checkout is needed.

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
- `blurhook_deployment`: BlurHook privacy contracts and approval scope. It does not construct a private proof or activate spending.

## Policy and configuration

`BLURHOOK_POLICY_FILE` selects a policy JSON file; `BLURHOOK_POLICY` supplies inline policy JSON. `BLURHOOK_LEDGER_FILE` persists daily usage across restarts. Configure that file for durable limits: the default in-memory ledger resets when the process restarts. Do not commit your operational ledger.

`BLURHOOK_RPC_URLS` chooses read RPCs. `BLURHOOK_POOLS_FILE` adds pool definitions and `BLURHOOK_DISCOVER_BLOCKS` enables a bounded startup discovery scan. Default discovery is off. The original policy schema remains compatible with the app's exported policy.

Policy rules cover per-trade and daily USD limits, token allowlists, slippage, price impact, pinned contracts/hooks and simulation. The ledger counts returned calldata, not confirmed settlement. Local policy cannot stop a separate wallet/client from acting outside this server. See the source and tests for exact rules; no audit or transaction-success guarantee is made.

This server builds public swaps only. Private spending uses the BlurHook app, a local note vault and BlurHook operator-reviewed deposits. This is not 0xbow screening. Read [contract/privacy scope](https://github.com/BlurHook/blurhook-contracts). Tests use mocked routing and an actual local stdio client; they execute no live swap.
