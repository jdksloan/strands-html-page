/**
 * Main page spinner functionality
 * Handles the show/hide spinner feature on the home page
 */

class SpinnerController {
    constructor() {
        this.spinner = null;
        this.showBtn = null;
        this.hideBtn = null;
        this.status = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupElements());
        } else {
            this.setupElements();
        }
    }

    setupElements() {
        // Get references to DOM elements
        this.spinner = document.getElementById('spinner');
        this.showBtn = document.getElementById('showSpinner');
        this.hideBtn = document.getElementById('hideSpinner');
        this.status = document.getElementById('status');

        if (!this.spinner || !this.showBtn || !this.hideBtn || !this.status) {
            console.error('Required DOM elements not found for SpinnerController');
            return;
        }

        this.setupEventListeners();
        this.setupAutoDemo();
    }

    setupEventListeners() {
        // Add event listeners to buttons
        this.showBtn.addEventListener('click', () => this.showSpinner());
        this.hideBtn.addEventListener('click', () => this.hideSpinner());
    }

    setupAutoDemo() {
        // Optional: Auto-show spinner for demo when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.showSpinner();
                // Auto-hide after 3 seconds for demo
                setTimeout(() => this.hideSpinner(), 3000);
            }, 1000);
        });
    }

    showSpinner() {
        if (!this.spinner || !this.showBtn || !this.hideBtn || !this.status) return;
        
        this.spinner.style.display = 'block';
        this.showBtn.disabled = true;
        this.hideBtn.disabled = false;
        this.status.textContent = 'Spinner is running... Click "Hide Spinner" to stop it.';
    }

    hideSpinner() {
        if (!this.spinner || !this.showBtn || !this.hideBtn || !this.status) return;
        
        this.spinner.style.display = 'none';
        this.showBtn.disabled = false;
        this.hideBtn.disabled = true;
        this.status.textContent = 'Spinner is hidden. Click "Show Spinner" to see it again!';
    }
}

// Initialize the spinner controller
new SpinnerController();