# DocTime_App
# DocTime 🩺

**A responsive web platform that helps patients in Georgia find a doctor and book a visit online, with free time slots and prices visible upfront.**

🔗 **Live demo:** [https://your-project.vercel.app](https://doc-time-app.vercel.app)

---

## Problem

Patients in Georgia struggle to see doctors' **free appointment times** and **prices** before booking, and they find it hard to **trust** the information they see online. DocTime brings these three things into one simple, mobile-friendly place.

## Research Summary

The project follows a **Design Thinking** process. User research included:

- 3 online interviews
- A Google Forms survey with 13 respondents

**Key findings:**

| Finding | Result |
|---|---|
| Mainly use a phone | 11 / 13 |
| Cannot see free slots before booking | 8 / 13 |
| Cannot see prices upfront | 8 / 13 |
| Trust real patient reviews | 11 / 13 |
| Most wanted features: filters and reviews | 10 / 13 each |

These results led to a **mobile-first** design that focuses on availability, transparent pricing, and verified reviews.

## Features

- 🔍 **Doctor search** with suggestions
- 🎛️ **Filters:** specialty, price, district, insurance, rating, video consultation
- ↕️ **Sorting** of results
- ⚖️ **Doctor comparison**
- 👤 **Doctor profile** with patient reviews
- 📅 **Availability calendar** with free slots
- ✅ **3-step booking** without registration
- 📱 **SMS reminder** note
- 🌐 **Language switcher:** Georgian (default) / English
- 🔒 **Data protection** page

## Tech Stack

| Area | Tools |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| Build tool | Vite |
| Built with | Bolt.new, Claude |
| Images | Adobe Firefly, Gemini |
| Deployment | Vercel |
| Version control | GitHub |

## AI Tools and Workflow

This project was created for the course **"Vibe coding and AI agentic engineering"**.

- **Claude:** PRD, website copy, and research synthesis; also used during development
- **Bolt.new:** fast prototype and initial app generation
- **Adobe Firefly / Gemini:** image generation
- **Deevid AI:** video generation
- **ChatGPT:** writing and refining prompts for image/video tools

**Workflow:** research → synthesis → PRD → prototype → iteration → deployment.

## Screenshots

<!-- Add your screenshots to a /screenshots folder and update the paths below -->

## Screenshots

<table>
  <tr>
    <td width="50%" align="center">
      <b>Home / Search</b><br><br>
      <img src="https://github.com/user-attachments/assets/a5363d28-504b-4c55-9cdf-bdcbcd3622a2" alt="Home page" width="100%">
    </td>
    <td width="50%" align="center">
      <b>Doctor Profile</b><br><br>
      <img src="https://github.com/user-attachments/assets/e2c1ada1-bc9c-4a47-9c9c-51daf3c2710e" alt="Doctor profile" width="100%">
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>Booking</b><br><br>
      <img src="https://github.com/user-attachments/assets/0a112490-fb31-413f-a0a3-ed0e76a7ca67" alt="Booking flow" width="100%">
    </td>
    <td width="50%" align="center">
      <b>Mobile View</b><br><br>
       <img src="https://github.com/user-attachments/assets/1037f2b3-bb2f-4ad1-aa0d-e9cff5029c6a" alt="Mobile view" width="100%">
    </td>
  </tr>
</table>

## How to Run Locally

**Requirements:** [Node.js](https://nodejs.org/) (v18 or newer) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/doctime.git
cd doctime

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the local address shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Future Plans

- Real backend and database for doctors, slots, and bookings
- Real SMS reminders and booking confirmations
- Doctor dashboard for managing schedules and prices
- Verified patient reviews tied to completed visits
- Online payment and video consultation integration
- Accessibility improvements and further usability testing

## Author

**K. C.**
Student, Business and Technology University (BTU), Georgia
Course: *Vibe coding and AI agentic engineering*

---

*DocTime is a university project and does not provide real medical services. All doctor data is fictional.*

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-7hgnk4dj)
