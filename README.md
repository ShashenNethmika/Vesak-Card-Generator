# 🪷 Vesak Card Generator

A beautiful, interactive web-based tool to create and download personalized Vesak greeting cards. This project is designed with a modern **Glassmorphism UI** and focuses on ease of use and high-quality output.

![Vesak Card Generator Preview](https://via.placeholder.com/800x450?text=Vesak+Card+Generator+Preview) *(Note: Replace this with an actual screenshot of your site)*

## 🌟 Features

- **6 Unique Templates:** Choose from six different artistic Vesak designs, each with its own color theme.
- **Real-time Live Preview:** See exactly how your card looks as you type the names.
- **Customizable Fields:** Add "To" (Recipient) and "From" (Sender) names easily.
- **Smart Download:** - Downloads in High Quality (HQ) using `html2canvas`.
  - Dynamic File Naming: Files are automatically named based on the recipient's name (e.g., `Amal_Vesak_Wish.png`).
- **Responsive Design:** Fully mobile-friendly UI.
- **Donation System:** Built-in "Buy me a coffee" modal for supporters.

## 🚀 Live Demo

Check out the live project here: [Your GitHub Pages Link Here]

## 🛠️ Technologies Used

- **HTML5:** Semantic structure.
- **Custom CSS3:** Modern UI with Glassmorphism, animations, and responsive layouts (No external frameworks used for clean code).
- **JavaScript (ES6):** Logic for live preview, template switching, and modal handling.
- **[html2canvas](https://html2canvas.hertzen.com/):** For rendering the HTML div into a downloadable image.
- **Google Fonts:** Used 'Poppins' and 'Abhaya Libre' for professional typography.

## 📂 Project Structure

```text
├── index.html       # Main structure
├── style.css       # Custom styling and animations
├── script.js       # App logic and download handling
├── Wish 01.png     # Card Template 1
├── Wish 02.png     # Card Template 2
├── ...             # Other assets
└── donate-qr.png   # Your Donation QR code
