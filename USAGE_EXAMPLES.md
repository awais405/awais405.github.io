# Traffic Simulator - Usage Examples

## Quick Examples

### Basic Usage (Default 10 visits)
```bash
python traffic_simulator.py https://example.com
```

### Custom Number of Visits
```bash
python traffic_simulator.py https://mywebsite.com --visits 25
```

### Custom Delay Between Visits
```bash
python traffic_simulator.py https://example.com --visits 50 --delay 10-45
```

### Short Delay for Testing
```bash
python traffic_simulator.py https://example.com -v 5 -d 2-10
```

## Expected Output

```
2026-01-01 10:30:15 - INFO - Starting traffic simulation to https://example.com
2026-01-01 10:30:15 - INFO - Total visits: 10
2026-01-01 10:30:15 - INFO - Delay between visits: 5-30 seconds
--------------------------------------------------------------------------------
2026-01-01 10:30:16 - INFO - Visit #1 - User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...
2026-01-01 10:30:16 - INFO - Visit #1 - Resolution: 1920x1080
2026-01-01 10:30:16 - INFO - Visit #1 - Language: en-US
2026-01-01 10:30:16 - INFO - Visit #1 started - Target time on page: 45.2s
2026-01-01 10:30:18 - INFO - Visit #1 - Page loaded: https://example.com
2026-01-01 10:30:25 - INFO - Scrolled to 73% of page
2026-01-01 10:30:30 - INFO - Performed natural mouse movements
2026-01-01 10:30:35 - INFO - Hovered over element
2026-01-01 10:31:01 - INFO - Visit #1 completed - Actual time: 45.4s
2026-01-01 10:31:01 - INFO - Waiting 18.3s before next visit...
--------------------------------------------------------------------------------
... (continues for all visits)
================================================================================
2026-01-01 11:15:30 - INFO - Traffic simulation completed
2026-01-01 11:15:30 - INFO - Successful visits: 10/10
2026-01-01 11:15:30 - INFO - Failed visits: 0/10
```

## Testing Scenarios

### Analytics Testing
Test if your analytics properly track:
```bash
# Generate 20 diverse visits with realistic behavior
python traffic_simulator.py https://yoursite.com/landing-page --visits 20 --delay 10-40
```

Expected analytics metrics:
- Page views: 20 (plus potential internal link clicks)
- Average time on page: ~40 seconds
- Scroll depth: Variable (50-95%)
- Bounce rate: Variable (depends on internal link clicks)

### Load Testing
Test server performance under realistic traffic:
```bash
# Simulate 50 visits with short delays
python traffic_simulator.py https://yoursite.com --visits 50 --delay 5-15
```

### A/B Testing Baseline
Create control traffic for experiments:
```bash
# Generate consistent baseline traffic
python traffic_simulator.py https://yoursite.com/variant-a --visits 30
python traffic_simulator.py https://yoursite.com/variant-b --visits 30
```

## Common Use Cases

### 1. Verify New Analytics Integration
```bash
# Test if your new analytics tracking fires correctly
python traffic_simulator.py https://yoursite.com/test-page -v 10
# Then check your analytics dashboard for 10 page views
```

### 2. Test CDN Caching
```bash
# Generate traffic to warm up cache
python traffic_simulator.py https://yoursite.com -v 20 -d 2-5
```

### 3. Check Impression Tracking
```bash
# Verify ad impression counting
python traffic_simulator.py https://yoursite.com/ads-page -v 15 -d 5-20
```

### 4. Test Session Recording Tools
```bash
# Generate diverse sessions for replay analysis
python traffic_simulator.py https://yoursite.com -v 10 -d 10-30
# Check your session recording tool for 10 varied sessions
```

## Advanced Tips

### Running Multiple Simulations Sequentially
```bash
# Create a simple bash script
#!/bin/bash
python traffic_simulator.py https://site1.com -v 10
sleep 60
python traffic_simulator.py https://site2.com -v 10
sleep 60
python traffic_simulator.py https://site3.com -v 10
```

### Monitoring Resource Usage
```bash
# Run with time command to see duration
time python traffic_simulator.py https://example.com -v 10
```

### Testing Different Pages
```bash
# Test multiple pages on your site
python traffic_simulator.py https://yoursite.com/home -v 5
python traffic_simulator.py https://yoursite.com/about -v 5
python traffic_simulator.py https://yoursite.com/products -v 5
python traffic_simulator.py https://yoursite.com/contact -v 5
```

## Troubleshooting

### Script Won't Start
```bash
# Check Python version (needs 3.7+)
python3 --version

# Install dependencies
pip install -r requirements.txt

# Try with verbose error output
python3 traffic_simulator.py https://example.com -v 1
```

### Timeout Errors
If pages consistently timeout, try:
1. Check your internet connection
2. Verify the URL is accessible in a regular browser
3. Try with a simpler site first: `python3 traffic_simulator.py https://example.com -v 1`

### ChromeDriver Issues
```bash
# undetected-chromedriver auto-downloads ChromeDriver
# But ensure Chrome/Chromium is installed:
google-chrome --version  # or chromium-browser --version
```

## Performance Notes

- Each visit takes 10-70 seconds (time on page)
- Plus 5-30 seconds delay between visits (configurable)
- Memory: ~200MB per Chrome instance
- CPU: Low-moderate during page interaction

Example total duration:
- 10 visits: ~8-15 minutes
- 50 visits: ~40-80 minutes
- 100 visits: ~80-160 minutes

## Ethical Reminders

✅ Use for:
- Testing your own websites
- Verifying analytics implementations
- Load testing with permission
- Development and QA

❌ Never use for:
- Fake traffic generation
- Ad fraud
- Inflating metrics dishonestly
- Attacking or overwhelming servers
- Violating Terms of Service
