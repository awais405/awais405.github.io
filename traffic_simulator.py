#!/usr/bin/env python3
"""
Human-Like Traffic Simulator for Website Testing

This script simulates realistic human-like traffic to a target website using
undetected_chromedriver to avoid bot detection. It's designed for testing
purposes such as verifying analytics tracking, page views, and impressions.

Requirements:
    pip install selenium undetected-chromedriver

Usage:
    python traffic_simulator.py <url> [--visits N] [--delay MIN-MAX]
    
Example:
    python traffic_simulator.py https://example.com --visits 20 --delay 10-30
"""

import argparse
import random
import time
import logging
from urllib.parse import urlparse
import sys

try:
    import undetected_chromedriver as uc
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.common.exceptions import TimeoutException, WebDriverException
except ImportError as e:
    print(f"Error: Missing required package - {e}")
    print("Please install required packages:")
    print("  pip install selenium undetected-chromedriver")
    sys.exit(1)


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)


# List of realistic User-Agent strings (Chrome on different platforms)
USER_AGENTS = [
    # Chrome on Windows
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    
    # Chrome on macOS
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    
    # Chrome on Linux
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
]


# Common real screen resolutions
SCREEN_RESOLUTIONS = [
    (1920, 1080),
    (1366, 768),
    (1440, 900),
    (1536, 864),
    (1280, 720),
    (1600, 900),
    (2560, 1440),
    (1920, 1200),
]


# Language settings
LANGUAGES = ['en-US', 'en-GB', 'en-CA']


def bezier_curve(start, end, num_points=20):
    """
    Generate points along a bezier curve for natural mouse movement.
    
    Args:
        start: Tuple (x, y) starting position
        end: Tuple (x, y) ending position
        num_points: Number of points to generate along the curve
        
    Returns:
        List of (x, y) tuples representing the curve
    """
    # Create control points for the bezier curve
    x0, y0 = start
    x3, y3 = end
    
    # Random control points for curve variation
    x1 = x0 + random.randint(-100, 100) + (x3 - x0) * 0.25
    y1 = y0 + random.randint(-100, 100) + (y3 - y0) * 0.25
    x2 = x0 + random.randint(-100, 100) + (x3 - x0) * 0.75
    y2 = y0 + random.randint(-100, 100) + (y3 - y0) * 0.75
    
    points = []
    for i in range(num_points):
        t = i / (num_points - 1)
        # Cubic bezier formula
        x = (1-t)**3 * x0 + 3*(1-t)**2*t * x1 + 3*(1-t)*t**2 * x2 + t**3 * x3
        y = (1-t)**3 * y0 + 3*(1-t)**2*t * y1 + 3*(1-t)*t**2 * y2 + t**3 * y3
        points.append((int(x), int(y)))
    
    return points


