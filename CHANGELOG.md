# CHANGELOG
## v1.1.0
- The `TAILWIND_COLORS` object in `src/App.tsx` has been updated with the OKLCH values from Tailwind CSS v4 theme.css. Additionally, the code handling the contrast check (for the copy icon color) has been updated to parse the new OKLCH format using culori before passing it to colord, ensuring the UI continues to function correctly.