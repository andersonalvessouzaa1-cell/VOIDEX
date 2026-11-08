begin;
insert into auth.users(id) values ('00000000-0000-4000-8000-000000000011'),('00000000-0000-4000-8000-000000000012');
insert into public.profiles(id,nickname,platform) values ('00000000-0000-4000-8000-000000000011','MarketOwnerA','pc'),('00000000-0000-4000-8000-000000000012','MarketOwnerB','pc');
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000011',true);
insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values (auth.uid(),'mod:blind_rage','sell',10,25,2,'MarketOwnerA','pc',true);
update public.market_listings set platinum=30,quantity=3 where owner_id=auth.uid();
do $$ begin
 if (select platinum from public.market_listings where owner_id=auth.uid())<>30 then raise exception 'Own update failed'; end if;
 begin
 insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values (auth.uid(),'mod:blind_rage','buy',11,25,1,'MarketOwnerA','pc',true);
 raise exception 'Invalid rank accepted'; exception when check_violation then null; end;
 begin
 insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values (auth.uid(),'mod:blind_rage','buy',0,25,1,'SpoofedName','pc',true);
 raise exception 'Spoofed nickname accepted'; exception when insufficient_privilege then null; end;
 begin
 update public.market_listings set created_at=now(); raise exception 'Timestamp writable'; exception when insufficient_privilege then null; end;
 begin
 insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values (auth.uid(),'mod:blind_rage','sell',10,25,2,'MarketOwnerA','pc',true);
 raise exception 'Duplicate accepted'; exception when unique_violation then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000012',true);
do $$ declare n integer; begin
 update public.market_listings set platinum=99 where public_nickname='MarketOwnerA'; get diagnostics n=row_count; if n<>0 then raise exception 'Other owner update allowed'; end if;
 delete from public.market_listings where public_nickname='MarketOwnerA'; get diagnostics n=row_count; if n<>0 then raise exception 'Other owner delete allowed'; end if;
 begin
 insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values ('00000000-0000-4000-8000-000000000011','mod:blind_rage','buy',0,25,1,'MarketOwnerA','pc',true);
 raise exception 'Forged owner accepted'; exception when insufficient_privilege then null; end;
end $$;
set local role anon;
do $$ begin
 if (select count(id) from public.market_listings where public_nickname='MarketOwnerA')<>1 then raise exception 'Public read failed'; end if;
 begin perform owner_id from public.market_listings; raise exception 'Owner ID exposed anonymously'; exception when insufficient_privilege then null; end;
 begin perform id from public.profiles; raise exception 'Profile exposed'; exception when insufficient_privilege then null; end;
 begin insert into public.market_listings default values; raise exception 'Anonymous insert allowed'; exception when insufficient_privilege then null; end;
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000011',true);
insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) select auth.uid(),item_key,'buy',0,1,1,'MarketOwnerA','pc',true from public.market_items where item_key<>'mod:blind_rage' order by item_key limit 19;
do $$ begin
 if (select count(*) from public.market_listings where owner_id=auth.uid())<>20 then raise exception 'Quota setup failed'; end if;
 begin
 insert into public.market_listings(owner_id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,public_consent) values (auth.uid(),'mod:blind_rage','buy',0,1,1,'MarketOwnerA','pc',true);
 raise exception 'Quota exceeded'; exception when check_violation then null; end;
end $$;
delete from public.market_listings where owner_id=auth.uid();
do $$ begin if exists(select 1 from public.market_listings where owner_id=auth.uid()) then raise exception 'Own delete failed'; end if; end $$;
reset role;
rollback;
select 'market RLS tests passed; all fixtures rolled back' as result;
