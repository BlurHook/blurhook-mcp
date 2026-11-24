# OpalHook MCP migration guide

The first public release shipped as [v0.1.0](https://github.com/opalhook/opalhook-mcp/releases/tag/v0.1.0) on 28 October 2026 under the BlurHook name. The OpalHook rebrand followed on 24 November 2026. The v0.1.0 and [v0.1.1](https://github.com/opalhook/opalhook-mcp/releases/tag/v0.1.1) release assets install as `@blurhook/mcp` and remain available for existing integrations.

When upgrading to [OpalHook v0.1.3](https://github.com/opalhook/opalhook-mcp/releases/tag/v0.1.3), follow the [install instructions](README.md) and use `@opalhook/mcp` as the package name. The new scope is a separate npm dependency key. If your project has an entry for the earlier package, update it when you switch.

## Supported aliases

| OpalHook | Legacy |
| --- | --- |
| `opalhook-mcp` command | `blurhook-mcp` command |
| `OPALHOOK_*` environment variables | `BLURHOOK_*` environment variables |
| `opalhook_deployment` tool | `blurhook_deployment` tool |

Both commands start the same server. When both environment variables are set, the `OPALHOOK_*` value takes precedence over the matching legacy value. Both deployment tools return the same contract directory. The v0.1.3 package pins the [SDK v0.1.2 release](https://github.com/opalhook/opalhook-sdk/releases/tag/v0.1.2).
