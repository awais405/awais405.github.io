# Human-Like Traffic Simulator

A Python script that simulates realistic human-like traffic to a target website for testing purposes (e.g., verifying analytics tracking, page views, impressions, and click loads).

## Features

### 🎭 Advanced Bot Detection Avoidance
- Uses `undetected_chromedriver` to bypass common Selenium detection methods
- Patches navigator.webdriver and other bot detection vectors
- Randomized browser fingerprints for each session

### 🔀 Browser Fingerprint Variation
- **User-Agent Rotation**: Randomly selects from 11+ realistic Chrome user-agents across Windows, macOS, and Linux
- **Screen Resolution**: Varies window size from common real resolutions (1920x1080, 1366x768, 1440x900, etc.)
- **Language Settings**: Rotates between en-US, en-GB, and en-CA
- **Additional Options**: Randomizes window state and browser arguments

### 🖱️ Human-Like Behavior Patterns
- **Natural Mouse Movements**: Uses Bezier curves to simulate curved, human-like cursor paths
- **Smooth Scrolling**: Multiple incremental scrolls with natural pauses (2-10 scrolls per visit)
- **Random Scroll Depth**: Each visit scrolls to 50-95% of page height (never predictable)
- **Occasional Back-scrolling**: Sometimes scrolls up briefly, mimicking real reading behavior
- **Element Hovering**: 30-50% chance to hover over random visible elements (images, links, text)
- **Internal Link Clicks**: 10% chance to click an internal link and briefly explore before returning

### ⏱️ Realistic Timing
- **Initial Reading Pause**: 2-8 seconds after page load
- **Time-on-Page**: Random 10-70 seconds per visit (minimum 10s, maximum 1min 10s)
- **Action Pauses**: 1-5 second delays between actions
- **Inter-Visit Delays**: Configurable random delays between visits (default 5-30 seconds)

### 🔄 Complete Randomization Per Visit
All parameters are re-randomized for each browser session:
- User-Agent string
- Window size/resolution
- Language preference
- Scroll depth and pattern
- Mouse movement paths
- Time on page
- Interaction choices

## Installation

### Prerequisites
- Python 3.7 or higher
- Chrome/Chromium browser installed on your system

### Install Dependencies

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install selenium undetected-chromedriver
```

## Usage

### Basic Usage

```bash
python traffic_simulator.py <URL>
```

### With Custom Number of Visits

```bash
python traffic_simulator.py <URL> --visits 20
```

### With Custom Delay Between Visits

```bash
python traffic_simulator.py <URL> --visits 50 --delay 10-30
```

### Command-Line Arguments

- **`url`** (required): Target website URL to visit (must include http:// or https://)
- **`--visits, -v`** (optional): Number of visits/impressions to simulate (default: 10)
- **`--delay, -d`** (optional): Delay range between visits in format MIN-MAX seconds (default: 5-30)

### Examples

```bash
# Simulate 10 visits to example.com with default settings
python traffic_simulator.py https://example.com

# Simulate 25 visits with 15-45 second delays between each
python traffic_simulator.py https://example.com --visits 25 --delay 15-45

# Quick test with 5 visits and short delays
python traffic_simulator.py https://mywebsite.com -v 5 -d 3-10
```

## How It Works

### Session Flow

For each visit, the script:

1. **Initializes Browser** with randomized fingerprint
   - Selects random User-Agent
   - Sets random screen resolution
   - Configures language and other settings

2. **Navigates to Target URL**

3. **Initial Reading Phase** (2-8 seconds)
   - Simulates user reading page content

4. **Interactive Phase** (varies)
   - Performs smooth scrolling with natural pauses
   - Optionally moves mouse in curved paths
   - Optionally hovers over visible elements
   - Rarely clicks internal links for exploration

5. **Extended Stay**
   - Waits to reach target time-on-page (10-70 seconds total)

6. **Cleanup**
   - Closes browser session
   - Waits random delay before next visit

### Key Techniques

#### Bezier Curve Mouse Movement
```python
# Generates natural curved paths between points
curve_points = bezier_curve(start_pos, end_pos, num_points=20)
```

#### Smooth Scrolling
```python
# JavaScript smooth scroll with random increments
window.scrollTo({top: position, behavior: 'smooth'})
```

#### Time Budget Management
The script intelligently manages time to achieve realistic session durations:
- Allocates time for initial reading
- Budgets time for actions (scrolling, hovering, clicking)
- Fills remaining time with natural pauses

## Output and Logging

The script provides detailed logging for each visit:

```
2026-01-01 10:30:15 - INFO - Starting traffic simulation to https://example.com
2026-01-01 10:30:15 - INFO - Total visits: 10
2026-01-01 10:30:15 - INFO - Delay between visits: 5-30 seconds
2026-01-01 10:30:16 - INFO - Visit #1 - User-Agent: Mozilla/5.0 (Windows NT 10.0...
2026-01-01 10:30:16 - INFO - Visit #1 - Resolution: 1920x1080
2026-01-01 10:30:16 - INFO - Visit #1 - Language: en-US
2026-01-01 10:30:16 - INFO - Visit #1 started - Target time on page: 45.2s
2026-01-01 10:30:18 - INFO - Visit #1 - Page loaded: https://example.com
2026-01-01 10:30:25 - INFO - Scrolled to 73% of page
2026-01-01 10:30:30 - INFO - Hovered over element
2026-01-01 10:31:01 - INFO - Visit #1 completed - Actual time: 45.4s
```

## Use Cases

### Analytics Testing
- Verify page view tracking
- Test impression counting
- Validate session duration metrics
- Check scroll depth analytics

### Load Testing
- Generate realistic user traffic patterns
- Test server response under human-like load
- Validate caching and CDN behavior

### A/B Testing
- Create control traffic for experiments
- Generate baseline metrics

### Development Testing
- Test new features with realistic user behavior
- Verify tracking pixel implementations
- Debug analytics integration

## Configuration and Customization

### Adjusting Behavior Probabilities

Edit the script to change interaction frequencies:

```python
# In simulate_visit() method

