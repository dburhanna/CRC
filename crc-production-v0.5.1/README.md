# Curriculum Reality Check - Production v0.5.1 (S5.1 Chromebook Web Pilot)

CRC v0.5.1 packages the S5 faculty pilot for **hosted web use on managed Chromebooks**. Faculty use CRC as a normal HTTPS website: no Chromebook installation, Linux mode, Node.js, extension, or administrator privilege is required.

## What is new in S5.1

- Hosted-web deployment is now the primary faculty distribution model.
- Added Vercel deployment configuration.
- Added Chromebook-specific quick start and validation checklist.
- Added a complete hosted deployment guide.
- Preserved the St. Augustine 2026-27 school template, Setup Wizard, special schedules, curriculum editing, Reality Check, Show Me Why, and JSON import/export.
- Local browser persistence remains the pilot storage model; cloud synchronization is intentionally deferred.

## Faculty experience

1. Open the CRC HTTPS URL in Chrome.
2. Click **Setup Wizard**.
3. Choose **St. Augustine 2026-27**.
4. Add classes and curriculum.
5. Use the Dashboard and **Show Me Why**.
6. Use **Export CRC** for a portable backup.

See `docs/CHROMEBOOK_QUICK_START.md`.

## Deploy for the pilot

The recommended path is GitHub + Vercel. The person deploying CRC needs a normal development environment; faculty Chromebooks do not.

See `docs/WEB_DEPLOYMENT_GUIDE.md` for the complete procedure.

## Local developer run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Validation

Run the existing regression suite:

```bash
npm run test:sprint5
```

Before involving faculty, complete `docs/CHROMEBOOK_PILOT_CHECKLIST.md` on one managed Chromebook.

## Pilot documents

- `docs/CHROMEBOOK_QUICK_START.md` - teacher-facing Chromebook instructions
- `docs/WEB_DEPLOYMENT_GUIDE.md` - hosted deployment instructions
- `docs/CHROMEBOOK_PILOT_CHECKLIST.md` - managed-device validation
- `docs/SETUP_GUIDE.md` - full CRC configuration guide
- `docs/FACULTY_PILOT_GUIDE.md` - pilot workflow
- `docs/SCHOOL_TEMPLATE_GUIDE.md` - school-template management
- `docs/TROUBLESHOOTING.md` - common issues
- `docs/PILOT_FEEDBACK.md` - faculty feedback form

## Persistence and privacy

S5.1 stores CRC configuration in the browser's local storage. No student records are required. This keeps the Chromebook pilot simple and avoids requiring a database or account system, but local storage is not a permanent backup. Teachers should export CRC configuration files during the pilot. Cloud accounts and synchronization are the logical next persistence milestone.
