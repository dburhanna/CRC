# CRC v0.5 — Complete Setup Guide

## 1. What CRC does
Curriculum Reality Check (CRC) answers two questions: **How many times will I actually see this class?** and **Does my planned curriculum fit into those meetings?** It uses the school year, rotation, closures, special schedules, class meeting pattern, and curriculum estimates to calculate instructional margin.

## 2. Requirements
You need a Windows, macOS, or Linux computer; a modern browser; and Node.js 22 LTS or newer. Internet access is needed for the initial `npm install`. After installation, the local application itself does not require a cloud account.

## 3. Install CRC
1. Unzip `crc-production-v0.5.zip` into a normal folder such as Documents.
2. Open Terminal (macOS/Linux) or PowerShell/Terminal (Windows).
3. Change into the CRC folder. Example: `cd ~/Documents/crc-production-v0.5`.
4. Run `npm install` and wait for dependencies to finish installing.
5. Run `npm run dev`.
6. When the terminal reports that Next.js is ready, open `http://localhost:3000` in a browser.
7. Keep the terminal window open while using CRC. Press **Ctrl+C** in the terminal when finished.

### Returning later
Open the CRC folder in a terminal, run `npm run dev`, and browse to `http://localhost:3000`. You do not normally need to run `npm install` again.

## 4. First-run setup at St. Augustine
Click **Setup Wizard**, then choose **St. Augustine 2026–27**. This template already contains the 2026–27 academic-year boundaries, A/B/C/D rotation, September 8 = A anchor, the rule that rotation continues through closures, known no-school dates, and known special-schedule dates.

### Step 1 — Starting point
Choose **St. Augustine 2026–27**. Do not choose the CS demo unless you specifically want the six-class development example.

### Step 2 — School year and rotation
Verify:
- School: St. Augustine Preparatory School
- Academic year: 2026–2027
- First full instructional date: September 8, 2026
- Last regular class date: June 4, 2027
- Rotation: A, B, C, D
- Anchor: September 8, 2026 = A
- Closure behavior: **Rotation continues**

If the official calendar changes, edit the affected dates rather than changing the anchor unless the school's rotation itself is reissued.

### Step 3 — Add classes
For each class, enter a period code/name, course name, and check the rotation days on which that class meets. At St. Augustine the normal eight-period pattern is:

| Rotation day | Periods meeting |
| --- | --- |
| A | A, B, C, D, E, F |
| B | G, H, A, B, C, D |
| C | E, F, G, H, A, B |
| D | C, D, E, F, G, H |

Therefore A/B meet A-B-C; C/D meet A-B-D; E/F meet A-C-D; G/H meet B-C-D.

### Step 4 — Review
CRC checks the configuration. Fix every warning before clicking **Finish & View Reality Check**. A valid setup requires at least one class and at least one meeting day for every class.

## 5. Calendar setup
Open **Calendar**. The first section lists no-school dates. Add a closure whenever students do not attend regular classes. Removing a closure immediately returns that date to normal scheduling.

### Special schedules
The lower section contains known special-schedule dates. For each date whose actual schedule is known, check the periods that really meet. This overrides the normal rotation for that date. Use it for exams, PSAT schedules, early dismissals, or any nonstandard day.

If the exact special schedule is not yet known, leave it unconfigured and verify the date later. Do not guess.

## 6. Curriculum setup
Open **Curriculum**. Existing curriculum plans can be edited unit by unit. Enter the number of **instructional class meetings**, not calendar days or weeks. Use **Add curriculum plan** for a course that does not already have one.

A curriculum plan is shared by sections with the exact same course name. This is useful when two sections teach the same course but have different calendars.

## 7. Reading the Dashboard
For each class CRC displays:
- **Meetings** — actual instructional meetings in the configured year
- **Planned** — total estimated curriculum periods
- **Margin** — Meetings minus Planned
- **Status** — Comfortable, Tight, Exact, At Risk, or Impossible as Planned

Click a class row for details. **Show Me Why** lists the exact included instructional dates so you can verify CRC against the school calendar.

## 8. Back up your setup
Click **Export CRC** after initial setup and after major calendar/curriculum changes. Save the `.json` file somewhere you can find it. To restore or move the setup, click **Import CRC** and select that file.

The browser also saves changes automatically on that computer. Browser storage should not be treated as the only backup.

## 9. Updating CRC during the year
When the school announces a closure or schedule change:
1. Open Calendar.
2. Add/edit the closure or special schedule.
3. Return to Dashboard.
4. Verify the affected class using Show Me Why.
5. Export a new backup if the change is important.

When a unit estimate changes, edit its period count under Curriculum. CRC recalculates immediately.

## 10. Pilot safety rule
For S5, use CRC as a **planning aid**, not the official school calendar. Before making a high-consequence pacing decision, verify questionable dates against the official calendar. The purpose of the faculty pilot is to expose remaining schedule edge cases.

---

## S5.1 Chromebook / Hosted Web Note

For managed Chromebooks, do **not** follow local Node.js installation instructions. Use the hosted CRC HTTPS URL supplied by the pilot coordinator. No application installation is required. See `CHROMEBOOK_QUICK_START.md`.
