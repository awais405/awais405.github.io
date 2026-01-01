# WordPress Traffic Simulator - Installation & Usage Guide

## 📋 Overview

This WordPress plugin provides a user-friendly interface for simulating human-like traffic to websites. It works entirely in the user's browser, opening new windows/tabs to simulate visits with realistic behavior patterns.

## 🚀 Installation Options

### Option 1: Standalone HTML Page (Easiest)

1. **Upload the HTML file:**
   - Upload `traffic-simulator-ui.html` to your WordPress site via FTP
   - Place it in: `/public_html/traffic-simulator-ui.html`
   - Access it at: `https://yourdomain.com/traffic-simulator-ui.html`

2. **Embed in WordPress page:**
   ```html
   <iframe src="/traffic-simulator-ui.html" width="100%" height="1200" frameborder="0"></iframe>
   ```

### Option 2: WordPress Plugin (Recommended)

1. **Install the Plugin:**
   - Download `wordpress-plugin-traffic-simulator.php`
   - Go to WordPress Admin → Plugins → Add New → Upload Plugin
   - Upload the file and activate it

2. **Use the Shortcode:**
   - Edit any page or post
   - Add the shortcode: `[traffic_simulator]`
   - Publish the page

3. **Alternative: Add to Theme:**
   - Go to Appearance → Theme Editor
   - Add shortcode to any template: `<?php echo do_shortcode('[traffic_simulator]'); ?>`

### Option 3: Direct HTML Embedding

1. **Edit Page in HTML Mode:**
   - Go to any WordPress page
   - Switch to "Text" or "HTML" editor
   - Copy and paste the entire content from `traffic-simulator-ui.html`
   - Save and publish

## 📱 How It Works

### User Flow:
1. User opens the page with the traffic simulator
2. Enters target URL and configures settings:
   - Number of visits (1-100)
   - Delay between visits (e.g., 5-15 seconds)
   - Time on page (e.g., 10-30 seconds)
   - Scroll depth (e.g., 50-95%)
3. Clicks "Start Simulation"
4. Tool opens new windows/tabs for each visit
5. Each window displays the target URL and simulates:
   - Natural scrolling behavior
   - Variable time on page
   - Realistic interaction patterns

### Technical Details:
- **Client-side JavaScript**: Runs entirely in the user's browser
- **No server requirements**: Works on any hosting (including Hostinger)
- **Popup-based**: Opens actual browser windows/tabs
- **Real page loads**: Generates genuine page views for analytics

## ⚙️ Configuration Options

### Available Settings:

