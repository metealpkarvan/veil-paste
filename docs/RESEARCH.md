# Observation → product hypothesis

Accessed: 2026-10-05. Exploratory qualitative discovery, not a representative survey.

## Source and access

- Author: Pete (@nonmayorpete)
- Original: [2023-03-27](https://x.com/nonmayorpete/status/1640443500721496064)
- Readable reproduction inspected: [Thread Reader](https://threadreaderapp.com/thread/1640443500721496064.html)
- Direct X access may return an empty page, login wall or 403. The reproduction was used for the body; replies, private profiles and demographics were not inspected.

Pete describes local processing as a motivation for keeping private information on a device. This is historical commentary; the app makes no claims about current AI providers’ retention policies.

## Product inference

People want help drafting messages or reports, but their text may contain names, contact details or credentials. Removing them manually loses consistency and makes the answer harder to personalize.

Our hypothesis: A reversible alias layer: repeated identifiers get the same placeholder, and a reply can be restored using a mapping that exists only in the current tab.

The author did not request this app and has not endorsed it. Dates distinguish historical examples from current claims. No follower, revenue, effectiveness or error-rate claims are inferred.

## Why bounded

Longest overlapping spans win; exact custom terms win ties. Replacement uses original text spans to prevent offset drift. Function-based restoration preserves dollar signs literally. Reserved alias markers are rejected in new source text to prevent mixing maps. Drafts and mappings never enter localStorage.

## Assess usefulness

Complete the workflow with your own nonsensitive example, then check whether the output preserves your intent. Record confusing steps, omissions and manual editing still needed. Acceptance checks demonstrate correct behavior, not adoption or productivity improvement.

Not encryption, anonymization certification or complete DLP. Patterns can miss identifiers or mask innocent numbers. Names require custom terms. Browser extensions, the OS clipboard and a user’s chosen AI service are outside this app’s control.
