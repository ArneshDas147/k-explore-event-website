# K Explore — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**.

## Features

- Responsive layout for desktop, tablet and mobile
- Six sample events with event cards and detail popups
- Search by event name, category, description or venue
- Category filters
- Registration form with name, email, phone and event validation
- Registration confirmation
- Registrations stored in browser Local Storage
- Dark/light theme toggle (preference is remembered)
- Event countdown in the event detail popup
- Mobile navigation menu

## Run the project

1. Download and extract the ZIP file.
2. Open the `k-explore-event-website` folder.
3. Double-click `index.html` to open it in your browser.

No installation or build step is required. An internet connection is needed for the Google Fonts and remote event photos.

## Project files

- `index.html` — page structure and content
- `style.css` — colours, layout, responsive rules and visual styling
- `script.js` — sample event data, search, filters, modals, validation and Local Storage

## Customise the events

Open `script.js` and edit the `events` array near the top. Each event has:
- `id`: unique number
- `title`: event name
- `category`: Music, Technology, Art or Wellness
- `date`: date/time in ISO format
- `dateLabel`: date shown to visitors
- `venue`: event location
- `description`: short event summary
- `image`: image URL

The sample events and venues are demonstration content. Replace them with verified details before publishing.

## View saved registrations

Open the website, press `F12` to open browser developer tools, choose **Application** (Chrome/Edge), then **Local Storage**, and select the website's address. Look for the `kExploreRegistrations` key.

**Important:** Local Storage is only a learning/demo solution. It stores data in the visitor's own browser and does not send registrations to an organiser or central database. Do not use it to collect real attendee information for a live event.

## Publish with GitHub Pages

1. Create a GitHub account at https://github.com if you do not have one.
2. Create a new public repository named `k-explore-event-website`.
3. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to publish. Your website link will appear in the Pages section.

## Git commands (optional)

Run these in a terminal inside the project folder:

```bash
git init
git add .
git commit -m "Build K Explore event website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/k-explore-event-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.
