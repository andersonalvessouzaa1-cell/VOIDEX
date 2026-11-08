import assert from 'node:assert/strict';
import { getSupabaseConfig } from '../lib/auth/config';
import { parseProfileInput } from '../lib/auth/profile';
export function runAuthConfigTests() {
 let passed=0;const check=(a:unknown,b:unknown)=>{assert.deepEqual(a,b);passed++;};
 const url='https://abcdefghijklmnopqrst.supabase.co';const key='sb_publishable_12345678901234567890';
 check(getSupabaseConfig(url,key),{url,key});
 check(getSupabaseConfig('',''),null);check(getSupabaseConfig(url,''),null);
 check(getSupabaseConfig(url,'sb_secret_12345678901234567890'),null);
 check(getSupabaseConfig('http://abcdefghijklmnopqrst.supabase.co',key),null);
 check(getSupabaseConfig('https://supabase.co.attacker.example',key),null);
 check(getSupabaseConfig(url+'/?next=evil',key),null);
 check(getSupabaseConfig('https://user:password@abcdefghijklmnopqrst.supabase.co',key),null);
 const anon='e30.'+btoa(JSON.stringify({role:'anon'}))+'.signature';
 const admin='e30.'+btoa(JSON.stringify({role:'service_role'}))+'.signature';
 check(getSupabaseConfig(url,anon),{url,key:anon});check(getSupabaseConfig(url,admin),null);
 check(getSupabaseConfig(url,'not-a-key'),null);
 check(parseProfileInput({nickname:' Anderson ',platform:'pc',id:'other',reputation:999,role:'admin'}),{nickname:'Anderson',platform:'pc'});
 for(const input of [null,{}, {nickname:'ab',platform:'pc'},{nickname:'a'.repeat(33),platform:'pc'},{nickname:'<script>',platform:'pc'},{nickname:'Anderson',platform:'admin'},{nickname:123,platform:'pc'}])check(parseProfileInput(input),null);
 for(const platform of ['pc','ps4','xbox','switch','mobile'])check(parseProfileInput({nickname:'Tenno_01',platform}),{nickname:'Tenno_01',platform});
 console.log(`auth-config: ${passed} verificações passaram`);return {passed,failed:0};
}
