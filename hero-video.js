// Hero Video Handler
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    const fallbackImg = document.querySelector('.hero-fallback');
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth <= 768;
    }
    
    // Function to check if device has limited bandwidth
    function hasLimitedBandwidth() {
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            return connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        }
        return false;
    }
    
    // Function to handle video loading
    function handleVideoLoading() {
        if (!video || !fallbackImg) return;
        
        // If mobile device or limited bandwidth, show fallback image
        if (isMobileDevice() || hasLimitedBandwidth()) {
            video.style.display = 'none';
            fallbackImg.style.display = 'block';
            fallbackImg.style.zIndex = '2';
            return;
        }
        
        // For desktop, try to load and play video
        video.style.display = 'block';
        fallbackImg.style.display = 'block'; // Keep as background
        
        // Set up video event listeners
        video.addEventListener('loadeddata', function() {
            // Video is loaded and can start playing
            video.style.zIndex = '2';
            fallbackImg.style.zIndex = '1';
        });
        
        video.addEventListener('error', function(e) {
            console.log('Video loading error:', e);
            showFallback();
        });
        
        video.addEventListener('stalled', function() {
            console.log('Video stalled, showing fallback');
            showFallback();
        });
        
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing successfully
                video.style.zIndex = '2';
                fallbackImg.style.zIndex = '1';
            }).catch(error => {
                console.log('Video autoplay failed:', error);
                showFallback();
            });
        }
    }
    
    // Function to show fallback image
    function showFallback() {
        if (video && fallbackImg) {
            video.style.display = 'none';
            fallbackImg.style.display = 'block';
            fallbackImg.style.zIndex = '2';
        }
    }
    
    // Handle window resize
    function handleResize() {
        if (isMobileDevice()) {
            showFallback();
        } else if (video && video.style.display === 'none') {
            // If we're now on desktop and video was hidden, try to show it again
            handleVideoLoading();
        }
    }
    
    // Initialize
    handleVideoLoading();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Listen for orientation change on mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 100);
    });
    
    // Intersection Observer for performance
    if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero is visible, ensure video is handled correctly
                    handleVideoLoading();
                } else {
                    // Hero is not visible, pause video to save resources
                    if (video && !video.paused) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        const heroElement = document.querySelector('.hero-image');
        if (heroElement) {
            heroObserver.observe(heroElement);
        }
    }
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (video) {
            if (document.hidden) {
                video.pause();
            } else if (!isMobileDevice() && !hasLimitedBandwidth()) {
                video.play().catch(e => console.log('Resume play failed:', e));
            }
        }
    });
});