/**
 * Llama Gallery Application
 * Displays random llama images from a curated collection
 */

class LlamaGallery {
    constructor() {
        // DOM element references
        this.imageContainer = null;
        this.llamaImage = null;
        this.loadingPlaceholder = null;
        this.errorMessage = null;
        this.newLlamaBtn = null;
        this.refreshBtn = null;
        this.imageSource = null;
        
        // Curated collection of actual llama images from reliable sources
        this.llamaImages = [
            {
                url: 'https://images.unsplash.com/photo-1596385752481-ad1b8b5351e4?w=500&h=400&fit=crop&crop=faces',
                alt: 'White fluffy llama portrait'
            },
            {
                url: 'https://images.unsplash.com/photo-1551191784-a0ce0ee5b9e2?w=500&h=400&fit=crop&crop=faces',
                alt: 'Brown llama in field'
            },
            {
                url: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=500&h=400&fit=crop&crop=faces',
                alt: 'Llama with long neck looking at camera'
            },
            {
                url: 'https://images.unsplash.com/photo-1616190101862-b9c13eccabeb?w=500&h=400&fit=crop&crop=faces',
                alt: 'Cute llama close-up'
            },
            {
                url: 'https://images.unsplash.com/photo-1601758261049-55d060e1159a?w=500&h=400&fit=crop&crop=faces',
                alt: 'Llama eating grass'
            },
            {
                url: 'https://images.unsplash.com/photo-1593376853899-fbb47fe19c2d?w=500&h=400&fit=crop&crop=faces',
                alt: 'Group of llamas in mountains'
            },
            {
                url: 'https://images.unsplash.com/photo-1614095264426-1e958304fd47?w=500&h=400&fit=crop&crop=faces',
                alt: 'Llama with colorful decorations'
            },
            {
                url: 'https://images.unsplash.com/photo-1591695437530-c2c8d5056fb4?w=500&h=400&fit=crop&crop=faces',
                alt: 'Llama in natural habitat'
            },
            {
                url: 'https://images.unsplash.com/photo-1570018144715-43110363d70a?w=500&h=400&fit=crop&crop=faces',
                alt: 'Woolly llama portrait'
            },
            {
                url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop&crop=faces',
                alt: 'Llama family in field'
            }
        ];
        
        // Track which images have been shown to avoid immediate repeats
        this.usedImages = new Set();
        
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
        this.llamaImage = document.getElementById('llamaImage');
        this.loadingPlaceholder = document.getElementById('loadingPlaceholder');
        this.errorMessage = document.getElementById('errorMessage');
        this.newLlamaBtn = document.getElementById('newLlamaBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.imageSource = document.getElementById('imageSource');

        if (!this.imageContainer || !this.llamaImage || !this.loadingPlaceholder ||
            !this.errorMessage || !this.newLlamaBtn || !this.refreshBtn || !this.imageSource) {
            console.error('Required DOM elements not found for LlamaGallery');
            return;
        }

        this.setupEventListeners();
        this.setupVisibilityHandling();
        this.loadRandomLlama();
    }

    setupEventListeners() {
        // Button event listeners
        this.newLlamaBtn.addEventListener('click', () => this.loadRandomLlama());
        this.refreshBtn.addEventListener('click', () => window.location.reload());
        
        // Image loading event listeners
        this.llamaImage.addEventListener('load', () => this.onImageLoad());
        this.llamaImage.addEventListener('error', () => this.onImageError());
    }

    setupVisibilityHandling() {
        // Load new llama when the page becomes visible (handles refresh case)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Small delay to ensure the page is fully loaded
                setTimeout(() => {
                    this.loadRandomLlama();
                }, 100);
            }
        });
    }

    async loadRandomLlama() {
        this.showLoading();
        this.hideError();
        this.disableButtons();

        try {
            // Reset used images if we've shown them all
            if (this.usedImages.size >= this.llamaImages.length) {
                this.usedImages.clear();
            }
            
            // Get available images (not recently shown)
            const availableImages = this.llamaImages.filter((_, index) => 
                !this.usedImages.has(index)
            );
            
            // If no available images, use all images
            const imagePool = availableImages.length > 0 ? availableImages : this.llamaImages;
            
            // Select random image from available pool
            const randomIndex = Math.floor(Math.random() * imagePool.length);
            const selectedImage = imagePool[randomIndex];
            
            // Find the original index to track usage
            const originalIndex = this.llamaImages.findIndex(img => img.url === selectedImage.url);
            this.usedImages.add(originalIndex);
            
            // Add cache busting parameter to ensure fresh load
            const cacheBuster = Date.now();
            const imageUrl = `${selectedImage.url}&cacheBuster=${cacheBuster}`;
            
            // Update alt text
            this.llamaImage.alt = selectedImage.alt;
            
            // Preload the image to handle loading states properly
            await this.preloadImage(imageUrl);
            
            // Update image source info
            this.updateImageSource(selectedImage.alt);
            
        } catch (error) {
            console.error('Error loading llama image:', error);
            this.onImageError();
        }
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.llamaImage.src = url;
                resolve();
            };
            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
            img.src = url;
        });
    }

    onImageLoad() {
        this.hideLoading();
        this.hideError();
        this.llamaImage.classList.add('loaded');
        this.enableButtons();
    }

    onImageError() {
        this.hideLoading();
        this.showError();
        this.enableButtons();
        
        // Try loading a different llama after a brief delay
        setTimeout(() => {
            this.loadFallbackLlama();
        }, 1000);
    }

    loadFallbackLlama() {
        // Remove the failed image from the current session
        const currentSrc = this.llamaImage.src;
        const failedIndex = this.llamaImages.findIndex(img => 
            currentSrc.includes(img.url.split('?')[0])
        );
        
        if (failedIndex !== -1) {
            this.usedImages.add(failedIndex);
        }
        
        // Try loading a different llama image
        this.loadRandomLlama();
    }

    updateImageSource(altText) {
        this.imageSource.textContent = `Showing: ${altText}`;
    }

    showLoading() {
        this.loadingPlaceholder.style.display = 'flex';
        this.llamaImage.classList.remove('loaded');
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
        this.newLlamaBtn.disabled = true;
        this.refreshBtn.disabled = true;
    }

    enableButtons() {
        this.newLlamaBtn.disabled = false;
        this.refreshBtn.disabled = false;
    }
}

// Initialize the gallery and make it globally accessible
window.llamaGallery = new LlamaGallery();