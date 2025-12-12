/**
 * Random Gallery Application
 * Displays random images using reliable APIs with robust fallback mechanisms
 */

class RandomGallery {
    constructor() {
        // DOM element references
        this.imageContainer = null;
        this.randomImage = null;
        this.loadingPlaceholder = null;
        this.errorMessage = null;
        this.newImageBtn = null;
        this.refreshBtn = null;
        this.imageSource = null;
        
        // Configuration for image dimensions and sources
        this.imageConfig = {
            width: 500,
            height: 400,
            minWidth: 400,
            maxWidth: 600,
            minHeight: 300,
            maxHeight: 500
        };
        
        // Multiple reliable image sources for fallback
        this.imageSources = [
            {
                name: 'Picsum Photos',
                generateUrl: () => {
                    const width = this.getRandomDimension(this.imageConfig.minWidth, this.imageConfig.maxWidth);
                    const height = this.getRandomDimension(this.imageConfig.minHeight, this.imageConfig.maxHeight);
                    const imageId = Math.floor(Math.random() * 1000) + 1;
                    return `https://picsum.photos/${width}/${height}?random=${Date.now()}-${imageId}`;
                },
                alt: 'Random beautiful image'
            },
            {
                name: 'Lorem Picsum ID',
                generateUrl: () => {
                    const width = this.imageConfig.width;
                    const height = this.imageConfig.height;
                    const imageId = Math.floor(Math.random() * 1000) + 1;
                    return `https://picsum.photos/id/${imageId}/${width}/${height}`;
                },
                alt: 'Curated random image'
            },
            {
                name: 'Lorem Picsum Grayscale',
                generateUrl: () => {
                    const width = this.imageConfig.width;
                    const height = this.imageConfig.height;
                    return `https://picsum.photos/${width}/${height}?grayscale&random=${Date.now()}`;
                },
                alt: 'Artistic grayscale image'
            }
        ];
        
        this.currentSourceIndex = 0;
        this.retryCount = 0;
        this.maxRetries = 3;
        
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
        // Get DOM element references
        this.imageContainer = document.getElementById('imageContainer');
        this.randomImage = document.getElementById('randomImage');
        this.loadingPlaceholder = document.getElementById('loadingPlaceholder');
        this.errorMessage = document.getElementById('errorMessage');
        this.newImageBtn = document.getElementById('newImageBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.imageSource = document.getElementById('imageSource');

        if (!this.imageContainer || !this.randomImage || !this.loadingPlaceholder ||
            !this.errorMessage || !this.newImageBtn || !this.refreshBtn || !this.imageSource) {
            console.error('Required DOM elements not found for RandomGallery');
            return;
        }

        this.setupEventListeners();
        this.setupVisibilityHandling();
        this.loadRandomImage();
    }

    setupEventListeners() {
        // Button event listeners
        this.newImageBtn.addEventListener('click', () => this.loadRandomImage());
        this.refreshBtn.addEventListener('click', () => window.location.reload());
        
        // Image loading event listeners
        this.randomImage.addEventListener('load', () => this.onImageLoad());
        this.randomImage.addEventListener('error', () => this.onImageError());
    }

    setupVisibilityHandling() {
        // Load new image when the page becomes visible (handles refresh case)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Small delay to ensure the page is fully loaded
                setTimeout(() => {
                    this.loadRandomImage();
                }, 100);
            }
        });
    }

    getRandomDimension(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async loadRandomImage() {
        this.showLoading();
        this.hideError();
        this.disableButtons();
        this.retryCount = 0;

        try {
            await this.tryLoadImage();
        } catch (error) {
            console.error('Error loading random image:', error);
            this.onImageError();
        }
    }

    async tryLoadImage() {
        const source = this.imageSources[this.currentSourceIndex % this.imageSources.length];
        const imageUrl = source.generateUrl();
        
        console.log(`Attempting to load image from ${source.name}: ${imageUrl}`);
        
        // Update alt text
        this.randomImage.alt = source.alt;
        
        // Preload the image to handle loading states properly
        await this.preloadImage(imageUrl);
        
        // Update image source info
        this.updateImageSource(source.name);
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            // Set a timeout to prevent hanging
            const timeout = setTimeout(() => {
                reject(new Error('Image load timeout'));
            }, 10000); // 10 second timeout
            
            img.onload = () => {
                clearTimeout(timeout);
                this.randomImage.src = url;
                resolve();
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                reject(new Error('Failed to load image'));
            };
            
            img.src = url;
        });
    }

    onImageLoad() {
        this.hideLoading();
        this.hideError();
        this.randomImage.classList.add('loaded');
        this.enableButtons();
        this.retryCount = 0; // Reset retry count on successful load
        console.log('Image loaded successfully');
    }

    async onImageError() {
        console.error('Image failed to load, attempting fallback...');
        
        this.retryCount++;
        
        if (this.retryCount <= this.maxRetries) {
            // Try next image source
            this.currentSourceIndex++;
            
            if (this.currentSourceIndex >= this.imageSources.length) {
                this.currentSourceIndex = 0;
            }
            
            console.log(`Retry ${this.retryCount}/${this.maxRetries} with source: ${this.imageSources[this.currentSourceIndex].name}`);
            
            // Wait a bit before retrying
            setTimeout(async () => {
                try {
                    await this.tryLoadImage();
                } catch (error) {
                    // If this retry also fails, onImageError will be called again
                    this.onImageError();
                }
            }, 1000);
        } else {
            // All retries exhausted, show error state
            this.hideLoading();
            this.showError();
            this.enableButtons();
            console.error('All image sources failed, showing error state');
        }
    }

    updateImageSource(sourceName) {
        this.imageSource.textContent = `Source: ${sourceName}`;
    }

    showLoading() {
        this.loadingPlaceholder.style.display = 'flex';
        this.randomImage.classList.remove('loaded');
        this.imageSource.textContent = '';
    }

    hideLoading() {
        this.loadingPlaceholder.style.display = 'none';
    }

    showError() {
        this.errorMessage.classList.add('show');
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    disableButtons() {
        this.newImageBtn.disabled = true;
        this.refreshBtn.disabled = true;
    }

    enableButtons() {
        this.newImageBtn.disabled = false;
        this.refreshBtn.disabled = false;
    }
}

// Initialize the gallery and make it globally accessible
window.randomGallery = new RandomGallery();