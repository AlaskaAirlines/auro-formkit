## Test Environment Issues

**TL;DR:** The test environment provided by the Flight Search team, `FlightSearchWidgets`, and accompanying configuration instructions were incomplete and omitted key implementation details. As a result, older versions of FormKit were being installed and executed by nested dependencies that we had no knowledge of, leading to conflicts with the Release Candidate. A revised test environment and updated guidance have since been provided, resolving these environmental issues.

On or about July 2025, the Flight Search team provided the Auro team with a GitHub repository, `FlightSearchWidgets`, to support validation of FormKit releases. This repository has been used by the Auro team since the homepage redesign. The Auro team was instructed to clone the repository and directly install or update the test version of FormKit within it and how to launch their local test environment for our use.

Following installation of the FormKit Release Candidate and initial testing, we observed multiple unexpected issues. Core FormKit component features and behaviors appeared to be functionally broken in ways that could not be reproduced in local development environments or in other teams’ repositories. 

The Auro engineering team reasonably concluded that the observed failures were likely caused by defects within the FormKit codebase. Based on that assumption, we invested significant effort attempting to harden the implementation to account for the observed behavior. The Auro engineering team conducted several coordinated debugging sessions but was unable to determine the definitive root cause. These efforts did not resolve the issues, as the root cause was later determined to be environmental rather than code-related. 

On Friday, April 10, we were able to engage William Caylor and Caleb Wells from the Flight Search team. After reviewing our setup and debugging steps, we were able to identify two key issues within the test environment which had been provided to us:

1. **Indirect dependency overriding FormKit version**
While `FlightSearchWidgets` directly installs FormKit, it was not actually used at this level for rendering our components in Planbook. Rather, it was also installed in a different project called `FlightSearchComponents`. This dependency independently installs FormKit 5.8.0, must then be independently built and finally installed into the `FlightSearchWidgets` project. As a result, even after installing the Release Candidate in `FlightSearchWidgets` as instructed, the application continued to run against the older version via `FlightSearchComponents`. Jordan Jones first noticed this issue while debugging on Friday afternoon and William and Caleb were able to confirm this was correct.
1. **Experimental header dependency introducing additional conflicts**
The `FlightSearchWidgets` repository also included an old experimental Header component which was no longer supported and should not have been included in the test environment. This created a second source of version conflict similar to the issue above. William and Caleb were able to disable this dependency.

After both issues were addressed with the Flight Search team, the Release Candidate no longer exhibited the previously observed failures. This allowed us to proceed with validation using the established manual test plan. We were also able to safely revert the interim code changes that had been introduced during investigation, as they were no longer necessary.

A brief status update was shared with Lindsey O’Sullivan at 2:03 PM indicating that:

- The test environment issues had been identified and resolved
- The previously observed FormKit issues were no longer reproducible
- Additional testing would continue now that a stable and accurate test environment was in place

# Why This Issue Was Not Observed in 5.9.x or 5.10 Releases

FormKit version 5.8.0 was released on October 31, 2025. This release included several UI and validation improvements and was installed and validated within the Flight Search environment in collaboration with Flight Search and Auro engineers. Following joint validation, the release was approved by both teams and deployed to production.

Since the 5.8.0 release, the Flight Search environment has not been updated to consume subsequent FormKit versions. For later releases (5.9.x and 5.10.x), the Auro engineering team executed manual testing of the Release Candidate builds on our own. We followed the provided instructions to install updated versions of FormKit within the `FlightSearchWidgets` repository and conducted validation based on those installations.

As outlined in the previous section, the test environment configuration resulted in older versions of FormKit being installed and executed through indirect dependencies, despite the presence of newer versions in the repository. While the repository configuration we had been instructed to follow reflected the intended installed version, there was no clear mechanism to verify which version was ultimately being executed at runtime, aside from observing functional differences.

As a result, although the Auro team believed they were validating newer releases, the environment continued to run version 5.8.0. This led to repeated validation of the existing production version rather than the intended updates.

Additionally, the changes introduced in versions 5.9.x and 5.10.x did not impact the specific FormKit features currently used by the Flight Search application. These updates were limited to areas not exercised within that environment (for example, multi-select functionality in auro-select). Flight Search appeared to work as expected because we did not expect to see a difference in functional behavior.

A summary of these changes is provided below:

- **5.10.0** - add chromatic testing, unit test fixes, combobox custom `error` attribute bug fixes, fix public `updateActiveOption` function, bug fix for auro-input `maxLength` attribute used with type format (e.g. date, credit card)
- **5.9.4** - user input credit card formatting logic
- **5.9.3** - documentation updates
- **5.9.2** - documentation updates
- **5.9.1** - auro-select `noCheckmark` bug fix, custom `error` state of combobox bug fix
- **5.9.0** - auro-select - support for multi-select mode

As result, for each release our testing _"passed"_ because we were testing with the expectation that existing functionality used by flight search was unaffected. But unaware that the configuration instruction issues above meant we were silently testing against formkit versions that were already in production. Since the new versions were not expected to show any functional behavioral difference, nothing appeared wrong during manual testing.

# True Release Candidate Testing and Results

