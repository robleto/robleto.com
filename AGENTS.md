# Agent System: Competitive Research

## Purpose
This repo includes a lightweight internal agent system for repeatable, evidence-based website research.

Primary goals:
- Produce structured competitive audits (not redesigns)
- Improve quality of recommendations through quantified findings
- Keep outputs reusable across future audits

## Output Locations
- Runbooks: `runs/`
- Agent role specs: `agents/`
- Research outputs: `research/competitive/`

File naming conventions:
- Audit report: `research/competitive/homepage-competitive-audit.md`
- Inventory CSV: `research/competitive/homepage-inventory.csv`
- Runbook files: `runs/run-<analysis-name>.md`

## Finding Format Template
Use this format for each finding:

- `Finding`: What pattern was observed
- `Evidence`: Count and denominator (e.g., `14/20`)
- `Target delta`: What is missing/weak on target site
- `Recommendation`: Specific change to test
- `Type`: `content/structure` or `visual/layout`

## Do Not Rules
- Do not copy competitor text verbatim. Summarize patterns.
- Do not perform major refactors/redesign work during research runs.
- Do not provide vibes-only advice; every claim must tie to evidence.
- Do not mix content recommendations and visual recommendations in one item.

## Commands
Useful project commands from `package.json`:
- `npm run dev` — run local development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint checks
