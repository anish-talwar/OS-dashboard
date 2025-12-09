# Background Feature - Quick Guide

## What Was Fixed

### 1. Background Selection Now Works ✅
- Fixed event handlers for background option clicks
- Background patterns now apply immediately when selected
- Selected background persists across browser sessions (saved to localStorage)

### 2. Statistics Window Text Fixed ✅
- "Tasks Completed" label now displays properly (no more stretched/compressed text)
- Font size optimized for readability
- Text wraps correctly within stat boxes

## How to Use

### Accessing Background Selector
1. Click "Background" in the menu bar
2. A window will open with background options

### Retro Mac 1.0 Patterns Available
- **🔲 Classic Grid** - Most iconic Mac 1.0 look (default)
- **🧵 Mac Weave** - Diagonal thread pattern
- **⬤ Mac Dots** - Scattered pixel pattern
- **⋰ Herringbone** - Diagonal brick pattern
- **🪵 Wood** - Wood texture effect
- **🎒 Leather** - Bumpy leather texture
- **⬜ White** - Solid white background
- **◻ Light Gray** - Light gray background
- **■ Dark Gray** - Dark gray background

### Custom Image Upload
1. Click "Background" → "Desktop Background" window
2. Click "Upload" button
3. Select an image file (JPG, PNG, GIF)
4. Your image becomes the background
5. Background persists after page reload

## Technical Details

### What Changed
1. **js/background.js** - New BackgroundManager class
   - Creates retro patterns using Canvas API
   - Manages background storage and application
   - Supports custom image uploads

2. **js/ui.js** - Updated UI functions
   - `openBackgroundWindow()` - Opens selector
   - `closeBackgroundWindow()` - Closes selector
   - `renderBackgroundOptions()` - Renders all options
   - `uploadBackground()` - Handles file upload

3. **index.html** - Added UI elements
   - Background menu item
   - Background selector modal window
   - File input for custom images

4. **css/components.css** - New styles
   - `.bg-grid` - Grid layout for options
   - `.bg-option` - Individual option styling
   - `.bg-preview` - Preview display
   - `.bg-name` - Option label

### Data Storage
- `dashboardBackground` - Currently selected background type
- `dashboardBackgroundImage` - Custom image data URL (if used)

Both stored in browser localStorage

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Tips
- Classic Grid is the most authentic to original Macintosh
- Custom images work best at 1920x1200 or larger
- Maximum file size: 5MB
- Background applies immediately, no page reload needed
- Clear browser data to reset to default background

## Troubleshooting

### Background Not Applying?
1. Check browser console (F12) for errors
2. Ensure JavaScript is enabled
3. Try a different background pattern
4. Clear browser cache and reload

### Custom Image Not Uploading?
1. Check file size (max 5MB)
2. Use JPG, PNG, or GIF format
3. Try a different image file
4. Check browser console for errors

### Text Still Stretched?
The stat labels should now display correctly with proper word wrapping. If you still see issues:
1. Refresh the page
2. Clear browser cache
3. Try a different browser

## Future Enhancements
- Gradient background editor
- Pattern customization (size, color)
- Multiple background profiles
- Drag-and-drop background upload
