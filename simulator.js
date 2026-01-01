// Website Interaction Simulator
// Advanced tool for simulating realistic user behavior

class InteractionSimulator {
    constructor() {
        this.stats = {
            totalClicks: 0,
            scrollDepth: 0,
            timeOnPage: 0,
            interactions: 0,
            adViewability: 0,
            entropyScore: 0
        };

        this.timers = {
            clickSimulation: null,
            scrollSimulation: null,
            behaviorSimulation: null,
            timeOnPageTimer: null,
            adViewabilityTimer: null
        };

        this.isRunning = {
            clicks: false,
            scroll: false,
            behavior: false
        };

        this.browserEntropy = null;
        this.startTime = Date.now();
        this.mouseTrail = [];
        this.scrollHistory = [];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTimeOnPageTracking();
        this.setupScrollTracking();
        this.setupAdViewabilityTracking();
        this.generateBrowserEntropy();
        this.log('Simulator initialized', 'info');
    }

    setupEventListeners() {
        // Click simulation
        document.getElementById('startClicks').addEventListener('click', () => this.startClickSimulation());
        document.getElementById('stopClicks').addEventListener('click', () => this.stopClickSimulation());

        // Scroll simulation
        document.getElementById('startScroll').addEventListener('click', () => this.startScrollSimulation());
        document.getElementById('stopScroll').addEventListener('click', () => this.stopScrollSimulation());

        // Behavior simulation
        document.getElementById('startBehavior').addEventListener('click', () => this.startBehaviorSimulation());
        document.getElementById('stopBehavior').addEventListener('click', () => this.stopBehaviorSimulation());

        // Browser entropy
        document.getElementById('generateEntropy').addEventListener('click', () => this.generateBrowserEntropy(true));
        document.getElementById('viewEntropy').addEventListener('click', () => this.showEntropyDetails());

        // Manual clicks on elements
        document.querySelectorAll('.clickable').forEach(element => {
            element.addEventListener('click', (e) => this.handleManualClick(e));
        });

        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => this.trackMouseMovement(e));
    }

    // ============================================
    // CLICK SIMULATION
    // ============================================

    startClickSimulation() {
        if (this.isRunning.clicks) {
            this.log('Click simulation already running', 'warning');
            return;
        }

        const count = parseInt(document.getElementById('clickCount').value);
        const interval = parseInt(document.getElementById('clickInterval').value);
        const randomness = parseInt(document.getElementById('clickRandomness').value);

        this.isRunning.clicks = true;
        this.log(`Starting click simulation: ${count} clicks with ${interval}ms interval`, 'info');

        let clicksPerformed = 0;

        const performClick = () => {
            if (!this.isRunning.clicks || clicksPerformed >= count) {
                this.stopClickSimulation();
                return;
            }

            const elements = document.querySelectorAll('.clickable');
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            
            this.simulateClick(randomElement);
            clicksPerformed++;

            // Apply randomness to interval
            const randomDelay = interval + (Math.random() * 2 - 1) * (interval * randomness / 100);
            this.timers.clickSimulation = setTimeout(performClick, Math.max(100, randomDelay));
        };

        performClick();
    }

    stopClickSimulation() {
        if (this.timers.clickSimulation) {
            clearTimeout(this.timers.clickSimulation);
            this.timers.clickSimulation = null;
        }
        this.isRunning.clicks = false;
        this.log('Click simulation stopped', 'info');
    }

    simulateClick(element) {
        // Visual feedback
        element.classList.add('clicked');
        setTimeout(() => element.classList.remove('clicked'), 300);

        // Update stats
        this.stats.totalClicks++;
        this.stats.interactions++;
        this.updateStats();

        const elementId = element.getAttribute('data-id');
        this.log(`Simulated click on Element ${elementId}`, 'success');

        // Trigger actual click event
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        element.dispatchEvent(event);
    }

    handleManualClick(e) {
        this.stats.totalClicks++;
        this.stats.interactions++;
        this.updateStats();
        
        const elementId = e.target.getAttribute('data-id');
        this.log(`Manual click on Element ${elementId}`, 'success');
    }

    // ============================================
    // SCROLL SIMULATION
    // ============================================

    startScrollSimulation() {
        if (this.isRunning.scroll) {
            this.log('Scroll simulation already running', 'warning');
            return;
        }

        const speed = document.getElementById('scrollSpeed').value;
        const pattern = document.getElementById('scrollPattern').value;

        this.isRunning.scroll = true;
        this.log(`Starting scroll simulation: ${pattern} pattern at ${speed} speed`, 'info');

        this.performScrollSimulation(speed, pattern);
    }

    stopScrollSimulation() {
        if (this.timers.scrollSimulation) {
            clearTimeout(this.timers.scrollSimulation);
            this.timers.scrollSimulation = null;
        }
        this.isRunning.scroll = false;
        this.log('Scroll simulation stopped', 'info');
    }

    performScrollSimulation(speed, pattern) {
        if (!this.isRunning.scroll) return;

        const speedMap = { slow: 50, medium: 30, fast: 15 };
        const scrollAmount = speedMap[speed] || 30;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.pageYOffset;

        let nextScroll;

        switch (pattern) {
            case 'linear':
                nextScroll = currentScroll + scrollAmount;
                break;
            case 'random':
                nextScroll = currentScroll + (Math.random() > 0.5 ? scrollAmount : -scrollAmount / 2);
                break;
            case 'reading':
                // Simulate reading pattern with pauses
                if (Math.random() > 0.7) {
                    setTimeout(() => {
                        this.performScrollSimulation(speed, pattern);
                    }, Math.random() * 1000 + 500);
                    return;
                }
                nextScroll = currentScroll + scrollAmount;
                break;
        }

        nextScroll = Math.max(0, Math.min(nextScroll, maxScroll));
        window.scrollTo({ top: nextScroll, behavior: 'smooth' });

        this.scrollHistory.push({ time: Date.now(), position: nextScroll });
        this.stats.interactions++;

        // Continue scrolling
        const delay = pattern === 'reading' ? Math.random() * 200 + 100 : 100;
        this.timers.scrollSimulation = setTimeout(() => {
            this.performScrollSimulation(speed, pattern);
        }, delay);
    }

    setupScrollTracking() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateScrollDepth();
            }, 100);
        });
    }

    updateScrollDepth() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;
        this.stats.scrollDepth = Math.min(100, Math.round(scrollPercentage));
        this.updateStats();
    }

    // ============================================
    // BEHAVIOR PATTERNS
    // ============================================

    startBehaviorSimulation() {
        if (this.isRunning.behavior) {
            this.log('Behavior simulation already running', 'warning');
            return;
        }

        const mousePattern = document.getElementById('mousePattern').value;
        const behaviorType = document.getElementById('behaviorType').value;

        this.isRunning.behavior = true;
        this.log(`Starting behavior simulation: ${behaviorType} with ${mousePattern} mouse pattern`, 'info');

        this.performBehaviorSimulation(mousePattern, behaviorType);
    }

    stopBehaviorSimulation() {
        if (this.timers.behaviorSimulation) {
            clearTimeout(this.timers.behaviorSimulation);
            this.timers.behaviorSimulation = null;
        }
        this.isRunning.behavior = false;
        this.log('Behavior simulation stopped', 'info');
    }

    performBehaviorSimulation(mousePattern, behaviorType) {
        if (!this.isRunning.behavior) return;

        // Simulate different behavior types
        const behaviorMap = {
            engaged: { clickChance: 0.3, scrollChance: 0.4, pauseTime: 2000 },
            casual: { clickChance: 0.15, scrollChance: 0.3, pauseTime: 3000 },
            scanner: { clickChance: 0.05, scrollChance: 0.6, pauseTime: 500 }
        };

        const behavior = behaviorMap[behaviorType];

        // Random action based on behavior
        if (Math.random() < behavior.clickChance && !this.isRunning.clicks) {
            const elements = document.querySelectorAll('.clickable');
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            this.simulateClick(randomElement);
        }

        if (Math.random() < behavior.scrollChance && !this.isRunning.scroll) {
            const scrollAmount = Math.random() * 200 - 100;
            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }

        // Simulate mouse movement
        this.simulateMouseMovement(mousePattern);

        // Continue behavior simulation
        const delay = behavior.pauseTime + Math.random() * 1000;
        this.timers.behaviorSimulation = setTimeout(() => {
            this.performBehaviorSimulation(mousePattern, behaviorType);
        }, delay);
    }

    simulateMouseMovement(pattern) {
        // This would need more complex implementation for actual mouse movement simulation
        // For now, we'll just track that behavior is active
        this.log(`Mouse movement pattern: ${pattern}`, 'info');
    }

    trackMouseMovement(e) {
        const now = Date.now();
        this.mouseTrail.push({ x: e.clientX, y: e.clientY, time: now });

        // Keep only last 50 positions
        if (this.mouseTrail.length > 50) {
            this.mouseTrail.shift();
        }

        // Calculate mouse movement entropy
        if (this.mouseTrail.length > 2) {
            const entropy = this.calculateMouseEntropy();
            // Update entropy score occasionally
            if (Math.random() < 0.01) {
                this.stats.entropyScore = Math.round(entropy);
                this.updateStats();
            }
        }
    }

    calculateMouseEntropy() {
        if (this.mouseTrail.length < 3) return 0;

        let totalDistance = 0;
        let directions = [];

        for (let i = 1; i < this.mouseTrail.length; i++) {
            const prev = this.mouseTrail[i - 1];
            const curr = this.mouseTrail[i];
            
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            totalDistance += distance;
            
            if (distance > 0) {
                const angle = Math.atan2(dy, dx);
                directions.push(angle);
            }
        }

        // Calculate entropy based on direction changes and distance
        let entropy = totalDistance / this.mouseTrail.length;
        
        // Add direction variance
        if (directions.length > 1) {
            let directionVariance = 0;
            for (let i = 1; i < directions.length; i++) {
                directionVariance += Math.abs(directions[i] - directions[i - 1]);
            }
            entropy += (directionVariance / directions.length) * 10;
        }

        return Math.min(100, entropy);
    }

    // ============================================
    // BROWSER ENTROPY (FINGERPRINTING)
    // ============================================

    generateBrowserEntropy(notify = false) {
        const entropy = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory || 'unknown',
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            plugins: this.getPluginsList(),
            canvas: this.getCanvasFingerprint(),
            webgl: this.getWebGLFingerprint(),
            fonts: this.detectFonts(),
            audio: this.getAudioFingerprint(),
            touchSupport: 'ontouchstart' in window,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            localStorage: this.testLocalStorage(),
            sessionStorage: this.testSessionStorage(),
            indexedDB: !!window.indexedDB,
            timestamp: Date.now()
        };

        this.browserEntropy = entropy;
        
        // Calculate entropy score
        const entropyString = JSON.stringify(entropy);
        this.stats.entropyScore = this.calculateEntropyScore(entropyString);
        this.updateStats();

        if (notify) {
            this.log('Browser entropy generated successfully', 'success');
            this.log(`Entropy score: ${this.stats.entropyScore}`, 'info');
        }

        return entropy;
    }

    getPluginsList() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push(navigator.plugins[i].name);
        }
        return plugins;
    }

    getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const text = 'Browser Fingerprint 🎯 123';
            
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText(text, 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText(text, 4, 17);
            
            return canvas.toDataURL().slice(-50);
        } catch (e) {
            return 'unavailable';
        }
    }

    getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return 'unavailable';
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                vendor: gl.getParameter(gl.VENDOR),
                renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown'
            };
        } catch (e) {
            return 'unavailable';
        }
    }

    detectFonts() {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino'];
        const detected = [];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        for (const font of testFonts) {
            ctx.font = `72px ${font}, ${baseFonts[0]}`;
            const width = ctx.measureText('mmmmmmmmmmlli').width;
            
            ctx.font = `72px ${baseFonts[0]}`;
            const baseWidth = ctx.measureText('mmmmmmmmmmlli').width;
            
            if (width !== baseWidth) {
                detected.push(font);
            }
        }

        return detected;
    }

    getAudioFingerprint() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return 'unavailable';

            const context = new AudioContext();
            const oscillator = context.createOscillator();
            const analyser = context.createAnalyser();
            const gainNode = context.createGain();
            
            gainNode.gain.value = 0;
            oscillator.connect(analyser);
            analyser.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.start(0);
            
            return 'available';
        } catch (e) {
            return 'unavailable';
        }
    }

    testLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    testSessionStorage() {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    calculateEntropyScore(data) {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash % 100);
    }

    showEntropyDetails() {
        if (!this.browserEntropy) {
            this.generateBrowserEntropy(true);
        }

        this.log('=== Browser Entropy Details ===', 'info');
        this.log(`User Agent: ${this.browserEntropy.userAgent.substring(0, 50)}...`, 'info');
        this.log(`Platform: ${this.browserEntropy.platform}`, 'info');
        this.log(`Screen: ${this.browserEntropy.screenResolution}`, 'info');
        this.log(`Color Depth: ${this.browserEntropy.colorDepth}`, 'info');
        this.log(`Timezone: ${this.browserEntropy.timezone}`, 'info');
        this.log(`Canvas: ${this.browserEntropy.canvas}`, 'info');
        this.log(`Plugins: ${this.browserEntropy.plugins.length} detected`, 'info');
        this.log(`Fonts: ${this.browserEntropy.fonts.join(', ')}`, 'info');
        this.log('==============================', 'info');
    }

    // ============================================
    // TIME ON PAGE TRACKING
    // ============================================

    startTimeOnPageTracking() {
        this.timers.timeOnPageTimer = setInterval(() => {
            this.stats.timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateStats();
        }, 1000);
    }

    // ============================================
    // AD VIEWABILITY TRACKING
    // ============================================

    setupAdViewabilityTracking() {
        const adContainer = document.getElementById('adContainer');
        const adProgress = document.getElementById('adProgress');
        
        let viewableTime = 0;
        let totalTime = 0;

        this.timers.adViewabilityTimer = setInterval(() => {
            totalTime += 100;

            const rect = adContainer.getBoundingClientRect();
            const isViewable = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isViewable) {
                viewableTime += 100;
                adContainer.classList.add('viewable');
            } else {
                adContainer.classList.remove('viewable');
            }

            const viewability = totalTime > 0 ? (viewableTime / totalTime) * 100 : 0;
            this.stats.adViewability = Math.round(viewability);
            adProgress.style.width = `${this.stats.adViewability}%`;
            this.updateStats();
        }, 100);
    }

    // ============================================
    // STATS AND LOGGING
    // ============================================

    updateStats() {
        document.getElementById('totalClicks').textContent = this.stats.totalClicks;
        document.getElementById('scrollDepth').textContent = `${this.stats.scrollDepth}%`;
        document.getElementById('timeOnPage').textContent = `${this.stats.timeOnPage}s`;
        document.getElementById('interactions').textContent = this.stats.interactions;
        document.getElementById('adViewability').textContent = `${this.stats.adViewability}%`;
        document.getElementById('entropyScore').textContent = this.stats.entropyScore;
    }

    log(message, type = 'info') {
        const logContainer = document.getElementById('logContainer');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        const timestamp = new Date().toLocaleTimeString();
        entry.textContent = `[${timestamp}] ${message}`;
        
        logContainer.insertBefore(entry, logContainer.firstChild);

        // Keep only last 50 entries
        while (logContainer.children.length > 50) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    // ============================================
    // CLEANUP
    // ============================================

    cleanup() {
        Object.values(this.timers).forEach(timer => {
            if (timer) clearTimeout(timer);
        });
    }
}

// Initialize the simulator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.simulator = new InteractionSimulator();
    });
} else {
    window.simulator = new InteractionSimulator();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.simulator) {
        window.simulator.cleanup();
    }
});
