# AGENTS.md — libre-jqgrid

## What this is
A modern, open-source fork of jqGrid, designed for integration with modern JavaScript tooling and jQuery 4.0 compatibility. A maintained version of free-jqGrid.

## Stack
- JavaScript (jQuery plugin)
- jQuery 4.0+
- Grunt (build)
- TypeScript (definitions)
- CSS

## Build (dist)
```bash
npm install
grunt default
```

## Run
Serve the lib files and include jQuery then `js/jquery.jqgrid.src.js` (or the dist bundle) in your page.

## Structure
- `js/` — jqGrid JS sources and i18n
- `css/` — ui.jqgrid styles
- `plugins/` — optional grid plugins
- `ts/` — TypeScript definitions
- `pages/` — demo pages
- `gruntfile.js` — build config
- `tests/` — test suite

## Conventions
- No comments in code unless asked.
- Verify: `grunt default` builds cleanly.
