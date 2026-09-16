#!/usr/bin/env python3
"""Upload a validated release, assets first, with metadata in each upload.
No remote deletion: previous hashed assets remain usable during rollout/rollback.
"""
import argparse, concurrent.futures, mimetypes, pathlib, subprocess

def upload_command(path, root, bucket):
    rel = path.relative_to(root).as_posix()
    immutable = rel.startswith('_app/immutable/')
    cache = 'public,max-age=31536000,immutable' if immutable else 'no-cache'
    content_type = {'js':'text/javascript','css':'text/css','html':'text/html','json':'application/json','xml':'application/xml','svg':'image/svg+xml','txt':'text/plain'}.get(path.suffix[1:], mimetypes.guess_type(path.name)[0] or 'application/octet-stream')
    return ['gcloud','storage','cp',str(path),f'gs://{bucket}/{rel}', '--gzip-local=html,css,js,json,xml,txt,svg',f'--content-type={content_type}',f'--cache-control={cache}']

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--bucket',required=True,choices=['stage-landing','dodonai-landing'])
    parser.add_argument('--build',default='build')
    parser.add_argument('--dry-run',action='store_true')
    args=parser.parse_args(); root=pathlib.Path(args.build)
    if not (root/'index.html').is_file(): raise SystemExit('Missing build/index.html')
    if args.bucket=='dodonai-landing' and (root/'clients').exists(): raise SystemExit('Production release contains clients/')
    files=sorted(p for p in root.rglob('*') if p.is_file())
    entries=[p for p in files if p.suffix=='.html' or p.name in ('robots.txt','sitemap.xml','version.json')]
    assets=[p for p in files if p not in entries]
    def upload(p):
        command=upload_command(p,root,args.bucket)
        if args.dry_run: return
        subprocess.run(command,check=True,stdout=subprocess.DEVNULL)
    for label,group in [('assets',assets),('entry files',entries)]:
        print(f'{label}: {len(group)}',flush=True)
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
            list(pool.map(upload,group))
    print('Dry run complete' if args.dry_run else 'Upload complete; old assets retained')
if __name__=='__main__': main()