# Mouse movement (default 30%)
if random.random() < 0.3:
    self.simulate_mouse_movement(driver)

# Element hover (default 40%)
if random.random() < 0.4:
    self.hover_random_elements(driver)

# Internal link click (default 10%)
if random.random() < 0.1:
    self.click_internal_link(driver)
```

### Adding More User-Agents

Add to the `USER_AGENTS` list in the script:

```python
USER_AGENTS = [
    # Your custom user-agent strings
    'Mozilla/5.0 ...',
]
```

### Adding More Resolutions

Add to the `SCREEN_RESOLUTIONS` list:

```python
SCREEN_RESOLUTIONS = [
    (2560, 1440),  # Your custom resolution
]
```

## Technical Details

### Dependencies

- **selenium**: WebDriver automation framework
- **undetected-chromedriver**: Patched ChromeDriver to avoid bot detection

### Browser Mode

The script runs in **headless mode** by default for efficiency, but maintains all human-like characteristics. Headless mode:
- ✅ Saves system resources
- ✅ Allows running on servers without display
- ✅ Maintains realistic fingerprint
- ✅ Executes all JavaScript normally

### Error Handling

The script handles common errors gracefully:
- Page load timeouts (30-second limit)
- WebDriver exceptions
- Element interaction failures
- Network errors

Failed visits are logged and counted separately from successful visits.

## Important Notes

### Ethical Usage

⚠️ **This tool is designed for legitimate testing purposes only:**
- Testing your own websites
- Verifying analytics implementations
- Load testing with permission
- Development and QA testing

**DO NOT use this tool to:**
- Generate fake traffic for ad fraud
- Inflate metrics dishonestly
- DDoS or attack websites
- Violate website terms of service
- Engage in any malicious activity

### Rate Limiting

The built-in delays between visits help avoid overwhelming target servers:
- Minimum 5-second delay (configurable)
- Random delays prevent pattern detection
- Reasonable time-on-page metrics

### Legal Considerations

Users are responsible for ensuring their use complies with:
- Target website's Terms of Service
- Robots.txt guidelines
- Local and international laws
- Ethical testing practices

## Troubleshooting

### Chrome/ChromeDriver Issues

If you encounter ChromeDriver errors:

```bash
# The undetected-chromedriver package auto-downloads compatible ChromeDriver
# But you can manually update Chrome:
# - Update Chrome browser to latest version
# - Restart the script (undetected-chromedriver will auto-match)
```

### ImportError

```bash
# Ensure packages are installed
pip install --upgrade selenium undetected-chromedriver
```

### Timeout Errors

If pages consistently timeout:
- Check your internet connection
- Verify the target URL is accessible
- Increase timeout in the script (edit `driver.set_page_load_timeout(30)`)

### Headless Mode Issues

If headless mode causes problems (rare):
- Comment out the `options.add_argument('--headless=new')` line
- This will show the browser window (slower but helps debugging)

## Performance

### Resource Usage

Per visit (approximate):
- CPU: Low-moderate (browser rendering)
- Memory: ~150-300 MB per Chrome instance
- Network: Minimal (single page load + potential internal link)

### Scalability

- Sequential execution: One visit at a time
- For high volume: Run multiple instances with different target URLs
- Recommended: Max 50-100 visits per run to avoid memory buildup

## Future Enhancements

Potential improvements for advanced users:
- Multi-threading support for parallel visits
- More sophisticated interaction patterns (form filling, video play simulation)
- Proxy rotation support
- Custom timezone spoofing
- Canvas fingerprint randomization
- WebGL fingerprint variation
- Cookie/cache persistence between sessions

## Contributing

This is a standalone testing tool. Users are welcome to fork and modify for their specific needs while maintaining ethical usage guidelines.

## License

This script is provided as-is for testing purposes. Users assume all responsibility for their usage.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review error logs
3. Verify all dependencies are installed correctly
4. Test with a simple URL first (e.g., https://example.com)

## Version

Current version: 1.0.0

## Changelog

### v1.0.0 (2026-01-01)
- Initial release
- Undetected ChromeDriver integration
- Bezier curve mouse movements
- Natural scrolling with random depth
- User-Agent and resolution randomization
- Configurable visits and delays
- Comprehensive logging
- Error handling and recovery
