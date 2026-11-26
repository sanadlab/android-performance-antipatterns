# PAPs Catalog Codebook

Status: version 1 (2026-11-26). One rater applied it to the catalog in version 6.0.0. The validation with two raters (section 8) is not done.

This codebook gives the rules to classify each performance anti-pattern (PAP) in the catalog.
Two persons who use these rules on the same PAP must get the same result.

The catalog data (`public/data/performance_issues_list.csv`) uses this codebook from version 6.0.0.
The file `docs/proposed_classifications.csv` records each value before and after the change, with the rationale.

## 1. What changes from the published taxonomy

The taxonomy in the publications has 11 categories and 3 side-effects. This codebook makes these changes:

| Change | Reason |
|---|---|
| New category **UI Rendering** | "Resource Management" contained layout and drawing patterns. These patterns are not about the lifecycle of a system resource. |
| **Resource Management** has a narrower definition | It now contains only the acquisition, the hold time, the release, and the size of system resources. |
| **Obsolete Solution** describes the code, not the advice | A PAP whose advice is out of date gets the validity status "Obsolete" (section 6). It does not get this category. |
| A PAP has one **primary** category and zero or one **secondary** category | The order of the two values was not consistent. |
| Two new impact values: **App Size** and **Build Time** | Some PAPs do not change the time, the memory, or the energy of the app at run time. |
| A PAP can have more than one impact value | Many PAPs have two effects (for example, a leaked wake lock uses energy). |
| New fields **Evidence** and **Validity** | The catalog did not record if the performance effect was measured. |

## 2. Scope

A pattern is in the catalog only if all these conditions are true:

1. A static analysis tool can detect it in source code, resource files, the manifest, or build files.
2. The source (tool documentation or paper) gives a performance cost: time, memory, energy, app size, or build time.
3. A fix exists that keeps the behavior of the app.

If the source gives only a correctness, security, or maintainability problem, the pattern is out of scope.
Mark such a row as `Out of scope?` in the review. Do not delete the row before the reviewers agree.

## 3. Category

### 3.1 The two groups

The categories are in two groups.

**Domain categories** tell *where* the problem is.

| Category | Use it when | Example |
|---|---|---|
| Build Optimization | The problem is in the build configuration, the packaging, or the manifest packaging options. The fix changes a build file or a manifest attribute. | `KaptUsageInsteadOfKsp` |
| Concurrency | The problem is the thread that does the work (for example heavy work on the main thread), or the use of locks or synchronized objects. A thread or an executor that is not stopped is Resource Management. | `HeavyAsyncTask` |
| Resource Management | The code gets a system resource and does not release it, holds it too long, gets it too early, or gives it a wrong size. System resources are: memory that stays reachable (leaks), wake locks, sensors, camera, media, location, services, alarms, threads, closeable objects, caches. | `WakeLock` |
| UI Rendering | The problem is in the view hierarchy, the layout, the draw pass, or the Compose recomposition. | `UIOverdraw` |
| RPC/IPC | The problem is in network communication or in communication between processes. | `DynamicWaitTime` |
| Data Access | The problem is in the access to storage: files, streams, databases, parsers of stored data. | `InefficientDataFormatAndParser` |
| Data Manipulation | The problem is in the handling of data in memory: strings, boxed values, arrays, collections. | `AvoidArrayLoops` |

**Mechanism categories** tell *what type* of inefficiency it is.

| Category | Use it when | Example |
|---|---|---|
| Obsolete Solution | The code uses an API or a pattern that a newer and more efficient one replaced. | `UseArrayListInsteadOfVector` |
| API Misuse | The code uses the correct API in an incorrect or inefficient way (wrong overload, wrong argument, missing step of the API protocol). | `Recycle` |
| Unnecessary Computation | The code does work that has no use, or work whose result is already available. The fix removes the work, moves it out of a loop, or stores the result. | `MemoizationChance` |
| Suboptimal Algorithm | The work is necessary, but a cheaper method gives the same result. The fix replaces the method. | `UseAddAll` |
| Code Smell | The problem is a structural or design flaw (size, complexity, unused elements). The source does not give a direct cost mechanism for one statement. | `BLOBClass` |

### 3.2 Decision rules

1. **Primary category.** Read the domain table from top to bottom. The first domain category that applies is the primary category.
2. If no domain category applies, read the mechanism table from top to bottom. The first mechanism category that applies is the primary category.
3. **Secondary category.** If the primary category is a domain category, the secondary category is the first mechanism category that applies. If none applies clearly, there is no secondary category.
4. If the primary category is a mechanism category, there is no secondary category.
5. Write the value as `Primary` or `Primary, Secondary`. The primary category is always first.

