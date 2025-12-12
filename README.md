# Strands HTML Page

A collection of web pages featuring interactive elements and a llama gallery.

## Project Structure

```
/
├── index.html              # Main homepage with spinner demo
├── llama.html             # Random llama image gallery
├── css/                   # Stylesheets directory
│   ├── main.css          # Styles for main page (index.html)
│   └── llama-gallery.css # Styles for llama gallery
├── js/                    # JavaScript files directory
│   ├── main.js           # Main page functionality (spinner controls)
│   └── llama-gallery.js  # Llama gallery application logic
└── README.md             # This file
```

## Features

### Main Page (index.html)
- Interactive spinner demonstration
- Navigation to llama gallery
- Clean, responsive design

### Llama Gallery (llama.html)
- Displays random llama images from curated collection
- Smart rotation to avoid immediate repetition
- Loading states and error handling
- Responsive design for all screen sizes
- High-quality images from Unsplash

## Code Organization

The codebase follows a clean separation of concerns:

- **HTML files**: Contain only semantic markup and structure
- **CSS files**: Handle all styling and layout
- **JavaScript files**: Manage application logic and interactivity

### JavaScript Modules

#### SpinnerController (main.js)
Manages the spinner functionality on the main page:
- Show/hide spinner controls
- Auto-demo on page load
- Proper error handling for missing DOM elements

#### LlamaGallery (llama-gallery.js)
Handles the llama image gallery:
- Curated collection of 10 high-quality llama images
- Smart image rotation system
- Loading state management
- Error handling with fallback images
- Cache busting for fresh image loads

## Browser Compatibility

The application uses modern JavaScript features and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Development

### File Naming Conventions
- HTML files: lowercase with hyphens (e.g., `llama-gallery.html`)
- CSS files: lowercase with hyphens matching functionality
- JS files: lowercase with hyphens matching functionality

### Adding New Pages
1. Create HTML file in root directory
2. Create corresponding CSS file in `/css/` directory
3. Create corresponding JS file in `/js/` directory
4. Link CSS and JS files in HTML using relative paths

## Maintenance

The organized structure makes it easy to:
- Locate and modify specific functionality
- Add new features without affecting existing code
- Debug issues in isolated modules
- Maintain consistent coding standards