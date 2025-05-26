# Resonating Souls

A clean, modern, and minimalistic web platform designed for youths to connect with like-minded individuals ("souls alike"). The core theme is aesthetic simplicity with deep emotional resonance, relying on visual appeal and expressive content.

## Project Overview

Resonating Souls is a front-end focused platform that enables users to:
- Register and sign in
- Create personalized profiles
- Express themselves through bios and favorite quotes
- (Future) Connect with others who share similar interests

## Features

### Landing Page
- Visually attractive design with gradient background
- Smooth animations and transitions
- Simple two-button layout for Register and Sign In

### User Authentication
- Form-based registration and sign-in
- Input validation
- Unique username generation
- LocalStorage for persisting user data

### Profile Setup
- Basic information collection
  - Optional display name
  - Date of birth (month/year)
  - Gender selection
  - Nationality selection
- Self Bio Section
  - Multi-line text entry with character limit
  - Show More/Show Less preview functionality
- Quotes Collection
  - Add, edit, and delete favorite quotes
  - Dynamic quote management with localStorage

## Technical Implementation

### Technologies Used
- HTML5 with semantic, clean structure
- CSS3 with animations, transitions, and gradients
- Vanilla JavaScript (no external frameworks/libraries)

### Responsive Design
- Mobile-first approach
- Flexible layouts for all screen sizes
- Accessible design with ARIA attributes

### Local Storage
- User profile persistence
- Quote collection management
- Form data saving

## Project Structure

```
resonating-souls/
├── index.html              # Main HTML document
├── /css/
│   └── styles.css          # Main stylesheet
├── /js/
│   └── app.js              # JavaScript functionality
├── /assets/                # Images, icons, fonts (if any)
└── README.md               # Project documentation
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. No build tools or package installations required

## Future Development

- Interests section implementation
- Connection mechanism between users
- Chat functionality
- Backend integration for persistent data storage
- Profile picture upload
- Advanced search and filtering options

## Design Philosophy

The design focuses on emotional expression through visual elements, creating a digital "journal-meets-social space" that feels warm, friendly, and a bit dreamy. The color scheme combines warm oranges with cool purples to create a comfortable yet stimulating visual environment.

## Notes

This project is a front-end prototype only. No actual authentication or backend functionalities are implemented. User data is stored in the browser's localStorage for demonstration purposes.

## License

MIT License
