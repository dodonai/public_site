#!/usr/bin/env python3
"""Check deployed response types, gzip decoding, exact release bytes, and true 404."""
import gzip,pathlib,sys,urllib.request,urllib.error
base=sys.argv[1].rstrip('/');root=pathlib.Path('build')
samples=['index.html','pricing/index.html','robots.txt','sitemap.xml','chat-widget.js']
for suffix in ('.css','.js','.json','.svg'):
    found=next((p for p in root.rglob('*'+suffix) if not str(p.relative_to(root)).startswith('clients/')),None)
    if found:samples.append(found.relative_to(root).as_posix())
for rel in dict.fromkeys(samples):
    expected=(root/rel).read_bytes();path='/' if rel=='index.html' else '/'+rel.removesuffix('index.html') if rel.endswith('/index.html') else '/'+rel
    for encoding in ('identity','gzip'):
        req=urllib.request.Request(base+path,headers={'Accept-Encoding':encoding,'Cache-Control':'no-cache'})
        with urllib.request.urlopen(req,timeout=45) as response:
            body=response.read();headers=response.headers
            if headers.get('Content-Encoding')=='gzip':body=gzip.decompress(body)
            assert body==expected,f'Content mismatch: {path} ({encoding})'
            expected_type={'.html':'text/html','.css':'text/css','.js':'javascript','.json':'application/json','.svg':'image/svg+xml','.txt':'text/plain','.xml':'xml'}[pathlib.Path(rel).suffix]
            assert expected_type in headers.get('Content-Type',''),f'Content type: {path}'
            assert headers.get('Cache-Control'),f'Missing cache metadata: {path}'
    print('Verified',path)
try:
    urllib.request.urlopen(base+'/__missing_public_site_release_check__/',timeout=30)
    raise AssertionError('Unknown route returned success')
except urllib.error.HTTPError as e:assert e.code==404,f'Unknown route: {e.code}'
print('Verified true 404')
