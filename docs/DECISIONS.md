# Architecture and decisions

## Product boundary

A reversible alias layer: repeated identifiers get the same placeholder, and a reply can be restored using a mapping that exists only in the current tab.

The main screen is a working surface. No signup, billing or API setup blocks the task. Samples are explicitly fictional, without invented usage metrics.

## State and rules

src/core.js owns pure domain operations and validators. src/app.js owns DOM events and persistence. src/ui.js supplies escaping, language, clipboard/download helpers and backup envelopes. Static semantic HTML, responsive CSS and visible keyboard focus support access.

Longest overlapping spans win; exact custom terms win ties. Replacement uses original text spans to prevent offset drift. Function-based restoration preserves dollar signs literally. Reserved alias markers are rejected in new source text to prevent mixing maps. Drafts and mappings never enter localStorage.

Rule tests run without a browser. Browser acceptance separately checks wiring, labels, form actions, persistence and offline loading.

## Privacy and ownership

No service receives input text. Automatic requests are same-origin public app files. Each service worker caches its own shell and only intercepts GET requests within its project scope. Names prevent accidental collisions. They are not a security boundary: Pages projects under one account share an origin and can technically access each other’s browser storage. Use local serving on separate origins for stronger separation.

Dynamic HTML uses escaping; user text is data. HTTP/HTTPS links reject credentials and executable protocols and use noopener/noreferrer. CSP disallows remote and inline scripts. Browser extensions and clipboard managers remain outside the app’s control.

Backups carry app identity and version. Import checks size and records before asking to replace data. Veil Paste has no backups because saving its private map would defeat session-only processing.

## Portability

Modern browser APIs and ES modules; zero runtime packages. A static build copies only public files and the license to dist. Pages publishing follows validation. ZIPs include runnable app files and license; local serving avoids file-protocol module restrictions.

## Limits

Not encryption, anonymization certification or complete DLP. Patterns can miss identifiers or mask innocent numbers. Names require custom terms. Browser extensions, the OS clipboard and a user’s chosen AI service are outside this app’s control.

Future work is in [ROADMAP.md](ROADMAP.md). Add services only for concrete capabilities and document changed privacy boundaries.
