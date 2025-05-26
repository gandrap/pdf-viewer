import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {FreeMode, Navigation, Pagination, Keyboard, Mousewheel} from 'swiper/modules';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
// import {getDevice} from "react-native-device-info";


gsap.registerPlugin(Draggable);

const pages = [
    {
        'image': '1.jpg',
        'width': 1200,
        'height': 2118,
        'video': [],
        'html_elements': [
            {
                'css': {
                    left: '271.271px',
                    top: '513.235px',
                    width: '164.333px',
                    height: '182.436px',
                    position: "absolute",
                    background: 'url(/pdf/meso.gif) no-repeat',
                    backgroundSize: 'contain'
                }
            },
            // {
            //     left: '1060px',
            //     top: '403px',
            //     width: '140px',
            //     height: '49px',
            //     position: "absolute",
            //     // background: 'black',
            // },
            // {
            //     top: '529px',
            //     left: '56px',
            //     width: '319px',
            //     height: '319px',
            //     position: "absolute",
            //     background: 'url(/pdf/idea-krug3.gif)',
            //     backgroundSize: 'contain',
            // },
            // {
            //     top: '1597px',
            //     left: '0',
            //     width: '1172px',
            //     height: '118px',
            //     position: "absolute",
            //     background: 'url(/pdf/brojcanik.gif) no-repeat',
            //     backgroundSize: 'contain',
            // }
        ]
    },
    {
        'image': '2.jpg',
        'width': 1080,
        'height': 1906,
        'html_elements': [
            {
                'css': {
                    left: '0px',
                    top: '0px',
                    width: '1200px',
                    height: '2118px',
                    position: "absolute",
                    background: 'none',
                    backgroundSize: 'contain',
                },
                'video': {
                    'url': '/pdf/video1.mp4',
                    'type': 'video/mp4',
                    'attributes': 'autoPlay loop muted'
                },
            }

        ]
    },
    {
        'image': '3.jpg',
        'width': 1200,
        'height': 2118,
        'video': [],
        'html_elements': [
            {
                'css': {
                    left: '780.271px',
                    top: '567.235px',
                    width: '336.917px',
                    height: '316.045px',
                    position: "absolute",
                    background: 'url(/pdf/naj-naj.gif) no-repeat',
                    backgroundSize: 'contain'
                }
            },
            {
                'css': {
                    left: '776.674px',
                    top: '1513.711px',
                    width: '329.578px',
                    height: '256.145px',
                    position: "absolute",
                    background: 'url(/pdf/100-domace-meso.gif) no-repeat',
                    backgroundSize: 'contain'
                }
            },
        ]
    },
    {
        'image': '5.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': [
            {
                'css': {
                    left: '60.271px',
                    top: '500px',
                    width: '400px',
                    height: '105px',
                    position: "absolute",
                    backgroundSize: 'contain',
                },
                'button': {
                    'css': {
                        width: '100%',
                        height: '100%',
                        background: 'url(/pdf/recipe_btn.gif) no-repeat',
                        backgroundSize: 'contain',
                        border: 'none',
                    },
                    'type': 'popup',
                    'popup': {
                        'images': [
                            '/pdf/popup1.jpg'
                        ],
                        'title': 'Drpano prase u domaćoj lepinji',
                        'button': {
                            'url': 'https://google.com',
                            'label': 'POGLEDAJTE RECEPT',
                            'css': {
                                display: 'block',
                                padding: '20px 30px',
                                textAlign: 'center',
                                background: '#EE2F36',
                                width: '80%',
                                margin: 'auto',
                                borderRadius: '35px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '17px',
                                fontFamily: 'robotoCondensedBold'
                            }
                        },
                        'content':
                            '<p>Ako do sada niste imali priliku da napravite drpano prase ili cepaknu prasetinu, preporučujemo vam da isprobate ovaj sjajan recept.</p>'+
                            '<b>Sastojci za svinjetinu:</b>'+
                            '<ul>'+
                            '<li>1 kg 800 g svinjske plećke bez kostiju</li>'+
                            '<li>3 kašike smeđeg šećera</li>'+
                            '<li>1 kašike soli</li>'+
                            '<li>1 kašike začinske paprike</li>'+
                            '<li>1 kašičica belog luka u prahu</li>'+
                            '<li>1 kašičica crnog luka u prahu</li>'+
                            '<li>1 kašičica mlevenog kumina</li>' +
                            '<li>sveže mleveni crni biber po ukusu</li>'+
                            '<li>2 kašike ulja 355 ml piva (lager)</li>'+
                            '</ul>'+
                            '<b>Sastojci za BBQ sos:</b>'+
                            '<ul>'+
                            '<li>1 1/2 šolja kečapa</li>'+
                            '<li>1/3 šolje jabukovog sirćeta</li>'+
                            '<li>1/2 šolje Dižon senfa</li>'+
                            '<li>1/4 šolje braon šećera</li>'+
                            '<li>2 kašike vorčester sosa</li>'+
                            '</ul>'+
                            '<b>Dodatni sastojci za služenje:</b>'+
                            '<ul>'+
                            '<li>Lepinje</li'+
                            '</ul>',
                        'logo': '/pdf/popupLogo.png'
                    }
                }
            },
        ]
    },
    {
        'image': '6.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '7.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '8.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '9.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '10.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '11.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '12.jpg',

        'width': 1200,
        'height': 2118,
        'html_elements': [
            {
                'css': {
                    left: '35px',
                    top: '0px',
                    width: '1128px',
                    height: '658px',
                    position: "absolute",
                    background: 'none',
                    backgroundSize: 'contain',
                    borderEndEndRadius: '14px',
                    borderEndStartRadius: '14px',
                    overflow: 'hidden',
                },
                'video': {
                    'url': '/pdf/video2.mp4',
                    'type': 'video/mp4',
                    'attributes': 'autoPlay muted'
                },
            }
        ]
    },
    {
        'image': '13.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '14.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '15.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'image': '16.jpg',
        'video': [],
        'width': 1200,
        'height': 2118,
        'html_elements': [
            {
                'css': {
                    left: '600px',
                    top: '370px',
                    width: '302px',
                    height: '302px',
                    position: "absolute",
                    background: 'url(/pdf/meso.gif) no-repeat',
                    backgroundSize: '100%',
                    zIndex: '1',
                },
            },
            {
                'css': {
                    left: '428px',
                    top: '423px',
                    width: '213px',
                    height: '165px',
                    position: "absolute",
                    background: 'url(/pdf/100-domace-meso.gif) no-repeat',
                    backgroundSize: 'contain',
                    zIndex: '2'
                }
            },
            {
                'css': {
                    left: '83px',
                    top: '397px',
                    width: '1077px',
                    height: '571px',
                    position: "absolute",
                    zIndex: '3'
                },
                'link': 'https://google.rs/'
            },
        ]
    }
]

