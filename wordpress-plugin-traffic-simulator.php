/**
 * Plugin Name: Human-Like Traffic Simulator
 * Plugin URI: https://estimationhub.me
 * Description: Simulate realistic human-like traffic to test website analytics with proper UI
 * Version: 1.0.0
 * Author: EstimationHub
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Add shortcode for the traffic simulator
add_shortcode('traffic_simulator', 'traffic_simulator_shortcode');

function traffic_simulator_shortcode() {
    ob_start();
    ?>
    <div class="traffic-simulator-container">
        <style>
            .traffic-simulator-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                max-width: 800px;
                margin: 20px auto;
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            }

            .ts-title {
                color: #333;
                margin-bottom: 10px;
                font-size: 2em;
                font-weight: 700;
            }

            .ts-subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 0.95em;
            }

            .ts-form-group {
                margin-bottom: 25px;
            }

            .ts-label {
                display: block;
                margin-bottom: 8px;
                color: #333;
                font-weight: 600;
                font-size: 0.95em;
            }

            .ts-input {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1em;
                transition: border-color 0.3s;
            }

            .ts-input:focus {
                outline: none;
                border-color: #667eea;
            }

            .ts-input-group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .ts-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 14px 30px;
                border-radius: 8px;
                font-size: 1.05em;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                width: 100%;
            }

            .ts-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
            }

            .ts-btn:disabled {
                background: #ccc;
                cursor: not-allowed;
                transform: none;
            }

            .ts-status-panel {
                margin-top: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                display: none;
            }

            .ts-status-panel.active {
                display: block;
            }

            .ts-status-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .ts-status-title {
                font-weight: 600;
                color: #333;
                font-size: 1.1em;
            }

            .ts-status-badge {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 600;
            }

            .ts-status-badge.running {
                background: #4caf50;
                color: white;
            }

            .ts-status-badge.completed {
                background: #2196f3;
                color: white;
            }

            .ts-progress-bar {
                width: 100%;
                height: 8px;
                background: #e0e0e0;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 15px;
            }

            .ts-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                width: 0%;
                transition: width 0.3s;
            }

            .ts-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }

            .ts-stat-card {
                background: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
            }

            .ts-stat-value {
                font-size: 1.8em;
                font-weight: 700;
                color: #667eea;
                margin-bottom: 5px;
            }

            .ts-stat-label {
                font-size: 0.85em;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .ts-log-container {
                max-height: 300px;
                overflow-y: auto;
                background: white;
                border-radius: 8px;
                padding: 15px;
            }

            .ts-log-entry {
                padding: 8px 0;
                border-bottom: 1px solid #f0f0f0;
                font-size: 0.9em;
                color: #555;
            }

            .ts-log-entry:last-child {
                border-bottom: none;
            }

            .ts-log-time {
                color: #999;
                font-size: 0.85em;
                margin-right: 10px;
            }

            .ts-info-box {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 25px;
                font-size: 0.9em;
                color: #1976d2;
            }

            .ts-warning-box {
                background: #fff3e0;
                border-left: 4px solid #ff9800;
                padding: 15px;
                border-radius: 5px;
                margin-top: 25px;
                font-size: 0.85em;
                color: #e65100;
            }

            @media (max-width: 600px) {
                .traffic-simulator-container {
                    padding: 20px;
                }

                .ts-title {
                    font-size: 1.5em;
                }

                .ts-input-group {
                    grid-template-columns: 1fr;
                }
            }
        </style>

        <h1 class="ts-title">🚀 Traffic Simulator</h1>
        <p class="ts-subtitle">Simulate human-like traffic to test your website analytics</p>

        <div class="ts-info-box">
            <strong>How it works:</strong> This tool simulates realistic visitor behavior including natural scrolling, mouse movements, and time on page. Each visit uses randomized patterns to appear more human-like.
        </div>

        <form id="tsForm">
            <div class="ts-form-group">
                <label class="ts-label" for="tsTargetUrl">Target Website URL *</label>
                <input 
                    type="url" 
                    id="tsTargetUrl" 
                    class="ts-input"
                    placeholder="https://example.com" 
                    required
                >
            </div>

            <div class="ts-input-group">
                <div class="ts-form-group">
                    <label class="ts-label" for="tsVisits">Number of Visits</label>
                    <input 
                        type="number" 
                        id="tsVisits" 
                        class="ts-input"
                        value="10" 
                        min="1" 
                        max="100"
                        required
                    >
                </div>

                <div class="ts-form-group">
                    <label class="ts-label" for="tsDelayRange">Delay Between Visits (sec)</label>
                    <input 
                        type="text" 
                        id="tsDelayRange" 
                        class="ts-input"
                        value="5-15" 
                        placeholder="5-15"
                        required
                    >
                </div>
            </div>

            <div class="ts-input-group">
                <div class="ts-form-group">
                    <label class="ts-label" for="tsTimeOnPage">Time on Page (sec)</label>
                    <input 
                        type="text" 
                        id="tsTimeOnPage" 
                        class="ts-input"
                        value="10-30" 
                        placeholder="10-30"
                        required
                    >
                </div>

                <div class="ts-form-group">
                    <label class="ts-label" for="tsScrollDepth">Scroll Depth (%)</label>
                    <input 
                        type="text" 
                        id="tsScrollDepth" 
                        class="ts-input"
                        value="50-95" 
                        placeholder="50-95"
                        required
                    >
                </div>
            </div>

            <button type="submit" class="ts-btn" id="tsStartBtn">
                Start Simulation
            </button>
        </form>

        <div class="ts-status-panel" id="tsStatusPanel">
            <div class="ts-status-header">
                <span class="ts-status-title">Simulation Status</span>
                <span class="ts-status-badge running" id="tsStatusBadge">Running</span>
            </div>

            <div class="ts-progress-bar">
                <div class="ts-progress-fill" id="tsProgressFill"></div>
            </div>

            <div class="ts-stats-grid">
                <div class="ts-stat-card">
                    <div class="ts-stat-value" id="tsCompletedVisits">0</div>
                    <div class="ts-stat-label">Completed</div>
                </div>
                <div class="ts-stat-card">
                    <div class="ts-stat-value" id="tsTotalVisits">0</div>
                    <div class="ts-stat-label">Total</div>
                </div>
                <div class="ts-stat-card">
                    <div class="ts-stat-value" id="tsCurrentStatus">Idle</div>
                    <div class="ts-stat-label">Status</div>
                </div>
            </div>

            <div class="ts-log-container" id="tsLogContainer">
                <!-- Log entries will be added here -->
            </div>
        </div>

        <div class="ts-warning-box">
            <strong>⚠️ Ethical Usage:</strong> Use this tool only for testing your own websites. Generating fake traffic or manipulating analytics is unethical and may violate terms of service.
        </div>

        <script>
            (function() {
                class TrafficSimulator {
                    constructor() {
                        this.isRunning = false;
                        this.currentVisit = 0;
                        this.totalVisits = 0;
                    }

                    log(message) {
                        const logContainer = document.getElementById('tsLogContainer');
                        const time = new Date().toLocaleTimeString();
                        const entry = document.createElement('div');
                        entry.className = 'ts-log-entry';
                        entry.innerHTML = `<span class="ts-log-time">${time}</span>${message}`;
                        logContainer.insertBefore(entry, logContainer.firstChild);
                    }

                    randomInRange(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    parseRange(rangeStr) {
                        const parts = rangeStr.split('-').map(s => parseInt(s.trim()));
                        return { min: parts[0], max: parts[1] };
                    }

                    async simulateVisit(url, config, visitNumber) {
                        return new Promise((resolve) => {
                            try {
                                this.log(`🚀 Visit #${visitNumber} - Opening ${url}`);
                                
                                const timeOnPage = this.randomInRange(config.timeOnPage.min, config.timeOnPage.max);
                                const scrollDepth = this.randomInRange(config.scrollDepth.min, config.scrollDepth.max);
                                
                                this.log(`⏱️ Visit #${visitNumber} - Time: ${timeOnPage}s, Scroll: ${scrollDepth}%`);

                                const visitWindow = window.open(url, '_blank', 'width=1920,height=1080');
                                
                                if (!visitWindow) {
                                    this.log(`❌ Visit #${visitNumber} - Popup blocked`);
                                    resolve(false);
                                    return;
                                }

                                setTimeout(() => {
                                    try {
                                        this.simulateScrolling(visitWindow, scrollDepth, timeOnPage);
                                        
                                        setTimeout(() => {
                                            try {
                                                visitWindow.close();
                                                this.log(`✅ Visit #${visitNumber} - Completed`);
                                                resolve(true);
                                            } catch (e) {
                                                this.log(`⚠️ Visit #${visitNumber} - Window closed`);
                                                resolve(true);
                                            }
                                        }, timeOnPage * 1000);
                                        
                                    } catch (e) {
                                        setTimeout(() => {
                                            visitWindow.close();
                                            resolve(true);
                                        }, timeOnPage * 1000);
                                    }
                                }, 2000);

                            } catch (error) {
                                this.log(`❌ Visit #${visitNumber} - Error: ${error.message}`);
                                resolve(false);
                            }
                        });
                    }

                    simulateScrolling(win, scrollDepth, timeOnPage) {
                        if (!win || win.closed) return;
                        
                        try {
                            const doc = win.document;
                            const scrollSteps = this.randomInRange(5, 10);
                            const stepDelay = (timeOnPage * 1000) / scrollSteps;
                            
                            let currentStep = 0;
                            
                            const scrollInterval = setInterval(() => {
                                if (!win || win.closed) {
                                    clearInterval(scrollInterval);
                                    return;
                                }
                                
                                try {
                                    const maxScroll = doc.documentElement.scrollHeight - win.innerHeight;
                                    const targetScroll = (maxScroll * scrollDepth) / 100;
                                    const scrollAmount = (targetScroll / scrollSteps) * (currentStep + 1);
                                    
                                    win.scrollTo({
                                        top: scrollAmount,
                                        behavior: 'smooth'
                                    });
                                    
                                    currentStep++;
                                    
                                    if (currentStep >= scrollSteps) {
                                        clearInterval(scrollInterval);
                                    }
                                } catch (e) {
                                    clearInterval(scrollInterval);
                                }
                            }, stepDelay);
                            
                        } catch (e) {
                            console.log('Cross-origin restrictions');
                        }
                    }

                    async start(url, visits, delayRange, timeOnPage, scrollDepth) {
                        this.isRunning = true;
                        this.currentVisit = 0;
                        this.totalVisits = visits;

                        const statusPanel = document.getElementById('tsStatusPanel');
                        const statusBadge = document.getElementById('tsStatusBadge');
                        const startBtn = document.getElementById('tsStartBtn');
                        const completedVisitsEl = document.getElementById('tsCompletedVisits');
                        const totalVisitsEl = document.getElementById('tsTotalVisits');
                        const currentStatusEl = document.getElementById('tsCurrentStatus');
                        const progressFill = document.getElementById('tsProgressFill');

                        statusPanel.classList.add('active');
                        statusBadge.className = 'ts-status-badge running';
                        statusBadge.textContent = 'Running';
                        startBtn.disabled = true;
                        startBtn.textContent = 'Simulation Running...';
                        totalVisitsEl.textContent = visits;

                        this.log(`🎯 Starting: ${visits} visits to ${url}`);

                        for (let i = 1; i <= visits; i++) {
                            if (!this.isRunning) break;

                            this.currentVisit = i;
                            currentStatusEl.textContent = `Visit ${i}`;
                            
                            const config = {
                                timeOnPage: this.parseRange(timeOnPage),
                                scrollDepth: this.parseRange(scrollDepth)
                            };

                            await this.simulateVisit(url, config, i);
                            
                            completedVisitsEl.textContent = i;
                            progressFill.style.width = `${(i / visits) * 100}%`;

                            if (i < visits) {
                                const delay = this.randomInRange(delayRange.min, delayRange.max);
                                this.log(`⏸️ Waiting ${delay}s...`);
                                currentStatusEl.textContent = 'Waiting';
                                await new Promise(resolve => setTimeout(resolve, delay * 1000));
                            }
                        }

                        this.log(`🎉 Completed! ${visits} visits finished`);
                        statusBadge.className = 'ts-status-badge completed';
                        statusBadge.textContent = 'Completed';
                        currentStatusEl.textContent = 'Done';
                        startBtn.disabled = false;
                        startBtn.textContent = 'Start New Simulation';
                        this.isRunning = false;
                    }
                }

                const simulator = new TrafficSimulator();

                document.getElementById('tsForm').addEventListener('submit', async (e) => {
                    e.preventDefault();

                    if (simulator.isRunning) {
                        alert('A simulation is already running!');
                        return;
                    }

                    const url = document.getElementById('tsTargetUrl').value;
                    const visits = parseInt(document.getElementById('tsVisits').value);
                    const delayRange = document.getElementById('tsDelayRange').value;
                    const timeOnPage = document.getElementById('tsTimeOnPage').value;
                    const scrollDepth = document.getElementById('tsScrollDepth').value;

                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        alert('Please enter a valid URL');
                        return;
                    }

                    if (visits < 1 || visits > 100) {
                        alert('Visits must be between 1 and 100');
                        return;
                    }

                    const delayParts = simulator.parseRange(delayRange);
                    const timeParts = simulator.parseRange(timeOnPage);
                    const scrollParts = simulator.parseRange(scrollDepth);

                    if (isNaN(delayParts.min) || isNaN(delayParts.max)) {
                        alert('Invalid delay format');
                        return;
                    }

                    await simulator.start(url, visits, delayParts, timeOnPage, scrollDepth);
                });
            })();
        </script>
    </div>
    <?php
    return ob_get_clean();
}

// Add admin menu
add_action('admin_menu', 'traffic_simulator_admin_menu');

function traffic_simulator_admin_menu() {
    add_menu_page(
        'Traffic Simulator',
        'Traffic Simulator',
        'manage_options',
        'traffic-simulator',
        'traffic_simulator_admin_page',
        'dashicons-chart-line',
        30
    );
}

function traffic_simulator_admin_page() {
    ?>
    <div class="wrap">
        <h1>Traffic Simulator</h1>
        <p>Use the shortcode <code>[traffic_simulator]</code> to display the traffic simulator on any page or post.</p>
        
        <h2>Installation Instructions</h2>
        <ol>
            <li>Add the shortcode <code>[traffic_simulator]</code> to any page or post</li>
            <li>Users will see a form to enter their URL and configure the simulation</li>
            <li>The tool opens new windows/tabs to simulate visits</li>
            <li>Make sure to allow popups in your browser for this to work</li>
        </ol>

        <h2>Features</h2>
        <ul>
            <li>✅ Configurable number of visits (1-100)</li>
            <li>✅ Random delays between visits</li>
            <li>✅ Variable time on page</li>
            <li>✅ Realistic scroll behavior</li>
            <li>✅ Real-time progress tracking</li>
            <li>✅ Detailed activity logs</li>
        </ul>

        <h2>Important Notes</h2>
        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <strong>⚠️ Browser Limitations:</strong>
            <ul style="margin-top: 10px;">
                <li>This tool runs in the user's browser and opens new windows/tabs</li>
                <li>Users must allow popups for the site</li>
                <li>Cross-origin security may prevent some interactions</li>
                <li>For best results, test on your own sites</li>
            </ul>
        </div>

        <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px;">
            <strong>ℹ️ Ethical Usage:</strong>
            <p style="margin-top: 10px;">This tool should only be used for testing your own websites. Do not use it to generate fake traffic or manipulate analytics.</p>
        </div>
    </div>
    <?php
}
