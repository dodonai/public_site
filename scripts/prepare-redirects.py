#!/usr/bin/env python3
"""Merge exact marketing redirects into a current URL map JSON export; never apply it."""
import argparse,copy,json,xml.etree.ElementTree as ET
from urllib.parse import urlparse

def prepare(original,sitemap,hosts):
    result=copy.deepcopy(original)
    for key in ('id','kind','selfLink','creationTimestamp'): result.pop(key,None)
    targets={urlparse(e.text).path for e in ET.fromstring(sitemap).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    mapping={'/index.html':'/'}
    for target in targets:
        if target.startswith(('/clients/','/site-chat/','/api/')): raise ValueError('Non-marketing route in sitemap')
        if target!='/': mapping.update({target.rstrip('/'):target,target+'index.html':target})
    legacy={'/Blog':'/blog/','/blog-3':'/blog/','/ai-deposition-summary-services-dodonai':'/deposition-summary-software/','/ai-marketing-operations-services':'/ai-managed-services/','/sign-up':'https://app.dodon.ai/signup'}
    for old,new in legacy.items():
        for suffix in ('','/','/index.html'):mapping[old+suffix]=new
    names=set()
    for host in hosts:
        rules=[r for r in result['hostRules'] if host in r['hosts']]
        if len(rules)!=1:raise ValueError(f'Ambiguous/missing host: {host}')
        names.add(rules[0]['pathMatcher'])
    for matcher in result['pathMatchers']:
        if matcher['name'] not in names:continue
        if matcher.get('routeRules'):raise ValueError('Advanced routeRules require manual merge')
        rules=[]
        for existing in matcher.get('pathRules',[]):
            overlap=set(existing['paths']) & mapping.keys()
            if overlap and 'urlRedirect' not in existing:raise ValueError('Would replace a backend route')
            remaining=[p for p in existing['paths'] if p not in mapping]
            if remaining:rules.append({**existing,'paths':remaining})
        groups={}
        for old,new in mapping.items():groups.setdefault(new,[]).append(old)
        for destination,paths in sorted(groups.items()):
            redirect={'pathRedirect':destination,'redirectResponseCode':'MOVED_PERMANENTLY_DEFAULT','stripQuery':False}
            if destination.startswith('https:'):
                parsed=urlparse(destination);redirect.update(pathRedirect=parsed.path,hostRedirect=parsed.hostname,httpsRedirect=True)
            rules.append({'paths':sorted(paths),'urlRedirect':redirect})
        matcher['pathRules']=rules
    return result
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('current');p.add_argument('output');p.add_argument('--sitemap',default='build/sitemap.xml');p.add_argument('--host',action='append',required=True);a=p.parse_args()
    with open(a.current) as f:original=json.load(f)
    with open(a.sitemap) as f:sitemap=f.read()
    result=prepare(original,sitemap,a.host)
    with open(a.output,'w') as f:json.dump(result,f,indent=2);f.write('\n')