export default function App() {

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [device, setDevice] = useState(getDevice())

    function getDevice(set=false) {
        let dev = null;
        if(windowSize.width <= 320) {
            dev = 'mobile-s';
        } else if(windowSize.width > 320 && windowSize.width <= 375) {
            dev = 'mobile-m';
        } else if(windowSize.width > 375 && windowSize.width <= 425) {
            dev = 'mobile-l';
        } else if(windowSize.width > 425 && windowSize.width <= 768) {
            dev = 'tablet';
        } else if(windowSize.width > 768 && windowSize.width <= 1024) {
            dev = 'laptop'
        } else if(windowSize.width > 1024 && windowSize.width <= 1440) {
           dev = 'laptop-l'
        } else if(windowSize.width > 1440 ) {
           dev = 'desktop'
        }

        if(set) {
            setDevice(dev);
        }

        return dev
    }

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
            setWindowSize({width: window.innerWidth, height: window.innerHeight});

            getDevice(true);

            // Update header height when window is resized
            updateHeaderHeight();
        };

        // Initial header height calculation
        updateHeaderHeight();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // console.log(windowSize, device)



  return (
      <>
      <MobileL windowSize={windowSize} device={device}/>
      </>
  )
}


function MobileL({windowSize, device}) {

    const divRef = useRef(null); // Referenca na `div` element
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [isZoomTransitioning, setIsZoomTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState(0);

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
        // We don't need to set the height here anymore as it's handled by CSS
        // The swiperMainHolder height is dynamically calculated as calc(100% - var(--header-height))
        // where --header-height is updated by JavaScript to match the actual header height
        return {};
    }

    const swiperContainer = document.querySelector('.swiper');

    const swiper = new Swiper('.swiper', {
        // configure Swiper to use modules
        modules: [Pagination, Navigation, Keyboard, FreeMode, Mousewheel],
        cssMode: false, // Disable CSS Mode to allow mouse dragging
        freeMode: {
            enabled: false, // Disable freeMode to respect slidesPerGroup during dragging
            momentum: true,
            momentumRatio: 0.8,
            momentumBounce: true,
            momentumBounceRatio: 0.8,
            minimumVelocity: 0.02,
        }, // Disable free mode to respect slidesPerGroup during dragging
        threshold: 5, // Minimum distance for a swipe (in px) - reduced to make slider more sensitive to small drags
        touchReleaseOnEdges: true, // Release touch events on slider edge
        followFinger: true, // Slider will follow the finger during swipes
        longSwipes: true, // Enable long swipes
        longSwipesRatio: 0.1, // Reduced ratio to trigger long swipe (only 10% of slider width needed)
        touchRatio: 1.5, // Increased touch ratio for more responsive slides
        slidesPerView: 2,
        spaceBetween: 0,
        slideToClickedSlide: true,
        centeredSlides: false,
        slidesPerGroup: 2,
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
            enabled: true,
        },
        watchSlidesVisibility: true,
        breakpoints: {
            '@0.25': {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
            '@0.75': {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
            '@1.00': {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
            '@1.50': {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
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

        const slides = document.querySelectorAll('.swiper-slide img');
        let totalWidth = 0;
        let visibleWidth = 0;
        let slideCount = 0;

        slides.forEach((img) => {
            const slide = img.closest('.swiper-slide');

            const realHeight = img.naturalHeight;
            const realWidth = img.naturalWidth;

            const renderedHeight = img.clientHeight;

            const renderedWidth = (renderedHeight * realWidth) / realHeight;

            slide.style.width = `${renderedWidth}px`;

            // Calculate total width of all slides
            totalWidth += renderedWidth;

            // Only count the first two slides for visible width calculation
            if (slideCount < 2) {
                visibleWidth += renderedWidth;
                slideCount++;
            }
        });

        // Set the swiper wrapper width to accommodate all slides
        if (slides.length > 0) {
            // Add a small margin between slides (spaceBetween value from swiper config)
            const spaceBetween = 0; // This should match the spaceBetween value in swiper config
            const wrapperWidth = totalWidth + (spaceBetween * (slides.length - 1));

            // Set the swiper wrapper width to accommodate all slides
            document.querySelector('.swiper-wrapper').style.width = `${wrapperWidth}px`;

            // Set the swiper container width to show exactly 2 slides
            if (slideCount === 2) {
                document.querySelector('.swiper').style.width = `${visibleWidth + spaceBetween}px`;
            }
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

        // Store the scroll position
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        // Temporarily remove the CSS transition to avoid conflict with GSAP
        swiperContainer.style.transition = 'none';

        // Add active class to show the zoomed state
        swiperContainer.classList.add('zoomed');
        setIsZoomed(true);

        // Calculate the position that will center the clicked point
        // We use the click position relative to the container
        const relativeX = clickX - originalRect.left;
        const relativeY = clickY - originalRect.top;

        // Set the transform origin to the clicked point
        swiperContainer.style.transformOrigin = `${relativeX}px ${relativeY}px`;

        // Calculate the scale factor (1.5 is the zoom scale for 1.5x magnification)
        const scale = 1.5;

        // Apply the transformation
        // We keep the container in its original position and just scale it
        gsap.to(swiperContainer, {
            scale: 1.5,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: function() {
                // Use requestAnimationFrame for consistency with closeZoomedWindow
                requestAnimationFrame(() => {
                    // Restore the CSS transition
                    swiperContainer.style.transition = '';

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

        // Temporarily remove the CSS transition to avoid conflict with GSAP
        swiperContainer.style.transition = 'none';

        // Apply the zoom-out animation
        // Just scale back to 1 without changing position or dimensions
        gsap.to(swiperContainer, {
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: function() {
                // Reset all styles in a single animation frame to prevent flickering
                requestAnimationFrame(() => {
                    // First restore the CSS transition
                    swiperContainer.style.transition = '';

                    // Reset the state
                    setIsZoomed(false);
                    swiperContainer.classList.remove('zoomed');

                    // // Reset all inline styles in one go
                    // swiperContainer.style.width = '';
                    // swiperContainer.style.height = '';
                    // swiperContainer.style.transform = '';
                    // swiperContainer.style.transformOrigin = '';
                    // swiperContainer.style.x = '';
                    // swiperContainer.style.y = '';
                    //
                    // // Also reset the swiper-wrapper width to prevent jumping
                    // const swiperWrapper = document.querySelector('.swiper-wrapper');
                    // if (swiperWrapper) {
                    //     swiperWrapper.style.width = '';
                    // }
                    //
                    // // Reset the transition flag after all styles are reset
                    // setIsZoomTransitioning(false);
                    //
                    // // Recalculate slide widths after the transition is complete
                    // // We need to temporarily set isZoomTransitioning to false to allow adjustSlideWidths to run
                    // setTimeout(() => {
                    //     adjustSlideWidths();
                    // }, 0);
                });
            }
        });
    }


    function parseAttributes(attributeString) {
        if (!attributeString) return {}; // Ako je prazno, vraćamo prazan objekt
        return attributeString.split(' ').reduce((acc, attr) => {
            acc[attr] = true;
            return acc;
        }, {});
    }

    let lastTap = 0; // Vreme poslednjeg tap-a
    const doubleTapDelay = 300; // Maksimalni interval između dva tap-a (u milisekundama)

   function onTapOpen(e) {
       if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
           const currentTime = new Date().getTime(); // Trenutno vreme
           const tapInterval = currentTime - lastTap; // Razlika između trenutnih i poslednjih tapova

           if (tapInterval < doubleTapDelay && tapInterval > 0) {
               zoomWindow(e);
           }

           lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
       }
    }

    function onTapClose(e) {
        if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
            const currentTime = new Date().getTime(); // Trenutno vreme
            const tapInterval = currentTime - lastTap; // Razlika između trenutnih i poslednjih tapova

            if (tapInterval < doubleTapDelay && tapInterval > 0) {
                closeZoomedWindow(e);
            }

            lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
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

    function closePopup(e) {
       e.stopPropagation();
        document.querySelector('.popupMask').classList.remove('active');
    }

    return (
        <>
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
                </div>
                <div style={getStyle(pages[0])} className="swiperMainHolder"
                >
                        <div className="swiper"
                             onClick={(e) => {
                                 // Only handle click if not dragging
                                 console.log('onClick handler called, isDragging:', isDragging, 'isZoomed:', isZoomed);

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
                                 if (swiper) {
                                     console.log('Swiper instance:', {
                                         activeIndex: swiper.activeIndex,
                                         isBeginning: swiper.isBeginning,
                                         isEnd: swiper.isEnd,
                                         params: {
                                             cssMode: swiper.params.cssMode,
                                             freeMode: swiper.params.freeMode,
                                             slidesPerView: swiper.params.slidesPerView
                                         }
                                     });
                                 }

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
                                 if (swiper) {
                                     console.log('Swiper instance:', {
                                         activeIndex: swiper.activeIndex,
                                         isBeginning: swiper.isBeginning,
                                         isEnd: swiper.isEnd,
                                         params: {
                                             cssMode: swiper.params.cssMode,
                                             freeMode: swiper.params.freeMode,
                                             slidesPerView: swiper.params.slidesPerView
                                         }
                                     });
                                 }

                                 if (!isDragging) {
                                     isZoomed ? onTapClose(e) : onTapOpen(e);
                                 } else {
                                     console.log('Ignoring touch end because isDragging is true');
                                 }
                             }}
                        >

                            <div className="swiper-wrapper">
                                {pages.map((page, index) =>
                                    <div key={index} id={'slide_'+index} className="swiper-slide">
                                        <img ref={divRef} src={`/pdf/${page.image}`}/>
                                        <div className="htmlContent">
                                            {page['html_elements'].map((htmlContent, index2) =>
                                                <div data-style={JSON.stringify(htmlContent.css)} className={'overlay element_'+index2} style={htmlContent.css} >
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

                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>


                            <div className="swiper-scrollbar"></div>
                        </div>

                </div>
            </div>
        </>
    )
}