### 3.3 Rules for difficult cases

- **Work on the main (UI) thread.** The category is Concurrency. The problem is the thread, not the work.
- **Memory leaks.** The category is Resource Management. This includes static references to a `Context`, a `View`, or a `Bitmap`, and inner classes that keep the outer object reachable.
- **Unused elements** (unused resources, ids, namespaces, fields, private methods). The primary category is Code Smell. The impact is App Size.
- **Allocation in a draw or layout method.** The category is UI Rendering, because the cost appears as dropped frames.
- **Boxing and unboxing.** The category is Data Manipulation.
- **Android resources (`res/` files) are not system resources.** Do not use Resource Management for them.
- **Advice that is out of date.** Classify the pattern by its original mechanism. Record the status in the Validity field.

## 4. Impact (column `Side-Effect`)

Give one or more values. The first value is the primary impact, which is the cost that the source gives first.

| Value | Use it when |
|---|---|
| Runtime | The pattern increases CPU time, frame time, startup time, or response time. Short-lived allocations that cause garbage collection are Runtime. |
| Memory | The pattern increases the memory that stays in use: leaks, objects kept too long, data structures with a large footprint. |
| Energy | The pattern keeps a hardware component active (CPU wake lock, radio, GPS, camera, sensor, screen), or causes wake-ups or network transfers that are not necessary. |
| App Size | The pattern increases the size of the APK, the dex code, or the resources. |
| Build Time | The pattern increases the build time. It has no effect on the installed app. |

Rules:

- Do not give Energy only because the pattern uses CPU time. All Runtime patterns use some energy.
- A leak of a hardware resource (camera, wake lock, location) is `Energy`. A leak of objects is `Memory`.
- A short-lived allocation is `Runtime, Memory` only if the source gives the two costs.

## 5. Android-Specific

- **Yes**: the pattern can occur only in code or files that use the Android SDK, Jetpack libraries (Compose included), Google Play services, Android resource files, the manifest, or the Android Gradle plugin.
- **No**: the pattern can occur in plain Java or Kotlin code. This is true also when the advice came from Android documentation or from an Android tool.

Permitted values: `Yes`, `No`. An empty value is not permitted.

## 6. Evidence and Validity (fields not in the data yet)

**Evidence** tells how we know the performance effect.

| Value | Meaning |
|---|---|
| Measured | A controlled measurement exists (microbenchmark or energy measurement). Give the reference, the device, and the Android version. |
| Literature | A peer-reviewed study reports the effect. Give the reference. |
| Tool claim | Only the tool documentation or the tool paper gives the effect, with no measurement. |

**Validity** tells if the pattern is still relevant on a current Android runtime (ART with R8).

| Value | Meaning |
|---|---|
| Valid | A measurement on a current runtime shows the effect. |
| Obsolete | The runtime or the compiler removes the effect (for example `InternalGetterSetter`). |
| Context-dependent | The effect appears only in specified conditions. Give the conditions. |
| Not evaluated | No measurement on a current runtime exists. |

The source for the two fields is the revalidation study with microbenchmarks. Until a result exists, the values are `Tool claim` or `Literature`, and `Not evaluated`.

## 7. Other fields

| Field | Rule |
|---|---|
| Issue | The identifier. Do not change it after a release, because datasets and papers use it as a key. |
| Tool columns | `✅` if the tool has a rule for the pattern. A note can follow the mark (for example `✅?` if not confirmed). |
| Detectable in Kotlin | `✅` if one or more of the tools detect the pattern in Kotlin code. Empty if not. |
| Severity | The severity that the source tool gives. It is not a measured impact. Permitted values: `Warning`, `Error`, `Fatal`, or empty. |
| File Extensions | The file types where the pattern can occur. |
| Example_1, Example_2 | File names in `public/data/examples/`. Each file has the inefficient code, a line `-----`, and the fixed code. |
| Possible Void | Conditions that make the pattern not applicable. |
| Plausible Occurance Scenario | A development task where the pattern can occur. |
| Notes | Free text of the maintainers. |

## 8. Validation procedure

1. Two raters classify all the rows independently with this codebook. They do not see the current values.
2. Calculate Cohen's kappa for each field (primary category, primary impact, Android-specific).
3. The raters discuss each disagreement. If a rule is not clear, change the codebook and classify the affected rows again.
4. Compare each result with the category that the source tool gives to its rule (for example the Lint category `Performance`, the PMD rule set `performance`, the SpotBugs category `PERFORMANCE`). If the tool does not put the rule in a performance category, the row needs a reference that gives the performance cost, or it is out of scope.
5. Release the new data as a new catalog version. Record the kappa values and the codebook version in the changelog.