class HumanLikeTrafficSimulator:
    """Simulates human-like traffic to a website for testing purposes."""
    
    def __init__(self, target_url, visits=10, delay_range=(5, 30)):
        """
        Initialize the traffic simulator.
        
        Args:
            target_url: The target website URL to visit
            visits: Number of visits/impressions to simulate
            delay_range: Tuple (min, max) seconds delay between visits
        """
        self.target_url = target_url
        self.visits = visits
        self.delay_range = delay_range
        self.domain = urlparse(target_url).netloc
        
    def create_driver(self, visit_num):
        """
        Create a new ChromeDriver instance with randomized fingerprint.
        
        Args:
            visit_num: Current visit number for logging
            
        Returns:
            Configured webdriver instance
        """
        # Randomly select user agent
        user_agent = random.choice(USER_AGENTS)
        
        # Randomly select screen resolution
        width, height = random.choice(SCREEN_RESOLUTIONS)
        
        # Randomly select language
        language = random.choice(LANGUAGES)
        
        logger.info(f"Visit #{visit_num} - User-Agent: {user_agent[:50]}...")
        logger.info(f"Visit #{visit_num} - Resolution: {width}x{height}")
        logger.info(f"Visit #{visit_num} - Language: {language}")
        
        # Configure Chrome options
        options = uc.ChromeOptions()
        
        # Headless mode (but with realistic settings)
        options.add_argument('--headless=new')
        
        # Set user agent
        options.add_argument(f'--user-agent={user_agent}')
        
        # Set window size
        options.add_argument(f'--window-size={width},{height}')
        
        # Set language
        options.add_argument(f'--lang={language}')
        
        # Additional realistic arguments
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-gpu')
        
        # Randomize some additional settings
        if random.random() > 0.5:
            options.add_argument('--start-maximized')
        
        try:
            driver = uc.Chrome(options=options)
            driver.set_page_load_timeout(30)
            
            # Set window size again to ensure it's applied
            driver.set_window_size(width, height)
            
            return driver
        except Exception as e:
            logger.error(f"Failed to create driver: {e}")
            raise
    
    def smooth_scroll(self, driver, scroll_depth_percent):
        """
        Perform smooth scrolling with natural pauses.
        
        Args:
            driver: Selenium webdriver instance
            scroll_depth_percent: Percentage of page to scroll (0-100)
        """
        # Get page height
        total_height = driver.execute_script("return document.body.scrollHeight")
        target_scroll = int(total_height * scroll_depth_percent / 100)
        
        # Number of scroll steps
        num_scrolls = random.randint(5, 10)
        scroll_step = target_scroll // num_scrolls
        
        current_position = 0
        
        for i in range(num_scrolls):
            # Calculate next position with some randomness
            next_position = current_position + scroll_step + random.randint(-50, 50)
            next_position = min(next_position, target_scroll)
            
            # Smooth scroll using JavaScript
            driver.execute_script(f"window.scrollTo({{top: {next_position}, behavior: 'smooth'}});")
            
            current_position = next_position
            
            # Pause as if reading
            time.sleep(random.uniform(0.5, 2.5))
            
            # Occasionally scroll back up a bit
            if random.random() < 0.2 and i > 0:
                back_scroll = current_position - random.randint(50, 200)
                back_scroll = max(0, back_scroll)
                driver.execute_script(f"window.scrollTo({{top: {back_scroll}, behavior: 'smooth'}});")
                time.sleep(random.uniform(0.5, 1.5))
                current_position = back_scroll
        
        logger.info(f"Scrolled to {scroll_depth_percent}% of page")
    
    def simulate_mouse_movement(self, driver):
        """
        Simulate natural mouse movements on the page.
        
        Args:
            driver: Selenium webdriver instance
        """
        try:
            # Get window size
            width = driver.execute_script("return window.innerWidth")
            height = driver.execute_script("return window.innerHeight")
            
            # Generate random points to move to
            num_movements = random.randint(2, 5)
            
            action = ActionChains(driver, duration=random.randint(500, 1500))
            
            current_x, current_y = width // 2, height // 2
            
            for _ in range(num_movements):
                # Random target position
                target_x = random.randint(100, width - 100)
                target_y = random.randint(100, height - 100)
                
                # Generate bezier curve
                curve_points = bezier_curve((current_x, current_y), (target_x, target_y), 
                                           num_points=random.randint(10, 20))
                
                # Move along the curve
                for x, y in curve_points[1:]:  # Skip first point (current position)
                    action.move_by_offset(x - current_x, y - current_y)
                    current_x, current_y = x, y
                
                # Small pause at each point
                time.sleep(random.uniform(0.1, 0.5))
            
            action.perform()
            logger.info("Performed natural mouse movements")
            
        except Exception as e:
            logger.debug(f"Mouse movement simulation failed: {e}")
    
    def hover_random_elements(self, driver):
        """
        Hover over random visible elements on the page.
        
        Args:
            driver: Selenium webdriver instance
        """
        try:
            # Find visible elements (links, images, etc.)
            selectors = ['a', 'img', 'button', 'h1', 'h2', 'p']
            elements = []
            
            for selector in selectors:
                found = driver.find_elements(By.CSS_SELECTOR, selector)
                elements.extend([el for el in found if el.is_displayed()])
            
            if elements:
                # Hover over 1-3 random elements
                num_hovers = random.randint(1, min(3, len(elements)))
                selected_elements = random.sample(elements, num_hovers)
                
                for element in selected_elements:
                    try:
                        ActionChains(driver).move_to_element(element).perform()
                        time.sleep(random.uniform(0.5, 2.0))
                        logger.info("Hovered over element")
                    except Exception:
                        continue
                        
        except Exception as e:
            logger.debug(f"Element hover failed: {e}")
    
    def click_internal_link(self, driver):
        """
        Occasionally click on an internal link (same domain).
        
        Args:
            driver: Selenium webdriver instance
        """
        try:
            # Find all links on the same domain
            links = driver.find_elements(By.TAG_NAME, 'a')
            internal_links = []
            
            for link in links:
                try:
                    href = link.get_attribute('href')
                    if href and link.is_displayed():
                        parsed = urlparse(href)
                        if parsed.netloc == self.domain or not parsed.netloc:
                            internal_links.append(link)
                except Exception:
                    continue
            
            if internal_links:
                # Click a random internal link
                link = random.choice(internal_links)
                link.click()
                
                # Stay briefly on the new page
                wait_time = random.uniform(3, 10)
                logger.info(f"Clicked internal link, staying for {wait_time:.1f}s")
                time.sleep(wait_time)
                
                # Go back
                driver.back()
                time.sleep(random.uniform(1, 3))
                
        except Exception as e:
            logger.debug(f"Internal link click failed: {e}")
    
    def simulate_visit(self, visit_num):
        """
        Simulate a single visit to the target URL.
        
        Args:
            visit_num: Current visit number
            
        Returns:
            True if successful, False otherwise
        """
        driver = None
        
        try:
            # Generate random time on page (10-70 seconds)
            time_on_page = random.uniform(10, 70)
            logger.info(f"Visit #{visit_num} started - Target time on page: {time_on_page:.1f}s")
            
            start_time = time.time()
            
            # Create driver with randomized settings
            driver = self.create_driver(visit_num)
            
            # Navigate to target URL
            driver.get(self.target_url)
            logger.info(f"Visit #{visit_num} - Page loaded: {self.target_url}")
            
            # Initial wait (as if reading the page)
            initial_wait = random.uniform(2, 8)
            time.sleep(initial_wait)
            
            elapsed = time.time() - start_time
            remaining_time = time_on_page - elapsed
            
            # Perform actions while managing time budget
            actions_budget = remaining_time * 0.8  # Reserve 20% for final wait
            actions_start = time.time()
            
            # Simulate mouse movements (30% chance)
            if random.random() < 0.3 and time.time() - actions_start < actions_budget:
                self.simulate_mouse_movement(driver)
            
            # Scroll the page naturally (always do this)
            scroll_depth = random.uniform(50, 95)
            if time.time() - actions_start < actions_budget:
                self.smooth_scroll(driver, scroll_depth)
            
            # Hover over elements (30-50% chance)
            if random.random() < 0.4 and time.time() - actions_start < actions_budget:
                self.hover_random_elements(driver)
            
            # Click internal link (10% chance)
            if random.random() < 0.1 and time.time() - actions_start < actions_budget:
                self.click_internal_link(driver)
            
            # Wait for remaining time
            elapsed = time.time() - start_time
            if elapsed < time_on_page:
                final_wait = time_on_page - elapsed
                time.sleep(final_wait)
            
            actual_time = time.time() - start_time
            logger.info(f"Visit #{visit_num} completed - Actual time: {actual_time:.1f}s")
            
            return True
            
        except TimeoutException:
            logger.error(f"Visit #{visit_num} failed - Page load timeout")
            return False
            
        except WebDriverException as e:
            logger.error(f"Visit #{visit_num} failed - WebDriver error: {e}")
            return False
            
        except Exception as e:
            logger.error(f"Visit #{visit_num} failed - Unexpected error: {e}")
            return False
            
        finally:
            if driver:
                try:
                    driver.quit()
                except Exception:
                    pass
    
    def run(self):
        """
        Run the traffic simulation for the specified number of visits.
        
        Returns:
            Tuple (successful_visits, failed_visits)
        """
        logger.info(f"Starting traffic simulation to {self.target_url}")
        logger.info(f"Total visits: {self.visits}")
        logger.info(f"Delay between visits: {self.delay_range[0]}-{self.delay_range[1]} seconds")
        logger.info("-" * 80)
        
        successful = 0
        failed = 0
        
        for i in range(1, self.visits + 1):
            if self.simulate_visit(i):
                successful += 1
            else:
                failed += 1
            
            # Random delay before next visit (except after last visit)
            if i < self.visits:
                delay = random.uniform(self.delay_range[0], self.delay_range[1])
                logger.info(f"Waiting {delay:.1f}s before next visit...")
                logger.info("-" * 80)
                time.sleep(delay)
        
        logger.info("=" * 80)
        logger.info("Traffic simulation completed")
        logger.info(f"Successful visits: {successful}/{self.visits}")
        logger.info(f"Failed visits: {failed}/{self.visits}")
        
        return successful, failed


