# Strands HTML Page

A collection of web pages featuring interactive elements and a random image gallery.

## Project Structure

```
/
├── index.html                # Main homepage with spinner demo
├── random-gallery.html      # Random image gallery (reliable & robust)
├── llama.html               # Legacy llama gallery (deprecated)
├── css/                     # Stylesheets directory
│   ├── main.css            # Styles for main page (index.html)
│   ├── random-gallery.css  # Styles for random image gallery
│   └── llama-gallery.css   # Legacy llama gallery styles (deprecated)
├── js/                      # JavaScript files directory
│   ├── main.js             # Main page functionality (spinner controls)
│   ├── random-gallery.js   # Random image gallery application logic
│   └── llama-gallery.js    # Legacy llama gallery logic (deprecated)
└── README.md               # This file
```

## Features

### Main Page (index.html)
- Interactive spinner demonstration
- Navigation to random image gallery
- Clean, responsive design

### Random Image Gallery (random-gallery.html) ⭐ **Active Feature**
- Displays high-quality random images from reliable sources
- Multiple fallback mechanisms for maximum reliability
- Robust error handling with automatic retry logic
- Loading states and graceful error recovery
- Responsive design for all screen sizes
- Multiple image sources (Picsum Photos with various configurations)

### Legacy Llama Gallery (llama.html) ⚠️ **Deprecated**
- Original llama-specific gallery (kept for reference)
- May experience reliability issues
- Use random-gallery.html instead

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

#### RandomGallery (random-gallery.js) ⭐ **Primary Gallery**
Handles the random image gallery with enterprise-grade reliability:
- Multiple reliable image sources (Picsum Photos API)
- Advanced fallback mechanisms with automatic source switching
- Robust retry logic (up to 3 attempts per image)
- Timeout protection (10-second limit per image load)
- Dynamic image dimensions for variety
- Comprehensive error handling and logging
- Cache busting for fresh image loads
- Graceful degradation on failures

#### LlamaGallery (llama-gallery.js) ⚠️ **Legacy Code**
Original llama gallery implementation:
- Hardcoded image collection (prone to failures)
- Limited error recovery
- Deprecated in favor of RandomGallery

## Reliability Features

### Multiple Image Sources
The random gallery uses several image sources for maximum reliability:
1. **Picsum Photos Random**: Dynamic dimensions with timestamp randomization
2. **Picsum Photos ID**: Specific image IDs from curated collection
3. **Picsum Photos Grayscale**: Artistic grayscale variations

### Automatic Fallback System
- If one image source fails, automatically tries the next source
- Intelligent retry logic with exponential backoff
- Comprehensive error logging for debugging
- User-friendly error messages with recovery options

### Performance Optimizations
- Image preloading to prevent UI flickering
- Timeout protection to prevent hanging loads
- Cache busting to ensure fresh content
- Responsive image sizing based on device capabilities

## Browser Compatibility

The application uses modern JavaScript features and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Development

### File Naming Conventions
- HTML files: lowercase with hyphens (e.g., `random-gallery.html`)
- CSS files: lowercase with hyphens matching functionality
- JS files: lowercase with hyphens matching functionality

### Adding New Features
1. Create HTML file in root directory
2. Create corresponding CSS file in `/css/` directory
3. Create corresponding JS file in `/js/` directory
4. Link CSS and JS files in HTML using relative paths
5. Update navigation in `index.html` if needed

### Reliability Best Practices
- Always implement multiple fallback mechanisms
- Use timeout protection for external API calls
- Implement comprehensive error logging
- Provide user-friendly error messages
- Test edge cases and failure scenarios

## Troubleshooting

### Image Loading Issues
The random gallery is designed to handle various failure scenarios:
- **Network connectivity issues**: Automatic retry with different sources
- **API endpoint failures**: Fallback to alternative image services
- **Timeout issues**: 10-second timeout with graceful error handling
- **CORS issues**: Uses reliable, CORS-enabled image services

### Error Recovery
If you encounter issues:
1. Try the "New Image" button to load a different image
2. Refresh the page to reset the application state
3. Check browser console for detailed error logs
4. Ensure internet connectivity for external image sources

## Maintenance

The organized structure makes it easy to:
- Locate and modify specific functionality
- Add new features without affecting existing code
- Debug issues in isolated modules
- Maintain consistent coding standards
- Monitor and improve reliability metrics