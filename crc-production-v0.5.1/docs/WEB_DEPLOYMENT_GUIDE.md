# CRC v0.5.1 - Hosted Web Deployment Guide

## Goal

Publish CRC at an HTTPS URL so managed Chromebooks can use it as an ordinary website with no local installation.

## Recommended pilot host: Vercel

CRC is a Next.js application and includes `vercel.json` for framework detection.

### Option A - GitHub + Vercel (recommended)

1. Create a GitHub repository for CRC.
2. Copy the contents of this project into the repository and push the `main` branch.
3. Sign in to Vercel and choose **Add New > Project**.
4. Import the CRC GitHub repository.
5. Vercel should detect **Next.js** automatically.
6. Leave the standard build command as `next build` and output settings at their defaults.
7. Deploy.
8. Vercel will provide an HTTPS URL such as `https://your-project.vercel.app`.
9. Open that URL on a managed Chromebook and complete the Chromebook validation checklist below.

### Option B - Vercel CLI

For a developer machine with Node.js and Vercel CLI available:

```bash
npm install
npm run build
vercel
```

The Chromebook itself does not run these commands. They are only for the person deploying CRC.

## Chromebook validation checklist

- CRC URL opens without an administrator prompt.
- Setup Wizard opens.
- St. Augustine template loads.
- A test class can be created.
- Dashboard produces a Reality Check.
- Show Me Why opens and lists dates.
- Refreshing the page preserves configuration.
- Export CRC downloads a JSON backup.
- Import CRC restores that backup.
- Calendar date inputs and checkboxes work with Chromebook keyboard/trackpad.

## Managed-domain considerations

If the school blocks the hosting domain, an administrator may need to allow the site. That is a web-access policy issue, not an application installation requirement.

For the pilot, do not request PWA or Chrome-extension deployment. CRC v0.5.1 is intentionally usable as a plain HTTPS website.

## Data model for v0.5.1

CRC does not send teacher curriculum/configuration to a CRC database in this sprint. Configuration is stored in browser local storage. Exported backups are ordinary JSON files downloaded by the browser.

This is suitable for a small pilot, but not the desired long-term persistence model. A future cloud-persistence sprint should add authenticated accounts and server-side storage.