def parse_arguments():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(
        description='Simulate human-like traffic to a website for testing purposes',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python traffic_simulator.py https://example.com
  python traffic_simulator.py https://example.com --visits 20
  python traffic_simulator.py https://example.com --visits 50 --delay 10-30
        """
    )
    
    parser.add_argument(
        'url',
        help='Target website URL to visit'
    )
    
    parser.add_argument(
        '--visits', '-v',
        type=int,
        default=10,
        help='Number of visits/impressions to simulate (default: 10)'
    )
    
    parser.add_argument(
        '--delay', '-d',
        type=str,
        default='5-30',
        help='Delay range between visits in seconds, format: MIN-MAX (default: 5-30)'
    )
    
    return parser.parse_args()


def main():
    """Main entry point for the script."""
    args = parse_arguments()
    
    # Parse delay range
    try:
        delay_parts = args.delay.split('-')
        if len(delay_parts) != 2:
            raise ValueError
        delay_min = int(delay_parts[0])
        delay_max = int(delay_parts[1])
        if delay_min < 0 or delay_max < delay_min:
            raise ValueError
        delay_range = (delay_min, delay_max)
    except ValueError:
        logger.error("Invalid delay format. Use MIN-MAX (e.g., 5-30)")
        sys.exit(1)
    
    # Validate visits
    if args.visits < 1:
        logger.error("Number of visits must be at least 1")
        sys.exit(1)
    
    # Validate URL
    parsed = urlparse(args.url)
    if not parsed.scheme or not parsed.netloc:
        logger.error("Invalid URL. Must include scheme (http:// or https://)")
        sys.exit(1)
    
    # Create and run simulator
    simulator = HumanLikeTrafficSimulator(
        target_url=args.url,
        visits=args.visits,
        delay_range=delay_range
    )
    
    try:
        successful, failed = simulator.run()
        
        # Exit with error code if all visits failed
        if failed == args.visits:
            sys.exit(1)
            
    except KeyboardInterrupt:
        logger.info("\nTraffic simulation interrupted by user")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
