import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()
        
        try:
            print("Navigating to app...")
            page.goto("http://localhost:5173")
            
            # Wait for key elements
            print("Waiting for Timer...")
            page.wait_for_selector(".glass-widget") 
            time.sleep(2)
            
            # Interact: Click on the first task to highlight it
            print("Clicking on first task...")
            # Use force=True to bypass stability check due to animation
            page.get_by_text("Morning Standup Notes").first.click(force=True)
            print("Clicked task.")
            
            # Interact: Set volumes for other tracks to see colors
            print("Setting volumes...")
            # Locate all range inputs
            inputs = page.locator('input[type="range"]')
            count = inputs.count()
            print(f"Found {count} sliders.")
            
            for i in range(count):
                # Set to 50%
                # Using evaluate is safer for range
                inputs.nth(i).evaluate("el => { el.value = 50; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }")
                time.sleep(0.5)
                
            # Wait for highlight animation and volume update
            time.sleep(2)
            
            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification_screenshot.png")
            print("Screenshot saved to verification_screenshot.png")
            
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_screenshot_2.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
