# Website Interaction Simulator

Advanced tool for simulating realistic user behavior and tracking website interactions.

## Features

### 🎯 Click Simulation
- Configurable number of clicks
- Adjustable click interval (in milliseconds)
- Randomness factor for natural behavior
- Tracks both simulated and manual clicks

### 📜 Scroll Simulation
- Multiple speed options: Slow (Human-like), Medium, Fast
- Various scroll patterns:
  - Linear: Smooth continuous scrolling
  - Random: Unpredictable scrolling behavior
  - Reading Pattern: Simulates natural reading with pauses
- Real-time scroll depth tracking (percentage)

### 🎭 Behavior Patterns
- Mouse Movement Patterns:
  - Natural: Human-like mouse movements
  - Erratic: Quick, irregular movements
  - Precise: Direct, calculated movements
- Behavior Types:
  - Engaged User: Frequent interactions, longer session time
  - Casual Browsing: Moderate interaction frequency
  - Quick Scanner: Fast scrolling, minimal clicks

### 🔐 Browser Entropy (Fingerprinting)
Generates comprehensive browser fingerprint including:
- User Agent
- Platform and Language
- Screen Resolution and Color Depth
- Hardware Concurrency and Device Memory
- Timezone Information
- Canvas Fingerprinting
- WebGL Fingerprinting
- Font Detection
- Audio Context Detection
- Plugin Detection
- Storage Availability (Local/Session/IndexedDB)

### ⏱️ Time-on-Page Tracking
- Continuous tracking from page load
- Real-time display in seconds
- Automatic updates every second

### 🎲 Interaction Randomness
- Variable delays between actions
- Random element selection
- Timing variations based on behavior type
- Natural pause patterns

### 📺 Ad Viewability Signals
- Tracks when ads are in viewport
- Calculates viewability percentage
- Visual indicators for viewable status
- Real-time progress tracking

## Live Demo

Visit the tool at: [https://awais405.github.io/](https://awais405.github.io/)

## Usage

1. **Click Simulation**
   - Set the number of clicks (1-1000)
   - Configure click interval in milliseconds
   - Adjust randomness percentage (0-100%)
   - Click "Start Click Simulation"

2. **Scroll Simulation**
   - Choose scroll speed
   - Select scroll pattern
   - Click "Start Scroll Simulation"

3. **Behavior Simulation**
   - Select mouse movement pattern
   - Choose behavior type
   - Click "Start Behavior Simulation"

4. **Browser Entropy**
   - Click "Generate Browser Entropy" to create a new fingerprint
   - Click "View Current Entropy" to see detailed information

## Statistics Tracked

- **Total Clicks**: Count of all clicks (simulated + manual)
- **Scroll Depth**: Percentage of page scrolled (0-100%)
- **Time on Page**: Duration since page load in seconds
- **Interactions**: Total number of user interactions
- **Ad Viewability**: Percentage of time ad is in viewport
- **Entropy Score**: Uniqueness score of browser fingerprint (0-100)

## Technical Details

- Built with vanilla JavaScript (ES6+)
- No external dependencies
- Responsive design
- Real-time activity logging
- Clean, modular code structure

## Use Cases

- Testing website analytics
- Quality assurance for tracking implementations
- Understanding user behavior patterns
- Ad viewability testing
- Browser fingerprinting research
- Performance testing under load

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- Canvas API
- WebGL (optional)
- Web Audio API (optional)

## License

MIT License - Free to use and modify