| Setting | Default | Description |
|---------|---------|-------------|
| Target URL | Required | The website to visit (must include http:// or https://) |
| Number of Visits | 10 | How many times to visit the site (1-100) |
| Delay Between Visits | 5-15 | Random delay in seconds (format: MIN-MAX) |
| Time on Page | 10-30 | How long to stay on each page in seconds (format: MIN-MAX) |
| Scroll Depth | 50-95 | Percentage of page to scroll (format: MIN-MAX) |

### Examples:

**Light Testing (5 quick visits):**
```
Visits: 5
Delay: 3-8
Time on Page: 5-15
Scroll Depth: 40-70
```

**Realistic Simulation (20 visits):**
```
Visits: 20
Delay: 10-30
Time on Page: 15-45
Scroll Depth: 60-95
```

**Intensive Testing (50 visits):**
```
Visits: 50
Delay: 5-15
Time on Page: 10-30
Scroll Depth: 50-90
```

## 🎯 Features

### ✅ What It Does:
- Opens real browser windows/tabs
- Loads the actual target page
- Simulates natural scrolling (5-10 steps)
- Variable time on page (randomized)
- Smooth scroll behavior
- Real-time progress tracking
- Detailed activity logs
- Automatic window closing

### ⚠️ Limitations:
- **Requires popup permission**: Users must allow popups
- **Browser-based**: Can't bypass advanced bot detection
- **Cross-origin restrictions**: May not be able to interact with all sites
- **Visible windows**: Opens actual browser windows (not silent)
- **Rate limits**: Browser may limit simultaneous popups

### Differences from Python Version:
| Feature | Python Version | WordPress Version |
|---------|---------------|-------------------|
| Bot Detection Bypass | ✅ Full (undetected_chromedriver) | ❌ Limited |
| Server Required | ✅ Yes | ❌ No |
| Silent Operation | ✅ Headless | ❌ Opens visible windows |
| User-Agent Spoofing | ✅ Yes | ❌ Uses real browser |
| Hosting | Dedicated server | ✅ Any hosting (Hostinger) |
| WordPress Compatible | ❌ No | ✅ Yes |
| Ease of Use | CLI commands | ✅ User-friendly UI |

## 🖥️ Hostinger Compatibility

### ✅ Works on Hostinger because:
- Pure JavaScript (client-side)
- No Python/server requirements
- No special hosting features needed
- Works on shared hosting
- No database needed

### Setup on Hostinger:

1. **Via File Manager:**
   - Login to Hostinger
   - Go to File Manager
   - Navigate to `public_html`
   - Upload `traffic-simulator-ui.html`
   - Access: `https://yourdomain.com/traffic-simulator-ui.html`

2. **Via WordPress:**
   - Install as plugin (Option 2 above)
   - Or embed HTML directly in page

## 📊 Use Cases

### 1. Analytics Testing
Test if your analytics tracking works correctly:
```
- Visit your own site with the tool
- Check Google Analytics for page views
- Verify scroll depth tracking
- Test time-on-page metrics
```

### 2. Load Testing
See how your site handles multiple visits:
```
- Set 50-100 visits
- Monitor server performance
- Check page load times
- Test caching behavior
```

### 3. User Behavior Simulation
Generate realistic user patterns:
```
- Variable time on page
- Natural scroll patterns
- Random visit intervals
```

## 🔒 Security & Privacy

### Safe Because:
- ✅ Runs in user's own browser
- ✅ Uses user's own IP address
- ✅ No data collection
- ✅ No server-side code
- ✅ Open source (transparent)

### Browser Security:
- Popup blocker may block windows
- Cross-origin policy protects against malicious use
- Same security as any website visitor

## ⚠️ Ethical Guidelines

### ✅ Appropriate Use:
- Testing your own websites
- Verifying analytics setup
- Load testing with permission
- Development/QA testing
- Demonstrating tools to clients

### ❌ Inappropriate Use:
- Generating fake traffic for others
- Manipulating analytics dishonestly
- Inflating ad impressions
- Violating website Terms of Service
- DDoS or attack attempts

## 🐛 Troubleshooting

### Problem: "Popup blocked"
**Solution:** Allow popups for your site in browser settings

### Problem: Nothing happens when clicking Start
**Solution:** 
- Check browser console for errors
- Verify URL includes http:// or https://
- Try with a different browser

### Problem: Windows close immediately
**Solution:**
- Check if URL is accessible
- Verify time-on-page is not 0
- Test with a simple site like example.com

### Problem: Cross-origin errors in logs
**Solution:**
- This is normal for some sites
- The tool still generates page views
- Scroll simulation may not work due to security

### Problem: Too slow/too fast
**Solution:**
- Adjust delay between visits
- Reduce/increase time on page
- Lower number of visits for testing

## 📈 Measuring Results

### Google Analytics:
1. Open Google Analytics
2. Go to Realtime → Overview
3. Start simulation
4. Watch visits appear in real-time
5. Check Pages report for page views

### Other Analytics:
- Most analytics work the same way
- Look for page view metrics
- Check time-on-page statistics
- Monitor scroll depth (if tracked)

## 🔧 Customization

### Change Colors:
Edit the CSS in the `<style>` section:
```css
.ts-btn {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Change Defaults:
Edit the HTML input values:
```html
<input type="number" value="10">  <!-- Change 10 to your default -->
```

### Add Logo:
Add before the title:
```html
<img src="your-logo.png" style="max-width: 200px; margin-bottom: 20px;">
```

## 📞 Support

### Common Questions:

**Q: Will this work on Hostinger?**
A: Yes! It's pure JavaScript and works on any hosting.

**Q: Do I need Python installed?**
A: No, this version runs in the browser only.

**Q: Can users simulate traffic to any site?**
A: Yes, but encourage ethical use (own sites only).

**Q: Does it bypass bot detection?**
A: Limited. It's better than nothing but not as advanced as Python version.

**Q: How many visits can I do at once?**
A: Up to 100, but browsers may limit simultaneous popups.

## 📝 Version Information

- **Version:** 1.0.0
- **Compatibility:** All modern browsers (Chrome, Firefox, Safari, Edge)
- **WordPress:** 5.0+
- **PHP:** 7.0+ (for plugin version)
- **Hosting:** Any (including shared hosting like Hostinger)

## 🎓 Tutorial: First Setup

### Step-by-Step for Beginners:

1. **Download the file:**
   - Save `traffic-simulator-ui.html` to your computer

2. **Upload to WordPress:**
   - Login to WordPress admin
   - Install "Simple File List" plugin (optional, for easier access)
   - Or use FTP/File Manager to upload to root directory

3. **Create a page:**
   - Go to Pages → Add New
   - Title: "Traffic Simulator"
   - Switch to Text/HTML editor
   - Paste this:
   ```html
   <iframe src="/traffic-simulator-ui.html" width="100%" height="1400" frameborder="0" style="border:none;"></iframe>
   ```

4. **Publish:**
   - Click Publish
   - Visit the page
   - Allow popups when prompted

5. **Test:**
   - Enter your site URL
   - Set visits to 5
   - Click Start Simulation
   - Watch it work!

## 📄 License

This tool is provided for educational and testing purposes. Users are responsible for ethical usage and compliance with applicable laws and website terms of service.

---

**Need Help?** Check the troubleshooting section or test with a simple site like `https://example.com` first.
