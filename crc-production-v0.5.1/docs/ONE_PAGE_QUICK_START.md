# CRC S5 — One-Page Quick Start

## Start the app
**Mac:** double-click `START_CRC_MAC.command`. If macOS blocks it, right-click it and choose Open.  
**Windows:** double-click `START_CRC_WINDOWS.bat`.  
**Manual:** run `npm install` once, then `npm run dev`.

Open **http://localhost:3000**.

## St. Augustine teacher setup
1. Click **Setup Wizard**.
2. Choose **St. Augustine 2026–27**.
3. Verify A/B/C/D, September 8 = A, and **Rotation continues**.
4. Add each class and check its meeting days:
   - A/B periods → A, B, C days
   - C/D periods → A, B, D days
   - E/F periods → A, C, D days
   - G/H periods → B, C, D days
5. Finish setup.
6. Open **Curriculum** and add/edit unit durations in class periods.
7. Open **Calendar** and review special schedules.
8. Open **Dashboard**, click a class, and use **Show Me Why** to verify dates.
9. Click **Export CRC** to save a backup.

## If something looks wrong
Do not adjust curriculum to compensate for a bad calendar. First verify the rotation anchor, closure behavior, closures, and special-schedule overrides. See `docs/TROUBLESHOOTING.md`.
