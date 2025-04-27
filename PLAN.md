# Wachadoin

## Project Plan

> Goal: Validate core functionality with basic tests to ensure stability.

Milestones:

    [] - Setup & Learning (5-6 hours)
        [] - Install NextJS, TailwindCSS, Firebase.
        [] - Add Jest: npm install --save-dev jest @types/jest ts-jest and configure (jest.client.ts).
        [] - Add Storybook: npx storybook init (integrates with NextJS/Tailwind).
        [] - Push a tested "Hello World" PWA to Firebase Hosting.
    [] - Core Features + Unit/UI Tests (8-10 hours)
        [] - Auth: Firebase Auth setup + Jest tests for API routes (e.g., login/logout logic).
        [] - Profile: Firestore users setup + Jest test for data writes + Storybook story for profile UI.
        [] - Activity Alert: Alert form + Jest test for Firestore writes + Storybook story for form.
        [] - Alert List: Fetch/display alerts + Jest test for data fetching + Storybook story for list UI.
        [] - PWA Basics: Manifest/service worker setup (minimal testing here—focus on functionality).
    [] - E2E Testing & Polish (3-4 hours)
        [] - Install Playwright (npm init playwright@latest) or Cypress (npm install cypress --save-dev).
        	- Playwright’s cross-browser support might edge out Cypress for a PWA, but Cypress is lighter if you’re familiar with it.
        [] - Write 1-2 E2E tests: e.g., “User can sign up and post an alert” (covers auth + CRUD).
        [] - Test PWA install prompt on mobile + deploy to Firebase.

> POC Deliverable: A deployed, tested app with auth, profiles, and alerts. Basic unit tests (Jest), UI stories (
> Storybook), and E2E flows (Playwright/Cypress) ensure it’s not just working but reliable.

### Phase 2: Initial Release (v1)

Duration: 6-7 weeks (5-7 hours/week, ~35-45 hours total)

> Goal: Expand features with comprehensive testing for a production-ready release.

### Milestones:

    - Week 1: Friend System + Tests (6-7 hours)
        - Add friends array to users + UI to add friends.
        - Jest: Test friend-adding logic and Firestore updates.
        - Storybook: Friend search/add UI component.
        - Playwright/Cypress: E2E test for “Add friend and see their alerts.”
    - Week 2: Location Basics + Tests (6-7 hours)
        - Geolocation API + location in alerts.
        - Jest: Test distance calculation (e.g., geolib).
        - Storybook: Alert card with location display.
        - E2E: “Post alert with location, see it filtered by distance.”
    - Week 3: Notifications & PWA Polish + Tests (6-8 hours)
        - FCM setup for push notifications.
        - Jest: Test notification trigger logic (mock FCM).
        - Storybook: Notification opt-in UI.
        - E2E: “Friend posts alert, user gets notified” (tricky—may need manual verification for push).
        - PWA: Offline mode + cache testing (manual for now).
    - Week 4: Expanded Testing (5-6 hours)
        - Jest: Increase coverage—test edge cases (e.g., empty alert list, failed auth).
        - Storybook: Refine stories with variants (e.g., loading states, errors).
        - E2E: Add tests for logout, friend removal, offline alert viewing.
    - Week 5: Security & Final Testing (5-7 hours)
        - Firestore security rules + Jest tests for rule enforcement (use Firebase Emulator).
        - E2E: Test security (e.g., “Non-friend can’t see alert”).
        - Manual UI acceptance via Storybook with a friend’s feedback.
    - Week 6-7: Polish & Release (7-10 hours)
        - Fix bugs from testing (e.g., hydration mismatches, notification delays).
        - Final E2E run on deployed app.
        - Deploy v1 to Firebase Hosting + share with test group.

> v1 Deliverable: A polished, tested PWA with friends, location-aware alerts, and notifications. Unit tests cover logic,
> Storybook ensures UI consistency, and E2E validates user flows.

### Testing Tools Integration

    Jest:
        Use for unit tests on API routes, Firestore interactions, and utility functions (e.g., distance calc).
        Setup tip: Mock Firebase with jest-mock or @client/rules-unit-testing for Firestore rules.
        Time: ~10-15% of dev time per feature.
    Playwright or Cypress:
        Playwright: Preferred for PWA (better mobile emulation, service worker support). Example: Test auth flow + alert posting in 10-15 lines.
        Cypress: Simpler if you’ve used it before, but less robust for offline/PWA edge cases.
        Time: 1-2 E2E tests per milestone (~1 hour each).
    Storybook:
        Build stories for each component (e.g., AlertCard, FriendList) with props for states (loading, error, success).
        Use as acceptance testing: Show a friend the UI and tweak based on feedback.
        Time: ~30 mins per component, reusable across phases.

## Functionality Ideas

    - "Join" Button: Let friends RSVP to alerts with a single tap (updates alerts with attendees array).
    - Time Window: Alerts auto-expire after their event time (e.g., use Firestore TTL or a cron job via Firebase Functions).
    - Categories: Tag alerts (e.g., “Food”, “Walk”, “Games”) for filtering.
    - Map View: Show alerts on a simple map (Leaflet.js or Google Maps API—keep it lightweight).
    - Mood Indicator: Fun twist—users pick an emoji to signal their vibe (e.g., 😊 for chill, 🎉 for hype).

## Additional Tips

    - Learning NextJS: Focus on React hooks (useState, useEffect) since Angular’s dependency injection differs. Watch a NextJS crash course (e.g., Net Ninja on YouTube) to bridge the gap.
    - Firebase Gotchas: Set up security rules early—Firestore’s defaults are wide open. Use Firebase Emulator Suite locally to test auth/database without live deploys.
    - Time Management: Break tasks into 1-2 hour chunks for weeknights, save bigger lifts (e.g., notifications) for weekends.
    - Leverage Experience: Your Angular routing and cloud skills will shine—treat NextJS pages like Angular routes and Firebase like a lightweight Azure service.

## Sample Timeline

    * April 12-27, 2025: POC (3 weekends, 15-20 hours).
	* April 28-June 8, 2025: v1 (6-7 weeks, 5-7 hrs/week, 35-45 hours).
	* June 9-15, 2025: Buffer for final testing/polish.

## Advice on Testing Approach

    * POC: Keep testing light but meaningful—focus on happy paths (e.g., auth works, alerts save). Aim for 20-30% unit coverage, 1-2 E2E flows, and 2-3 Storybook stories.
    * v1: Ramp up to 50-60% unit coverage, 5-7 E2E tests, and a Storybook catalog for all key UIs. Prioritize tests for user-facing features (alerts, friends) over plumbing (PWA offline).
    * Time Tradeoff: Testing adds ~30-50% to dev time. Offset this by reusing Angular testing patterns (e.g., mock services) and leaning on Storybook for quick UI validation.
    * Firebase Emulators: Use them! They’ll save you from live deploy headaches when testing Firestore rules and auth.