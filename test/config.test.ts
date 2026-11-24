import {describe,expect,it} from 'vitest';
import {loadConfig} from '../src/config.js';
describe('OpalHook environment compatibility',()=>{
 it('retains legacy RPC, discovery and ledger settings',()=>{
  expect(loadConfig({BLURHOOK_RPC_URLS:'https://legacy.example',BLURHOOK_DISCOVER_BLOCKS:'12',BLURHOOK_LEDGER_FILE:'/tmp/legacy-ledger'})).toMatchObject({rpcUrls:['https://legacy.example'],discoverBlocks:12,ledgerFile:'/tmp/legacy-ledger'});
 });
 it('prefers explicit OpalHook values over the matching legacy settings',()=>{
  expect(loadConfig({OPALHOOK_RPC_URLS:'https://opal.example',BLURHOOK_RPC_URLS:'https://legacy.example',OPALHOOK_DISCOVER_BLOCKS:'0',BLURHOOK_DISCOVER_BLOCKS:'12',OPALHOOK_LEDGER_FILE:'/tmp/opal-ledger',BLURHOOK_LEDGER_FILE:'/tmp/legacy-ledger'})).toMatchObject({rpcUrls:['https://opal.example'],discoverBlocks:0,ledgerFile:'/tmp/opal-ledger'});
 });
 it('still validates settings from the new prefix',()=>{
  expect(()=>loadConfig({OPALHOOK_DISCOVER_BLOCKS:'-1'})).toThrow();
  expect(()=>loadConfig({OPALHOOK_RPC_URLS:'file:///tmp/no-rpc'})).toThrow();
 });
});
