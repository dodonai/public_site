import copy,importlib.util,json,pathlib,unittest

def module(name,file):
 spec=importlib.util.spec_from_file_location(name,file);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
redirects=module('redirects','scripts/prepare-redirects.py');deploy=module('deploy','scripts/deploy-gcs.py')
class DeploymentTests(unittest.TestCase):
 def test_preserve_routing(self):
  original=json.loads(pathlib.Path('deployment/url-map.staging.proposed.json').read_text())
  updated=redirects.prepare(original,pathlib.Path('build/sitemap.xml').read_text(),['www.dodon.ai','dodon.ai'])
  for matcher in original['pathMatchers']:
   other=next(m for m in updated['pathMatchers'] if m['name']==matcher['name'])
   if matcher['name']!='dodonai-path-matcher':self.assertEqual(matcher,other)
   else:
    self.assertEqual(matcher['defaultService'],other['defaultService'])
    old_backend=[r for r in matcher.get('pathRules',[]) if 'service' in r]
    self.assertEqual(old_backend,[r for r in other['pathRules'] if 'service' in r])
    routes={p:r['urlRedirect'] for r in other['pathRules'] if 'urlRedirect' in r for p in r['paths']}
    for src,dest in [('/Blog/','/blog/'),('/pricing','/pricing/'),('/pricing/index.html','/pricing/'),('/ai-marketing-operations-services/','/ai-managed-services/')]:
     self.assertEqual(routes[src]['pathRedirect'],dest);self.assertFalse(routes[src]['stripQuery'])
    self.assertEqual(routes['/sign-up/']['hostRedirect'],'app.dodon.ai')
    self.assertNotIn('/unknown/',routes);self.assertNotIn('/site-chat/',routes)
 def test_upload_metadata(self):
  for rel,mime,cache in [('index.html','text/html','no-cache'),('_app/immutable/test.js','text/javascript','public,max-age=31536000,immutable'),('images/image.svg','image/svg+xml','no-cache')]:
   cmd=deploy.upload_command(pathlib.Path('build')/rel,pathlib.Path('build'),'stage-landing')
   self.assertIn('--content-type='+mime,cmd);self.assertIn('--cache-control='+cache,cmd)
   self.assertIn('--gzip-local=html,css,js,json,xml,txt,svg',cmd);self.assertIn('gs://stage-landing/'+rel,cmd)
unittest.main()
