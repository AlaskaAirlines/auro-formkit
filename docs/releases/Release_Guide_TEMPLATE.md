# Release Notes

<!-- Intro line — always included. Replace {previous} with the prior version (e.g. 6.0.1). -->
This document outlines all changes since the {previous} release.

<!--
Release-type line — always included. Replace {version} with the new version and
{major|minor|patch} with the bump this release represents:
  - major = at least one commit with a BREAKING CHANGE / `type!:`
  - minor = at least one `feat` commit (no breaking changes)
  - patch = only `fix` / `perf` commits
Summarize the focus in one clause, then state breaking-change status. For a patch/minor
release with no breaking changes, end with "No breaking API changes."
-->
Version {version} is a **{major|minor|patch} release** focused on {short focus of the release}. {Breaking-change note, or "No breaking API changes."}

## Summary

<!--
Executive summary — always included. One short paragraph describing the release at a high
level, followed by a bullet list of the most notable changes phrased for consumers (what
now works / what changed), not as a raw commit log. Close with a line about migration
impact, e.g. "All changes are backward compatible. Consumers should update without
migration work." (patch/minor) — omit or adjust for a major release.
-->
{Executive summary paragraph.}

- {Notable change, consumer-facing phrasing.}
- {Notable change.}

{Migration-impact line.}

<!--
Breaking Changes — INCLUDE ONLY for a MAJOR release (a BREAKING CHANGE / `type!:` commit).
Omit this whole section otherwise. List each breaking change and how consumers must adapt.
-->
## Breaking Changes

### {AURO-COMPONENT}

- **{what breaks}** — [{ref}]({link})

    {How it breaks and what consumers must change.}

### Migration

{Step-by-step migration guidance for the breaking changes above.}

<!--
Features — INCLUDE ONLY when there are `feat` commits (minor/major bump). Omit otherwise.
Group items under a per-component heading. Order components roughly by significance.
-->
## Features

### {AURO-COMPONENT}

- **{imperative summary of the feature}** — [{ref}]({link})

    {One short paragraph of detail: what was added and why it matters to consumers.}

<!--
Bug Fixes — INCLUDE when there are `fix` commits. Keep the note line verbatim. Group by
component. Each item: a bold summary, the linked reference, then an indented detail
paragraph explaining the defect and the fix.
-->
## Bug Fixes

_Note: Bug fixes do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### {AURO-COMPONENT}

- **{imperative summary of the fix}** — [{ref}]({link})

    {What was broken and how the fix resolves it.}

<!--
Improvements — INCLUDE when there are `perf` commits. Keep the note line verbatim. Same
grouped item shape as Bug Fixes.
-->
## Improvements

_Note: Improvements do not require migration steps. Updating to this version is all that is necessary to implement these changes._

### {AURO-COMPONENT}

- **{imperative summary of the improvement}** — [{ref}]({link})

    {What improved and the measurable/behavioral effect.}

<!--
Build & Packaging — OPTIONAL. Include only when build/ci/packaging changes in this range
are relevant to consumers or to release integrity. Omit otherwise.
-->
## Build & Packaging

- **{summary}** — [{ref}]({link})

    {Detail.}

<!--
Test Coverage — OPTIONAL. Include when notable tests were added/changed. One bullet per
component describing the coverage added.
-->
## Test Coverage

- **{component}:** {what coverage was added.}

<!--
Documentation — OPTIONAL. Include when docs/examples/post-mortems were added or updated.
Link post-mortems under docs/post-mortem/ when present.
-->
## Documentation

- {Documentation change, with links.}

<!--
Reference-link formats:
  - ADO work item (AB#<7 digits>):
    [AB#<n>](https://itsals.visualstudio.com/5e9f12eb-f830-406f-bee9-be25938f7aaa/_workitems/edit/<n>)
  - GitHub PR (#<n>):
    [#<n>](https://github.com/AlaskaAirlines/auro-formkit/pull/<n>)
-->
