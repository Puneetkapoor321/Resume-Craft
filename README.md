# ResumeCraft - Interactive Resume Builder

ResumeCraft is a modern, interactive web application that allows users to build and preview their professional resumes in real-time. With a sleek user interface, it provides sections for personal information, experience, education, skills, projects, certifications, and leadership achievements.

## Published Link - 
- https://puneetkapoor321.github.io/Resume-Craft/
## Features

- **Real-Time Preview:** See your resume update instantly as you type.
- **Dynamic Sections:** Add, edit, or remove multiple entries for Experience, Education, Projects, Certifications, and Leadership.
- **Customizable Skills:** Choose from suggested skills or add your own custom skills.
- **Profile Photo Upload:** Easily upload and preview your profile picture.
- **Theme Toggle:** Switch between Light and Dark modes for a comfortable viewing experience.
- **Progress Tracker:** Visual progress bar indicates how complete your resume is.
- **PDF Export:** Download your completed resume directly as a high-quality PDF.

## Technologies Used

- **HTML5:** For structuring the application and resume layout.
- **CSS3:** For styling, including variables for theming, animations, and responsive design.
- **JavaScript (ES6):** Modular JS used for handling form inputs, dynamic DOM updates, theme switching, and PDF generation.
- **html2pdf.js:** Used for exporting the resume to a PDF document.
- **Font Awesome:** For scalable vector icons.
- **Google Fonts:** Utilizing 'Inter' and 'Poppins' for clean typography.

## Project Structure

```
Interactive-Resume-Builder/
│
├── index.html        # Main HTML file containing the application structure
├── css/              # Stylesheets directory
│   ├── style.css       # Main styles
│   ├── variables.css   # CSS custom properties (colors, fonts, etc.)
│   ├── themes.css      # Light and Dark theme configurations
│   ├── animations.css  # UI animations and transitions
│   └── responsive.css  # Media queries for responsiveness
│
└── js/               # JavaScript modules directory
    ├── app.js          # Main application initialization
    ├── preview.js      # Handles live updating of the resume preview
    ├── theme.js        # Manages light/dark mode switching
    ├── pdf.js          # Handles PDF generation and download
    ├── imageUpload.js  # Manages profile picture uploads
    ├── progress.js     # Updates the completion progress bar
    ├── education.js    # Logic for the Education section
    ├── experience.js   # Logic for the Experience section
    ├── skills.js       # Logic for the Skills section
    ├── projects.js     # Logic for the Projects section
    ├── certifications.js # Logic for the Certifications section
    └── leadership.js   # Logic for the Leadership section
```

## How to Use

1. **Clone or Download** the repository to your local machine.
2. **Open `index.html`** in any modern web browser (Google Chrome, Firefox, Safari, Edge).
3. **Fill out the form** on the left panel. Your changes will automatically reflect in the live preview on the right.
4. **Toggle the Theme** using the switch in the top navigation bar according to your preference.
5. **Download your Resume:** Once you are satisfied with your resume, click the "Download PDF" button at the bottom of the form to save it.

## License

This project is made for educational and personal use.
