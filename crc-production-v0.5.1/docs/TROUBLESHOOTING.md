# CRC v0.5 Troubleshooting

## `npm` command not found
Node.js is not installed or is not available in the terminal. Install Node.js 22 LTS or newer, close/reopen the terminal, then try `node --version` and `npm --version`.

## Browser says it cannot connect to localhost:3000
Make sure `npm run dev` is still running. Look in the terminal for an error or for a different port such as 3001.

## A class has zero meetings
Check the academic-year dates, rotation labels, anchor, and the class's checked meeting days. CRC will also display setup validation errors for incomplete classes.

## Rotation is wrong after a school closure
Check **Closure behavior** in Setup. Choose **Rotation continues** when a missed school day does not shift future A/B/C/D assignments; choose **Rotation pauses** when it does.

## One special day is wrong
Use Calendar → Special schedule overrides and select the exact periods that meet that day. Do not change the entire rotation to fix one exceptional date.

## Curriculum is not loaded
The class course name must match a curriculum-plan name. Either rename the class consistently or create a new curriculum plan with that course name.

## Two sections should share curriculum
Give them the exact same course name. They can still have different periods/meeting days.

## My changes disappeared
CRC normally saves in browser localStorage, but clearing site data or changing browsers can remove it. Restore from **Import CRC** using your most recent exported JSON backup.

## Import is rejected
CRC validates imported files. Read the displayed errors. S5 accepts schema version 1 CRC configuration files.

## Meeting count looks suspicious
Use **Show Me Why** before changing curriculum. Verify the anchor, closure behavior, closures, and special schedules. If the exact dates are wrong despite correct configuration, record the example for the pilot feedback report.
