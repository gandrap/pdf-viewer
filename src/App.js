import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {FreeMode, Navigation, Pagination, Keyboard, Mousewheel} from 'swiper/modules';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
// import {getDevice} from "react-native-device-info";
import pages from './assets/pages.json'



gsap.registerPlugin(Draggable);


export default function App() {

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Function to get device type based on direct window dimensions
    function getDeviceType() {
        const width = window.innerWidth;

        let dev = null;
        if(width <= 320) {
            dev = 'mobile-s';
        } else if(width > 320 && width <= 375) {
            dev = 'mobile-m';
        } else if(width > 375 && width <= 425) {
            dev = 'mobile-l';
        } else if(width > 425 && width <= 1024) {
            dev = 'tablet';
        } else if(width > 1024 && width <= 1440) {
           dev = 'laptop-l'
        } else if(width > 1440 ) {
           dev = 'desktop'
        }

        return dev;
    }

    const [device, setDevice] = useState(getDeviceType())

    // Old getDevice function removed as it's replaced by getDeviceType

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.querySelector('.header');
            if (header) {
                const headerHeight = header.offsetHeight;
                document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            }
        };

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            // Update device type using the direct window dimensions
            const newDevice = getDeviceType();

            if (newDevice !== device) {
                setDevice(newDevice);
            }

            // Update header height when window is resized
            updateHeaderHeight();
        };

        // Initial header height calculation
        updateHeaderHeight();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);




  return (
      <>
      <MobileL windowSize={windowSize} device={device}/>
      </>
  )
}


