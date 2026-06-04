# PrimePick Subscription Plan Page

A premium, interactive subscription plans page for the e-commerce brand **PrimePick**. Built using modern front-end standards (HTML5, CSS3, and JavaScript), this application features a sleek dark-slate design system, responsive pricing, details comparison, and a secure checkout flow simulation.

---

## 🚀 Features

- **Billing Toggle**: Switch seamlessly between **Monthly** and **Yearly** plans with a 15% discount applied dynamically. It features a custom sliding toggle with micro-animations.
- **Three Subscription Tiers**:
  - **Basic (Free)**: Ad-supported, standard shipping.
  - **Pro (₹99/month or ₹1008/year)**: The most popular option, highlighted with a **"Best Value"** badge and premium outline styles.
  - **Premium (₹199/month or ₹2028/year)**: Full access, 4K streaming, and multi-user family sharing options.
- **Secure Payment Simulation Modal**:
  - Automatically adjusts input fields (hides credit card inputs and updates labels) when the Free Basic tier is selected.
  - Form validations and input masks (auto-spaces credit card numbers, formats MM/YY expirations).
  - Network request loading spinner simulation on confirm.
  - Beautiful success state containing a dynamic confirmation screen (random member ID generation, calculated renewal dates, animated custom SVG checkmarks, and a canvas confetti celebration).
- **Features Comparison Matrix**: A detailed breakdown of all benefits per subscription tier with subtle hover animations.
- **Responsive Layout**: Designed mobile-first using CSS Grid and Flexbox, looking gorgeous across mobile phones, tablets, and wide monitors.

---

## 🛠️ Tech Stack & Tools

- **Core Structure**: HTML5 (Semantic elements)
- **Styling**: CSS3 (Custom HSL variables, backdrop-filters for glassmorphism, responsive media queries, CSS Keyframe animations)
- **Logic**: JavaScript ES6 (No external dependencies/libraries to ensure portability)
- **Typography**: Google Fonts (Inter & Outfit)
- **Icons**: Hand-drawn inline SVGs for vector crispness and offline availability.

---

## 💻 How to Run

Since the shell environment does not have Node.js or Python installed, this project is built as a pure client-side web application. You can run it instantly using any of the following methods:

### Method 1: Direct File Launch (Easiest)
1. Navigate to the project directory:
   `Folder Path`
2. Double-click the `index.html` file to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Method 2: Command Line (Windows PowerShell / CMD)
If you wish to launch it directly from the command line in Windows:
```powershell
Start-Process "File Path"
```

### Method 3: Local Server (Optional)
If you have a local server installed elsewhere, you can host the files using:
- **Node/npm (if available globally)**: `npx serve .` or `npx live-server`
- **Python**: `python -m http.server 8000`
- **VS Code Extension**: Live Server

---

## 📁 File Structure

```
primepick-subscription-page/
├── index.html        # Main markup, hero, plans grid, table, & modal
├── styles.css        # Premium slate-dark CSS design system & animations
├── script.js         # Interactive pricing toggle, validation, & confetti logic
└── README.md         # Project documentation
```
