## Second version

> Started on Oct 16, 2018

- [x] Use react-mock in tests
- [x] Remove hoisted vars and before/after cases
- [x] Refactor code preview component
- [x] Try react-testing-library
- [x] Split tests between RTL and Enzyme
  - [x] Remove Cosmos fixture tests (superseded by react-mock)
  - [x] Refactor styled-components test
  - [x] Add URL for each test kind
  - [x] Add URL for each test
- [x] Update project description
  - [x] Update README
- [x] Visual facelift
  - [x] Header
  - [x] Remove file visibility toggling
  - [x] Tweak file actions
  - [x] Footer
    - [x] Links to tech used
  - [x] Update responsive breakpoints
- [x] Replace file system sorting
- [x] Make Next.js components load in Cosmos
- [ ] Optimize search perf

## First version

> Started on Apr 24, 2018

- [x] Add "Click callback" tests
- [x] Add "Render text" tests
- [x] Add "Local state" tests
- [x] Add "Redux" tests
- [x] Add "React Router" tests
- [x] Add "XHR" tests
- [x] Add "Fetch" tests
- [x] Add "LocalStorage" tests
- [x] Add "styled-components" tests
- [ ] Add "Context" tests
- [x] Colocate components with tests
- [x] Add ESLint
- [x] Config CircleCI
- [x] Colocate Cosmos proxies with tests
- [x] Add Flow
- [x] Create UI
  - [x] Syntax highlight (with line highlight)
  - [x] Sticky header
  - [x] Highlight and create fixtures for all tests
  - [x] Implement search
  - [x] Add toggle between 'Plain Enzyme' and 'Cosmos & Enzyme'
  - [x] Improve search
    - [x] Keyboard shortcuts
    - [x] No results screen
    - [x] Show best matches first
  - [x] Add links next to section titles
  - [x] Add file actions to copy and open code in GH
  - [x] Create About modal
  - [x] Footer
  - [x] Design no results screen
  - [x] Adapt header design on mobile
  - [x] Tweak colors
- [x] Load test title & description from README pages
- [x] Write copy
  - [x] Info overlay
    - [x] Opinionated test style (integration / abstract libs)
    - [x] Cosmos vs non-Cosmos
  - [x] Test READMEs
- [x] Create build script
  - [x] Add Next.js
    - [x] Reconcile Babel config between Next, Cosmos and Jest
    - [x] Reconcile webpack config between Next and Cosmos
    - [x] Restructure files for more clarity
  - [x] Read tests from disk at compile time
  - [x] Point to latest commit SHA
- [x] PUBLISH
- [x] Create fixtures for UI components
- [ ] Config Playground for tests
