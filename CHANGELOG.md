# CHANGELOG
## v1.2.0
- Migrated theme and format preferences from React's `useState` to Chrome's `chrome.storage.local` API for persistent storage
- Created custom `useChromeStorage` hook in `src/hooks/useChromeStorage.ts` for reusable Chrome storage integration
- Added TypeScript support with `@types/chrome` package for Chrome API type definitions
- Preferences now persist across popup close/reopen and sync across multiple popup instances
- Added runtime checks to handle environments where Chrome APIs may not be available

## v1.1.0
- The `TAILWIND_COLORS` object in `src/App.tsx` has been updated with the OKLCH values from Tailwind CSS v4 theme.css. Additionally, the code handling the contrast check (for the copy icon color) has been updated to parse the new OKLCH format using culori before passing it to colord, ensuring the UI continues to function correctly.