Once the Auro team had a corrected test environment from Flight Search, executing our manual test plan was a straightforward task.

We were able to quickly determine that all new code changes in the 5.11.1 Release Candidate were working as expected. However, there was a key issue we saw with auro-combobox and how it handles the dynamically generated menu that Flight Search generates via their API. 

Myself, Ryan Menner, Chris Friedberg, William Caylor and Caleb Wells stayed on late Friday to debug if this issue was due to code changes in Flight Search or if there was an implementation change that needed to be made on the Flight search side. We were able to quickly determine that there was, in fact, a code issue in FormKit related to menu behavior. At this time, William and Caleb signed off the for day and the Auro engineers continued to debug where the FormKit menu issue was coming from.

Having a stable test environment we were able to work back through installing previous releases in order to determine which version caused the break.

The results of that effort was that the error was introduced in the 5.9.0 release.

This release contained a single feature change - `auro-select - support for multi-select mode`. This feature work was assigned to Stephen Rios. There are several important concerns about the work done here.

- While a Technical Research Document was written, it is missing important sections, notably an risk assessment of his proposed solution.
- An AI driven review of this work has identified multiple critical risk areas with the code changes that are not accounted for in documentation or testing.
- Stephen Rios did not engage the Staff Engineer on his team with his proposed solution or code review.
- Ryan Menner recalls having a conversation with Stephen on this work where he expressed concern about the complexity and uncertainty about approving the TRD or code.
- The only review tracked in the TRD was from Doug Hooker who only gave the document a ::thumbsup:: emoji. There was no further tracked discussion of any kind on this body of work.
- The resulting code changes were extensive and complex. Importantly, the only engineer to review these changes was Doug Hooker on Nov 18th. It was approved with no comments, no suggestions, no change requests. The PR was merged then merged on the same day without seeking additional engagement in the review process from other team members.

After doing an AI driven review of this body of work there are many concerns about the code, many of them critical.

## Change and Risk Review

The assigned work was scoped to be a relatively small feature add to existing auro-select functionality. After review, Stephen instead re-architected the entire underpinnings of the auro-menu component.

Summary of AI review of this body of work:

- 25 files changed
- 1,950 new lines of code
- 969 lines of code deleted

Overall Risk: HIGH

1. Architectural Risk — HIGH
1. Breaking Change Risk — HIGH
1. Test Coverage Risk — MEDIUM-HIGH
1. Behavioral Risk — MEDIUM
1. Review Process Risk — MEDIUM
1. Security Risk — LOW

## Summary of Key Concerns

| Area | Concern | Severity |
|----------|------------|-------|
| Commented-out tests | Desktop combobox tests disabled | Critical | 
| Event contract changes | input event payload shape changed | High | 
| Architectural rewrite | All 4 components rely on new MenuService | High | 
| Async → sync lifecycle | Potential race conditions in updated() | Medium-High | 
| Value type change | Multi-select value now JSON string, not array | High | 
| Removed error handlers | selectValueFailure/selectValueReset listeners removed | Medium | 
| Auto-focus on value set | hideBib() + focus() on every value change | Medium | 

# Next Steps

The Auro engineers need to collaborate the morning of Monday April 13th to try and review this significant code change and determine what is the best path forward.

Until the team has an opportunity to review the now identified failing code, we are unable to provide any proposal or estimate for a solution. 






# Progress — Monday, April 13th

## What we have confirmed so far

**The v5.9.0 menu changes should have been classified as a breaking change.**

Although the external interface of the menu and option components remained the same (i.e., teams using these components would not have seen any API differences), the internal architecture was significantly rewritten. This means that any application running an older version of these components alongside the new version could experience conflicts. To avoid this, consuming teams would need to take an explicit step to register the updated components — something that would not have been expected from a routine feature release.

**The v5.9.0 changes introduced two specific issues with the combobox component:**

1. **Free-text entry no longer works.** The combobox is designed to allow users to type any value, even if it doesn't match one of the suggested options (e.g., typing a city name that isn't in the dropdown list). After v5.9.0, entering a value that doesn't match an option is no longer accepted in certain environmental scenarios.

2. **Pre-filled values are being cleared.** In scenarios where a value is set before the dropdown options have finished loading — such as in Flight Search, where options come from an API — the component now erases the pre-filled value because it can't find a matching option yet. Previously, the component would hold the value until the options were available. This is an important functional behavior for Flight Search where they preload the last search query into the form when reloading the page. This includes the From and To fields which have not yet executed the Flight Search API and built the dynamic menu options on first load the values were preset.

## What are the ongoing questions

- **Could this same issue affect the select component?** We are concerned that the same clearing behavior may also occur in the select component when dropdown options are loaded dynamically (e.g., populated from an API after the page loads).

- **Where exactly should the fix be made?** We have not yet pinpointed the precise location in the code where the logic needs to be adjusted so that both the combobox and select components correctly handle values that are set before their dropdown options have finished loading.

## Next Steps

At this time, we feel significant progress in understanding the complex and high risk changes implemented in 5.9.0 and believe we are on the right path for a solution. There are ongoing questions regard exact implementation details to ensure a proper fix with no regressions in other behavior. But the window of possible code changes is significantly narrower than it was this morning.