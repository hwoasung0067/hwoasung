"""Read-only checks for renewal context integrity; run from any directory."""
from pathlib import Path
import hashlib, json, re, sys
root=Path(__file__).resolve().parents[1]
errors=[]
required=['START-HERE.md','context/current-direction.md','context/design-judgment.md','.ai_history/handoff.md','.ai_history/feedback-log.md','workflows/feedback-to-design.md','qa/design-review.md','output/concepts/INDEX.md']
for p in required:
 if not (root/p).is_file(): errors.append(f'Missing: {p}')
m=json.loads((root/'input/planning-snapshot/manifest.json').read_text())
for row in m['files']:
 p=root/'input/planning-snapshot'/row['path']
 if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest()!=row['sha256']: errors.append(f'Snapshot changed: {row["path"]}')
# Historical documents can contain obsolete references; validate new maintained documents only.
for folder in ['context','workflows','qa','output','templates','.ai_history']:
 for p in (root/folder).rglob('*.md'):
  for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
   if re.match(r'^[a-z]+:',target) or target.startswith('#'): continue
   target=target.split('#')[0]
   if target and not (p.parent/target).exists(): errors.append(f'Broken link: {p.relative_to(root)} -> {target}')
for p in [root/'START-HERE.md',root/'legacy-index.md']:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if not (p.parent/target).exists(): errors.append(f'Broken entry link: {target}')
print(json.dumps({'result':'FAIL' if errors else 'PASS','snapshot_files':len(m['files']),'source_commit':m['commit'],'errors':errors},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