function MobileL({windowSize, device}) {

    const divRef = useRef(null); // Referenca na `div` element
    const swiperRef = useRef(null); // Reference to the Swiper instance
    const draggableRef = useRef(null); // Reference to the Draggable instance
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [isZoomTransitioning, setIsZoomTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Funkcija za ažuriranje dimenzija
        const updateDimensions = () => {
            if (divRef.current) {
                setDimensions({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight
                });
            }
        };

        // Kreiranje ResizeObserver-a
        const resizeObserver = new ResizeObserver(() => updateDimensions());
        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        // Čišćenje ResizeObserver-a kada se komponenta demontira
        return () => {
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current);
            }
        };
    }, []);

    // Add event listeners to detect drag operations
    useEffect(() => {
        // Get a reference to the swiper container and wrapper
        const swiperContainer = document.querySelector('.swiper');
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        if (!swiperContainer || !swiperWrapper) return;

        // Track drag distance to distinguish between clicks and drags
        let dragStartX = 0;
        let dragStartY = 0;
        const dragThreshold = 5; // Minimum distance to consider it a drag
        let isDraggingInternal = false; // Internal flag to track dragging state

        const handleMouseDown = (e) => {
            console.log('Mouse down: Resetting isDragging to false');
            console.log('Mouse down target:', e.target.tagName, e.target.className);
            setIsDragging(false); // Reset drag state on mouse down
            isDraggingInternal = false;
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            // Record the time of the mouse down event
            setLastInteractionTime(Date.now());
            console.log('Mouse down time:', Date.now());
        };

        const handleMouseMove = (e) => {
            // Only consider it a drag if the mouse has moved more than the threshold
            if (e.buttons === 1) { // Left mouse button is pressed
                const dragDistanceX = Math.abs(e.clientX - dragStartX);
                const dragDistanceY = Math.abs(e.clientY - dragStartY);

                // Consider it a drag if the mouse has moved enough
                if (dragDistanceX > dragThreshold || dragDistanceY > dragThreshold) {
                    console.log('Mouse drag detected, distances:', { dragDistanceX, dragDistanceY });
                    isDraggingInternal = true;
                    setIsDragging(true);
                }
            }
        };

        const handleMouseUp = (e) => {
            // If we detected dragging during mouse move, keep the isDragging state
            if (isDraggingInternal) {
                console.log('Mouse up: Drag operation detected');

                // Reset drag state after a delay to ensure click event fires first
                setTimeout(() => {
                    console.log('Mouse up: Resetting isDragging to false');
                    setIsDragging(false);
                    isDraggingInternal = false;
                }, 100);
            } else {
                // No drag was detected, reset immediately
                setIsDragging(false);
                isDraggingInternal = false;
            }
        };

        // Handle touch events for mobile devices
        const handleTouchStart = (e) => {
            console.log('Touch start: Resetting isDragging to false');
            console.log('Touch start target:', e.target.tagName, e.target.className);
            setIsDragging(false); // Reset drag state on touch start
            isDraggingInternal = false;
            if (e.touches.length > 0) {
                dragStartX = e.touches[0].clientX;
                dragStartY = e.touches[0].clientY;

                // Record the time of the touch start event
                setLastInteractionTime(Date.now());
                console.log('Touch start time:', Date.now());
            }
        };

        const handleTouchMove = (e) => {
            // Only consider it a drag if the touch has moved more than the threshold
            if (e.touches.length > 0) {
                const dragDistanceX = Math.abs(e.touches[0].clientX - dragStartX);
                const dragDistanceY = Math.abs(e.touches[0].clientY - dragStartY);

                // Consider it a drag if the touch has moved enough
                if (dragDistanceX > dragThreshold || dragDistanceY > dragThreshold) {
                    console.log('Touch drag detected, distances:', { dragDistanceX, dragDistanceY });
                    isDraggingInternal = true;
                    setIsDragging(true);
                }
            }
        };

        const handleTouchEnd = (e) => {
            // If we detected dragging during touch move, keep the isDragging state
            if (isDraggingInternal) {
                console.log('Touch end: Drag operation detected');

                // Reset drag state after a delay to ensure tap event fires first
                setTimeout(() => {
                    console.log('Touch end: Resetting isDragging to false');
                    setIsDragging(false);
                    isDraggingInternal = false;
                }, 100);
            } else {
                // No drag was detected, reset immediately
                setIsDragging(false);
                isDraggingInternal = false;
            }
        };

        // Add event listeners to the swiper container
        swiperContainer.addEventListener('mousedown', handleMouseDown);
        swiperContainer.addEventListener('mousemove', handleMouseMove);
        swiperContainer.addEventListener('mouseup', handleMouseUp);
        swiperContainer.addEventListener('touchstart', handleTouchStart);
        swiperContainer.addEventListener('touchmove', handleTouchMove);
        swiperContainer.addEventListener('touchend', handleTouchEnd);

        // Add event listener to document to catch mouse up events outside the container
        document.addEventListener('mouseup', handleMouseUp);

        // Clean up event listeners when component unmounts
        return () => {
            swiperContainer.removeEventListener('mousedown', handleMouseDown);
            swiperContainer.removeEventListener('mousemove', handleMouseMove);
            swiperContainer.removeEventListener('mouseup', handleMouseUp);
            swiperContainer.removeEventListener('touchstart', handleTouchStart);
            swiperContainer.removeEventListener('touchmove', handleTouchMove);
            swiperContainer.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    function getStyle(image) {
        // For tablet devices, set the height to 100vh minus header height to extend to bottom edge
        // For other devices, height is handled by CSS through calc(100% - var(--header-height))
        if (device === 'tablet') {
            return {
                height: 'calc(100vh - var(--header-height))'
            };
        }
        return {};
    }

    // Initialize Swiper in a useEffect hook to ensure it's only initialized once
    useEffect(() => {
        // Reset loading state when device changes
        setIsLoading(true);

        const swiperContainer = document.querySelector('.swiper');
        if (!swiperContainer) return;

        // Function to initialize Swiper
        const initializeSwiper = () => {
            // Initialize Swiper and store the instance in the ref
            swiperRef.current = new Swiper('.swiper', {
                // configure Swiper to use modules
                modules: [Pagination, Navigation, Keyboard, FreeMode, Mousewheel],
                cssMode: false, // Disable CSS Mode to allow mouse dragging
                freeMode: {
                    enabled: device === 'tablet', // Enable freeMode only for tablet devices
                    momentum: true,
                    momentumRatio: 0.8,
                    momentumBounce: true,
                    momentumBounceRatio: 0.8,
                    minimumVelocity: 0.02,
                }, // Enable free mode only for tablet devices

                threshold: 5, // Minimum distance for a swipe (in px) - reduced to make slider more sensitive to small drags
                touchReleaseOnEdges: true, // Release touch events on slider edge
                followFinger: true, // Slider will follow the finger during swipes
                longSwipes: true, // Enable long swipes
                longSwipesRatio: 0.1, // Reduced ratio to trigger long swipe (only 10% of slider width needed)
                touchRatio: 1.5, // Increased touch ratio for more responsive slides
                slidesPerView: 2,
                spaceBetween: 0,
                slideToClickedSlide: false,
                centeredSlides: false,
                slideActiveClass: 'swiper-slide-active',
                slidesPerGroup: 1, // Always use slidesPerGroup 1 to ensure proper navigation
                grabCursor: true, // Show grab cursor when hovering over the slider
                resistance: true, // Add resistance when reaching the end of the slider
                resistanceRatio: 0.5, // Reduced resistance ratio for more responsive dragging
                mousewheel: {
                    enabled: true,
                    sensitivity: 1,
                    forceToAxis: true,
                }, // Enable mouse wheel navigation
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                keyboard: {
                    enabled: device !== 'tablet', // Disable keyboard navigation for tablet devices
                },
                watchSlidesVisibility: true,
                breakpoints: {
                    '@0.25': {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                    },
                    '@1.00': {
                        slidesPerView: 2,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                    },
                    '@1.50': {
                        slidesPerView: 2,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                    }
                },
                on: {
                    init: function (swiper) {
                        adjustSlideWidths();
                        adjustAllOverlayPositions();

                        const activeSlide = parseInt(window.location.hash.split('_')[1]) || 0;
                        swiper.slideTo(activeSlide, 0, false);
                    },
                    resize: function () {
                        adjustSlideWidths();
                        adjustAllOverlayPositions();
                    },
                    slideChange: function (swiper, index) {
                        window.location.hash = 'page_'+swiper.activeIndex;
                    }
                },
            });
        };

        // Wait for all images to load before initializing Swiper
        const images = document.querySelectorAll('.swiper-slide img');
        let loadedImages = 0;
        const totalImages = images.length;

        // If there are no images, initialize Swiper immediately
        if (totalImages === 0) {
            initializeSwiper();
            return;
        }

        // Function to check if all images are loaded
        const checkAllImagesLoaded = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                // All images are loaded, initialize Swiper
                initializeSwiper();

                // Set loading state to false with a slight delay to ensure smooth transition
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        };

        // Add load event listeners to all images
        images.forEach(img => {
            if (img.complete) {
                // Image is already loaded (from cache)
                checkAllImagesLoaded();
            } else {
                // Image is not yet loaded, add event listener
                img.addEventListener('load', checkAllImagesLoaded);
                // Also handle error case to avoid getting stuck
                img.addEventListener('error', checkAllImagesLoaded);
            }
        });

        // Clean up Swiper instance when component unmounts
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
                swiperRef.current = null;
            }
            // Remove event listeners
            images.forEach(img => {
                img.removeEventListener('load', checkAllImagesLoaded);
                img.removeEventListener('error', checkAllImagesLoaded);
            });
        };
    }, [device]); // Add device as a dependency so Swiper reinitializes when device changes

    function adjustAllOverlayPositions() {
        // Skip this function if a zoom transition is in progress
        if (isZoomTransitioning) {
            return;
        }

        const slides = document.querySelectorAll('.swiper-slide');

        slides.forEach((slide) => {
            const img = slide.querySelector('img'); // Pronađi sliku u slajdu
            const overlays = slide.querySelectorAll('.overlay'); // Pronađi sve overlay elemente u slajdu

            if (img) {
                overlays.forEach((overlay) => {
                    adjustOverlayPosition(img, overlay);
                });
            }
        });
    }


    function adjustOverlayPosition(img, overlay) {
        // Realne dimenzije slike

        //console.log(img.clientWidth);

        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;

        // Renderovane dimenzije slike
        const renderedWidth = img.clientWidth;
        const renderedHeight = img.clientHeight;

        // Originalne dimenzije i pozicija overlay-a
        const overlayStyle = JSON.parse(overlay.dataset.style);
        //console.log(overlayStyle);
        const originalLeft = parseFloat(overlayStyle.left) || 0;
        const originalTop = parseFloat(overlayStyle.top) || 0;
        const originalWidth = parseFloat(overlayStyle.width) || overlay.clientWidth;
        const originalHeight = parseFloat(overlayStyle.height) || overlay.clientHeight;

        // Izračunaj proporcionalne dimenzije i poziciju
        const proportionalLeft = (originalLeft * renderedWidth) / realWidth;
        const proportionalTop = (originalTop * renderedHeight) / realHeight;
        const proportionalWidth = (originalWidth * renderedWidth) / realWidth;
        const proportionalHeight = (originalHeight * renderedHeight) / realHeight;

        // Primeni dimenzije i poziciju na overlay
        overlay.style.left = `${proportionalLeft}px`;
        overlay.style.top = `${proportionalTop}px`;
        overlay.style.width = `${proportionalWidth}px`;
        overlay.style.height = `${proportionalHeight}px`;

    }

    function adjustSlideWidths() {
        // Skip this function if a zoom transition is in progress
        if (isZoomTransitioning) {
            return;
        }

        const swiperContainer = document.querySelector('.swiper');
        const isCurrentlyZoomed = swiperContainer.classList.contains('zoomed');

        const slides = document.querySelectorAll('.swiper-slide img');
        let totalWidth = 0;
        let visibleWidth = 0;
        let slideCount = 0;

        // Check if current device is mobile
        const isMobileDevice = device === 'mobile-s' || device === 'mobile-m' || device === 'mobile-l';

        // Get the current window width for mobile devices
        const windowWidth = window.innerWidth;

        slides.forEach((img) => {
            const slide = img.closest('.swiper-slide');

            const realHeight = img.naturalHeight;
            const realWidth = img.naturalWidth;

            const renderedHeight = img.clientHeight;

            const renderedWidth = (renderedHeight * realWidth) / realHeight;

            // Only set slide width if not in zoomed state to prevent interference with dragging
            if (!isCurrentlyZoomed) {
                if (isMobileDevice) {
                    // For mobile devices, set width to exactly match the device width and height to auto
                    // Apply styles with !important to override any CSS rules
                    slide.setAttribute('style', `width: ${windowWidth}px !important; height: auto !important;`);
                    img.setAttribute('style', `width: ${windowWidth}px !important; height: auto !important;`);
                } else {
                    slide.style.width = `${renderedWidth}px`;
                }
            }

            // Calculate total width of all slides
            totalWidth += isMobileDevice ? windowWidth : renderedWidth;

            // Only count the first two slides for visible width calculation
            if (slideCount < 2) {
                visibleWidth += isMobileDevice ? windowWidth : renderedWidth;
                slideCount++;
            }
        });

        // Set the swiper wrapper width to accommodate all slides
        if (slides.length > 0) {
            // Add a small margin between slides (spaceBetween value from swiper config)
            const spaceBetween = 0; // This should match the spaceBetween value in swiper config
            const wrapperWidth = totalWidth + (spaceBetween * (slides.length - 1));

            const swiperWrapper = document.querySelector('.swiper-wrapper');

            // Only set wrapper width if not in zoomed state
            if (!isCurrentlyZoomed && swiperWrapper) {
                swiperWrapper.style.width = `${wrapperWidth}px`;
            }

            // Set the swiper container width to match device width for mobile or show exactly 2 slides for desktop
            if (!isCurrentlyZoomed) {
                if (isMobileDevice) {
                    swiperContainer.style.width = `${windowWidth}px`;
                } else if (slideCount === 2) {
                    swiperContainer.style.width = `${visibleWidth + spaceBetween}px`;
                }
            }
        }

        // If we have a Swiper instance, update it to reflect the new dimensions
        if (swiperRef.current && !isCurrentlyZoomed) {
            swiperRef.current.update();
        }
    }

    function zoomWindow(e) {
        const swiperContainer = document.querySelector('.swiper');
        const activeSlide = document.querySelector('.swiper-slide-active');

        // Set the flag to indicate that a zoom transition is in progress
        setIsZoomTransitioning(true);

        // Get click position for initial zoom point
        let clickX = 0;
        let clickY = 0;
        if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
            const touch = e.changedTouches[0];
            clickX = touch.clientX;
            clickY = touch.clientY;
        } else {
            clickX = e.clientX;
            clickY = e.clientY;
        }

        // Store the original position and dimensions of the swiper container
        const originalRect = swiperContainer.getBoundingClientRect();

        // Disable some Swiper functionality when zoomed in, but keep navigation buttons working
        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = false;
            // Keep slide navigation enabled for buttons to work
            // swiperRef.current.allowSlideNext = false;
            // swiperRef.current.allowSlidePrev = false;
            swiperRef.current.mousewheel.disable();
            swiperRef.current.keyboard.disable();
        }

        // Calculate the position that will center the clicked point
        const relativeX = clickX - originalRect.left;
        const relativeY = clickY - originalRect.top;

        // Temporarily remove the CSS transition and set transform origin
        swiperContainer.style.transition = 'none';
        swiperContainer.style.transformOrigin = `${relativeX}px ${relativeY}px`;

        // Add zoomed class and update state
        swiperContainer.classList.add('zoomed');
        setIsZoomed(true);

        // Force a reflow to ensure style changes take effect
        swiperContainer.getBoundingClientRect();

        // Store the scale factor for consistent calculations
        const scaleFactor = 1.8;

        // Apply the zoom-in animation
        gsap.to(swiperContainer, {
            scale: scaleFactor,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function() {
                // Use requestAnimationFrame to ensure all style changes happen in a single paint cycle
                requestAnimationFrame(() => {
                    // Restore the CSS transition
                    swiperContainer.style.transition = '';

                    // Calculate bounds based on the scaled size to ensure we can reach the edges
                    // Add a small margin (5%) to ensure content can fully reach the edges
                    const scaledBoundsX = originalRect.width * (scaleFactor - 1) / 2 * 1.05;
                    const scaledBoundsY = originalRect.height * (scaleFactor - 1) / 2 * 1.05;

                    // Kill any existing draggable instance
                    if (draggableRef.current) {
                        draggableRef.current.kill();
                    }

                    const elementZoom = document.querySelector('.swiper');
                    const rectZoom = elementZoom.getBoundingClientRect();
                    const xPositionZoom = (rectZoom.left + window.scrollX)*2;
                    const yPositionZoom = rectZoom.top + window.scrollY;
                    const yPositionZoomBottom = rectZoom.bottom + window.scrollY;

                    const element = document.querySelector('.swiperMainHolder');
                    const rect = element.getBoundingClientRect();
                    const xPosition = rect.left + window.scrollX;
                    const yPosition = rect.top + window.scrollX;
                    const yPositionBottom = rect.bottom + window.scrollX;

                    // Create a draggable instance for the zoomed container
                    draggableRef.current = Draggable.create(swiperContainer, {
                        type: "x,y",
                        bounds: {
                            minX: -scaledBoundsX,
                            maxX: scaledBoundsX,
                            // minY: yPositionBottom-yPositionZoomBottom, // UKLONJENO - kontrolisaćemo ručno
                            // maxY: yPosition-yPositionZoom           // UKLONJENO - kontrolisaćemo ručno
                        },
                        edgeResistance: 0.2,
                        throwProps: true,
                        inertia: true,
                        duration: 0.4, // Trajanje "bacanja", ne snap animacije
                        ease: "power3.out",

                        onThrowComplete: function() {
                            gsap.killTweensOf(swiperContainer);

                            const x = this.x; // Pozicija gde se "bacanje" završilo
                            const y = this.y; // Pozicija gde se "bacanje" završilo

                            let targetX = xPositionZoom - x; // Vaša postojeća logika za X
                            let targetY = y;                 // Početna targetY je trenutna Y

                            // Definišite vaše Y granice (iste vrednosti koje su bile u Draggable.bounds)
                            const minYValue = yPositionBottom - yPositionZoomBottom;
                            const maxYValue = yPosition - yPositionZoom;

                            // Provera i korekcija Y pozicije ako je van granica
                            if (y < minYValue) {
                                targetY = minYValue;
                            } else if (y > maxYValue) {
                                targetY = maxYValue;
                            } else {
                                // Ako je unutar granica nakon bacanja, originalni kod je animirao na maxYValue.
                                // Možete zadržati to, ili animirati na this.y (gde je sleteo) ako je unutar granica.
                                // Ovde ostavljam originalnu logiku da se uvek vrati na gornju granicu (ili specificnu poziciju)
                                targetY = maxYValue; // yPosition - yPositionZoom
                            }

                            gsap.to(swiperContainer, {
                                x: targetX,
                                y: targetY, // Animiraj na korigovanu Y poziciju
                                duration: 0.4, // Trajanje animacije vraćanja
                                ease: "power3.out"
                            });
                        },

                        onDragEnd: function() {
                            // Ova funkcija se poziva samo ako nije bilo "bacanja" (inertia: false ili vrlo kratak drag)
                            // Ako je throwProps: true, onThrowComplete će se generalno češće pozivati nakon otpuštanja.
                            gsap.killTweensOf(swiperContainer);

                            const x = this.x; // Trenutna pozicija nakon otpuštanja
                            const y = this.y; // Trenutna pozicija nakon otpuštanja

                            // Vaša postojeća X logika
                            // const element = document.querySelector('.swiperMainHolder'); // Ovo je verovatno već definisano negde gore
                            // const rect = element.getBoundingClientRect();
                            // const xPosition = rect.left + window.scrollX; // Pazite na scrollX, možda je window.pageXOffset ili document.documentElement.scrollLeft
                            // const yPositionCurrent = rect.top + window.scrollY; // Slično za scrollY

                            let targetX = -(xPositionZoom / 2); // Vaša postojeća logika za X
                            let targetY = y;                   // Početna targetY je trenutna Y

                            // Definišite vaše Y granice
                            const minYValue = yPositionBottom - yPositionZoomBottom;
                            const maxYValue = yPosition - yPositionZoom;

                            // Provera i korekcija Y pozicije ako je van granica
                            if (y < minYValue) {
                                targetY = minYValue;
                            } else if (y > maxYValue) {
                                targetY = maxYValue;
                            }
                            // Ako je unutar granica, targetY ostaje this.y, što je u redu.

                            gsap.to(swiperContainer, {
                                x: targetX,
                                y: targetY, // Animiraj na korigovanu Y poziciju
                                duration: 0.4, // Trajanje animacije vraćanja
                                ease: "power3.out"
                            });
                        }
                    })[0];

                    // Reset the flag to indicate that the zoom transition is complete
                    setIsZoomTransitioning(false);
                });
            }
        });
    }

    function closeZoomedWindow(e) {
        const swiperContainer = document.querySelector('.swiper');

        // Set the flag to indicate that a zoom transition is in progress
        setIsZoomTransitioning(true);

        // Kill the draggable instance if it exists
        if (draggableRef.current) {
            draggableRef.current.kill();
            draggableRef.current = null;
        }

        // Stop any ongoing animations to prevent conflicts
        gsap.killTweensOf(swiperContainer);

        // First, remove the zoomed class and reset isZoomed state
        // This ensures that adjustSlideWidths will work correctly when called later
        swiperContainer.classList.remove('zoomed');
        setIsZoomed(false);

        // Store the original transform for smooth transition
        const originalTransform = window.getComputedStyle(swiperContainer).transform;

        // Store the original dimensions and positions before zooming out
        const originalWidth = swiperContainer.style.width;
        const originalHeight = swiperContainer.style.height;
        const originalX = swiperContainer.style.x;
        const originalY = swiperContainer.style.y;

        // Reset all inline styles that might interfere with the animation
        swiperContainer.style.transition = 'none';
        swiperContainer.style.x = '0px';
        swiperContainer.style.y = '0px';

        // Force a reflow to ensure style changes take effect
        swiperContainer.getBoundingClientRect();

        // Apply the zoom-out animation
        gsap.fromTo(swiperContainer, 
            { 
                transform: originalTransform 
            },
            {
                transform: 'scale(1)',
                duration: 0.5,
                ease: "power2.out",
                clearProps: "transform,transformOrigin", // Automatically clear these properties after animation
                onComplete: function() {
                    // Use requestAnimationFrame to ensure all style changes happen in a single paint cycle
                    requestAnimationFrame(() => {
                        // Reset all remaining inline styles
                       // swiperContainer.style.transition = '';
                        swiperContainer.style.width = originalWidth;
                        swiperContainer.style.height = originalHeight;
                        swiperContainer.style.x = originalX;
                        swiperContainer.style.y = originalY;

                        // Don't reset the swiper-wrapper width to empty string
                        // Instead, we'll let adjustSlideWidths calculate the proper width

                        // Re-enable Swiper functionality
                        if (swiperRef.current) {
                            swiperRef.current.allowTouchMove = true;
                            swiperRef.current.allowSlideNext = true;
                            swiperRef.current.allowSlidePrev = true;
                            swiperRef.current.mousewheel.enable();
                            swiperRef.current.keyboard.enable();

                            // Update swiper to reflect new dimensions
                            swiperRef.current.update();
                        }

                        // Reset the transition flag
                        setIsZoomTransitioning(false);

                        // Use a longer delay for adjustSlideWidths to ensure all style changes have taken effect
                        // This is crucial for preventing the slider from jumping
                        setTimeout(() => {
                            // Force another reflow before adjusting slide widths
                            swiperContainer.getBoundingClientRect();

                            // Adjust slide widths to ensure all slides are properly visible
                            adjustSlideWidths();

                            // Update swiper again after adjusting slide widths
                            if (swiperRef.current) {
                                swiperRef.current.update();
                            }
                        }, 100);
                    });
                }
            }
        );
    }


    function parseAttributes(attributeString) {
        if (!attributeString) return {}; // Ako je prazno, vraćamo prazan objekt
        return attributeString.split(' ').reduce((acc, attr) => {
            acc[attr] = true;
            return acc;
        }, {});
    }

    let lastTap = 0; // Vreme poslednjeg tap-a
    const doubleTapDelay = 500; // Maksimalni interval između dva tap-a (u milisekundama) - increased for better detection on Android

   function onTapOpen(e) {
       if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
           const currentTime = new Date().getTime(); // Trenutno vreme
           const tapInterval = currentTime - lastTap; // Razlika između trenutnih i poslednjih tapova

           console.log('onTapOpen - Mobile device detected:', device);
           console.log('onTapOpen - Tap interval:', tapInterval, 'ms (threshold:', doubleTapDelay, 'ms)');

           if (tapInterval < doubleTapDelay && tapInterval > 0) {
               // Double tap detected, activate zoom
               console.log('onTapOpen - Double tap detected! Activating zoom');
               zoomWindow(e);
           } else {
               console.log('onTapOpen - Not a double tap, waiting for second tap');
           }

           lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
       } else {
           console.log('onTapOpen - Not a mobile device, ignoring tap');
       }
    }

    function onTapClose(e) {
        if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
            const currentTime = new Date().getTime(); // Trenutno vreme
            const tapInterval = currentTime - lastTap; // Razlika između trenutnih i poslednjih tapova

            console.log('onTapClose - Mobile device detected:', device);
            console.log('onTapClose - Tap interval:', tapInterval, 'ms (threshold:', doubleTapDelay, 'ms)');

            if (tapInterval < doubleTapDelay && tapInterval > 0) {
                // Double tap detected, deactivate zoom
                console.log('onTapClose - Double tap detected! Deactivating zoom');
                closeZoomedWindow(e);
            } else {
                console.log('onTapClose - Not a double tap, waiting for second tap');
            }

            lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
        } else {
            console.log('onTapClose - Not a mobile device, ignoring tap');
        }
    }

    function onClickOpen(e) {
       if(device == 'laptop' || device == 'laptop-l' || device == 'desktop') {
           zoomWindow(e);
       }
    }

    function onClickClose(e) {
        if(device == 'laptop' || device == 'laptop-l' || device == 'desktop') {
            closeZoomedWindow(e);
        }
    }

    function handleClickButton(e, buttonContent) {
       e.stopPropagation();
       // Check if the button has a direct URL
       if(buttonContent.url) {
           // Check if it's a slide type button with a hash URL
           if(buttonContent.type === 'slide' && buttonContent.url.startsWith('#page_')) {
               // Extract the slide number from the URL (after the underscore)
               const slideNumber = parseInt(buttonContent.url.split('_')[1]);

               // Navigate to that slide using the Swiper instance
               if(swiperRef.current && !isNaN(slideNumber)) {
                   // Ensure the clicked slide is positioned on the left
                   // We need to set the slide index directly to the clicked slide number
                   swiperRef.current.slideTo(slideNumber, 300, false);

                   // Update the URL hash
                   window.location.hash = buttonContent.url.substring(1); // Remove the # from the beginning
               }
           } else {
               // Open the URL in a new tab/window for regular URL buttons
               window.open(buttonContent.url, '_blank');
           }
       } else {
           // Handle popup type buttons as before
           const buttonType = buttonContent.type
           if(buttonType === 'popup') {
               document.querySelector('.popupMask').classList.add('active');
               const img = document.createElement('img');
               img.src = buttonContent.popup.images[0];
               document.querySelector('.popupImage').replaceChildren(img);
               const logo = document.createElement('img');
               logo.src = buttonContent.popup.logo;
               document.querySelector('.popupLogo').replaceChildren(logo);
               document.querySelector('.popupTitle').innerHTML = buttonContent.popup.title;
               document.querySelector('.popupContent').innerHTML = buttonContent.popup.content;
               document.querySelector('.popupLink').href = buttonContent.popup.button.url;
               document.querySelector('.popupLink').innerHTML =  buttonContent.popup.button.label;

               const popupLink = document.querySelector('.popupLink');

               Object.entries(buttonContent.popup.button.css).forEach(([key, value]) => {
                   popupLink.style[key] = value;
               });
           }
       }
    }

    function closePopup(e) {
       e.stopPropagation();
        document.querySelector('.popupMask').classList.remove('active');
    }

    return (
        <>
            {/* Loading overlay with blur effect */}
            <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
                <img className="loading-logo" src="/static/media/logo.c3312f23b8388861be03.jpg" alt="Logo" />
            </div>

            <div className="popupMask" onClick={(e) => closePopup(e)}>
                <div className="popup">
                    <button className="closeBtn" onClick={(e) => closePopup(e)}></button>
                    <div className="popupLeft">
                        <div className="popupLogo"></div>
                        <div className="popupImage"></div>
                    </div>
                    <div className="popupRight">
                        <span className="popupTitle"></span>
                        <div className="popupContent"></div>
                        <a className="popupLink" href=""></a>
                    </div>
                </div>
            </div>
            <div className="mainHolder">
                <div className="header">
                    <img className="logo" src={require('./assets/images/logo.jpg')} alt="Logo" />
                    <span className="device-info">{device}</span>
                </div>
                <div style={getStyle(pages[0])} className="swiperMainHolder"
                >
                        <div className="swiper"
                             onClick={(e) => {
                                // Only handle click if not dragging and not on mobile device
                                // For mobile devices, we use onTouchEnd with double tap detection
                                const isMobileDevice = device === 'mobile-s' || device === 'mobile-m' || device === 'mobile-l';
                                console.log('onClick handler called, isDragging:', isDragging, 'isZoomed:', isZoomed, 'isMobile:', isMobileDevice);

                                // If on mobile device, ignore click events (we'll use touch events instead)
                                if (isMobileDevice) {
                                    console.log('Ignoring click on mobile device - using touch events instead');
                                    return;
                                }

                                // Check the event object
                                console.log('Click event:', {
                                    type: e.type,
                                    target: e.target.tagName,
                                    currentTarget: e.currentTarget.tagName,
                                    clientX: e.clientX,
                                    clientY: e.clientY,
                                    buttons: e.buttons,
                                    detail: e.detail,
                                    isTrusted: e.isTrusted
                                });

                                // Check the time elapsed since the last mouse down event
                                const timeElapsed = Date.now() - lastInteractionTime;
                                console.log('Time elapsed since last interaction:', timeElapsed, 'ms');

                                // If the time elapsed is very short, it might be a drag operation
                                if (timeElapsed < 50) {
                                    console.log('Click happened too quickly after mouse down, might be a drag');
                                    setIsDragging(true);
                                }

                                // Check if the click is on a slide element
                                const isSlideClick = e.target.closest('.swiper-slide') !== null;
                                console.log('Click is on a slide:', isSlideClick);

                                // Check if the wrapper has scrolled
                                const swiperWrapper = document.querySelector('.swiper-wrapper');
                                if (swiperWrapper) {
                                    console.log('Wrapper scroll position:', swiperWrapper.scrollLeft);
                                }

                                // Check the current state of the swiper container
                                const swiperContainer = document.querySelector('.swiper');
                                if (swiperContainer) {
                                    console.log('Swiper container classes:', swiperContainer.className);
                                    console.log('Swiper container has zoomed class:', swiperContainer.classList.contains('zoomed'));
                                    console.log('Swiper container style:', swiperContainer.getAttribute('style'));
                                }

                                // Check the current state of the swiper instance
                                if (swiperRef.current) {
                                    console.log('Swiper instance:', {
                                        activeIndex: swiperRef.current.activeIndex,
                                        isBeginning: swiperRef.current.isBeginning,
                                        isEnd: swiperRef.current.isEnd,
                                        params: {
                                            cssMode: swiperRef.current.params.cssMode,
                                            freeMode: swiperRef.current.params.freeMode,
                                            slidesPerView: swiperRef.current.params.slidesPerView
                                        }
                                    });
                                }

                                // Only handle click for desktop devices
                                if (!isDragging) {
                                    isZoomed ? onClickClose(e) : onClickOpen(e);
                                } else {
                                    console.log('Ignoring click because isDragging is true');
                                }
                            }}
                             onTouchEnd={(e) => {
                                 // Only handle touch end if not dragging
                                 console.log('onTouchEnd handler called, isDragging:', isDragging, 'isZoomed:', isZoomed);

                                 // Check the event object
                                 console.log('Touch end event:', {
                                     type: e.type,
                                     target: e.target.tagName,
                                     currentTarget: e.currentTarget.tagName,
                                     touches: e.touches.length,
                                     changedTouches: e.changedTouches.length,
                                     isTrusted: e.isTrusted
                                 });

                                 if (e.changedTouches.length > 0) {
                                     console.log('Touch end position:', {
                                         clientX: e.changedTouches[0].clientX,
                                         clientY: e.changedTouches[0].clientY
                                     });
                                 }

                                 // Check if the touch end is on a slide element
                                 const isSlideTouchEnd = e.target.closest('.swiper-slide') !== null;
                                 console.log('Touch end is on a slide:', isSlideTouchEnd);

                                 // Check if the wrapper has scrolled
                                 const swiperWrapper = document.querySelector('.swiper-wrapper');
                                 if (swiperWrapper) {
                                     console.log('Wrapper scroll position:', swiperWrapper.scrollLeft);
                                 }

                                 // Check the current state of the swiper container
                                 const swiperContainer = document.querySelector('.swiper');
                                 if (swiperContainer) {
                                     console.log('Swiper container classes:', swiperContainer.className);
                                     console.log('Swiper container has zoomed class:', swiperContainer.classList.contains('zoomed'));
                                     console.log('Swiper container style:', swiperContainer.getAttribute('style'));
                                 }

                                 // Check the current state of the swiper instance
                                 if (swiperRef.current) {
                                     console.log('Swiper instance:', {
                                         activeIndex: swiperRef.current.activeIndex,
                                         isBeginning: swiperRef.current.isBeginning,
                                         isEnd: swiperRef.current.isEnd,
                                         params: {
                                             cssMode: swiperRef.current.params.cssMode,
                                             freeMode: swiperRef.current.params.freeMode,
                                             slidesPerView: swiperRef.current.params.slidesPerView
                                         }
                                     });
                                 }

                                 // For mobile devices, always call onTap functions regardless of isDragging state
                                 // This ensures double tap detection works even if there's slight movement
                                 const isMobileDevice = device === 'mobile-s' || device === 'mobile-m' || device === 'mobile-l';

                                 if (isMobileDevice || !isDragging) {
                                     isZoomed ? onTapClose(e) : onTapOpen(e);
                                 } else {
                                     console.log('Ignoring touch end because isDragging is true and not on mobile');
                                 }
                             }}
                        >

                            <div className="swiper-wrapper">
                                {pages.map((page, index) =>
                                    <div key={index} id={'slide_'+index} className="swiper-slide">
                                        <img ref={divRef} src={`/pdf/${page.image}`}/>
                                        <div className="htmlContent">
                                            {page['html_elements'].map((htmlContent, index2) =>
                                                <div key={index2} data-style={JSON.stringify(htmlContent.css)} className={'overlay element_'+index2} style={htmlContent.css} >
                                                    {htmlContent.video && (
                                                        <video {...parseAttributes(htmlContent.video.attributes)}>
                                                            <source src={htmlContent.video.url} type={htmlContent.video.type} />
                                                        </video>
                                                    )}
                                                    {htmlContent.button && (
                                                       <button style={htmlContent.button.css} onClick={(e) => handleClickButton(e, htmlContent.button)}></button>
                                                    )}
                                                    {htmlContent.link && (
                                                        <a className="htmlContentLink" onClick={(e) => e.stopPropagation()} href={htmlContent.link} />
                                                    )}
                                                </div>
                                                )}
                                        </div>
                                    </div>
                                    )}
                            </div>

                            <div className="swiper-pagination"></div>

                            <div 
                                className="swiper-button-prev" 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent zoom toggle
                                    if (swiperRef.current) {
                                        swiperRef.current.slidePrev();
                                    }
                                }}
                            ></div>
                            <div 
                                className="swiper-button-next" 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent zoom toggle
                                    if (swiperRef.current) {
                                        swiperRef.current.slideNext();
                                    }
                                }}
                            ></div>


                            <div className="swiper-scrollbar"></div>
                        </div>

                </div>
            </div>
        </>
    )
}
