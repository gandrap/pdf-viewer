import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import {FreeMode, Navigation, Pagination, Zoom} from 'swiper/modules';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(Draggable);

const images = [
    {
        'url': '1.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': [
            {
                left: '271.271px',
                top: '513.235px',
                width: '164.333px',
                height: '182.436px',
                position: "absolute",
                background: 'url(/pdf/meso.gif) no-repeat',
                backgroundSize: 'contain',
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
        'url': '2.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '3.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': [
            {
                left: '780.271px',
                top: '567.235px',
                width: '336.917px',
                height: '316.045px',
                position: "absolute",
                background: 'url(/pdf/naj-naj.gif) no-repeat',
                backgroundSize: 'contain',
            },
            {
                left: '776.674px',
                top: '1513.711px',
                width: '329.578px',
                height: '256.145px',
                position: "absolute",
                background: 'url(/pdf/100-domace-meso.gif) no-repeat',
                backgroundSize: 'contain',
            },
        ]
    },
    {
        'url': '4.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '5.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '6.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '7.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '8.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '9.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '10.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '11.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '12.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '13.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '14.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '15.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
    },
    {
        'url': '16.jpg',
        'width': 1200,
        'height': 2118,
        'html_elements': []
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
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
            setWindowSize({width: window.innerWidth, height: window.innerHeight});

            getDevice(true)

        };

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

    function getStyle(image) {

        const dimensions = { width: image.width, height: image.height };

     //   console.log('dimensions',dimensions);

        if(windowSize.width > 425 && windowSize.width <= 768) {
            return {width: '100%', height: 'auto'};
        } else {
            if (dimensions.width > windowSize.width ) {
                // If the image width is larger than the window, limit the width to 100% with auto height
                return {width: '100%', height: 'auto'};
            } else {
                // Otherwise, limit the height to 100% with auto width
                return {height: '100%', width: 'auto'};
            }
        }
    }

    const swiperContainer = document.querySelector('.swiper');

    const swiper = new Swiper('.swiper', {
        // configure Swiper to use modules
        modules: [Pagination, Navigation, Zoom],
        freeMode: true,
        slidesPerView:2,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        watchSlidesVisibility: true,
        breakpoints: {
            '@0.25': {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            '@0.75': {
                slidesPerView: 2,
                    spaceBetween: 0,
            },
            '@1.00': {
                slidesPerView: 2,
                    spaceBetween: 0,
            },
            '@1.50': {
                slidesPerView: 2,
                    spaceBetween: 0,
            }
        },
        on: {
            init: function () {
                adjustSlideWidths();
                adjustAllOverlayPositions();

            },
            resize: function () {
                adjustSlideWidths();
                adjustAllOverlayPositions();

            },
        },
    });

    function adjustAllOverlayPositions() {
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
        const slides = document.querySelectorAll('.swiper-slide img');
        slides.forEach((img) => {
            const slide = img.closest('.swiper-slide');

            const realHeight = img.naturalHeight;
            const realWidth = img.naturalWidth;

            const renderedHeight = img.clientHeight;

            const renderedWidth = (renderedHeight * realWidth) / realHeight;

            slide.style.width = `${renderedWidth}px`;
        });
    }

    function zoomWindow(e) {
        const zoomedWindow =  document.querySelector('.zoomedWindow');
        const zoomedContent = document.querySelector('.zoomedContent');
        zoomedWindow.classList.add('active');
        setIsZoomed(true)

       // console.log(swiper.slides);

        const images = swiper.slides
            .filter(slide =>
                slide.classList.contains('swiper-slide-active') || slide.classList.contains('swiper-slide-next')
            )
            .map(slide => slide.querySelector('img').src);

        zoomedContent.innerHTML = images.map(src => `<img src="${src}" alt="Zoomed Image">`).join('');

        const zoomedWindowRect = zoomedWindow.getBoundingClientRect();



        // Relativne pozicije klika unutar `zoomedWindow`
        const clickX = e.clientX - zoomedWindowRect.left;
        const clickY = e.clientY - zoomedWindowRect.top;

        // Prilagođavanje pozicije `zoomedContent`
        const centerX = zoomedWindowRect.width / 2;
        const centerY = zoomedWindowRect.height / 2;

        const offsetX = centerX - clickX;
        const offsetY = centerY + clickY;
        console.log(offsetX, offsetY)

        gsap.set(zoomedContent, {
            x: offsetX,
            y: -offsetY
        });

        let isDragging = false;

        Draggable.create(zoomedContent, {
            bounds: zoomedWindow,
            type: 'x,y',
            inertia: true,
            onDragStart: function () {
                // Postavljamo da je element u stanju dragovanja
                isDragging = true;
            },
            onDragEnd: function () {
                // Kada se drag završi, postavljamo na false
                setTimeout(() => isDragging = false, 0); // Koristimo setTimeout da bi smo obezbedili da se `click` desi nakon `dragEnd`
            },
            onPress: function() {
                // Ništa ne radimo sa klasom ovde, samo pratimo drag događaje
            }

        });
    }

    function closeZoomedWindow(e) {
        setIsZoomed(false);
        document.querySelector('.zoomedWindow').classList.remove('active');
       // swiper.slideTo(swiper.activeIndex, 0, false); // Zaključaj na trenutni aktivni slajd
    }

    return (
        <>
        <div className="zoomedWindow">
            <div className="zoomedContent"
                 onClick={(e) => closeZoomedWindow(e)}
                 onTouchEnd={(e) => closeZoomedWindow(e)}
            >
            </div>
        </div>
        <div style={getStyle(images[0])} className="swiperMainHolder"
        >
                <div className="swiper"
                     onClick={(e) => zoomWindow(e)}
                >

                    <div className="swiper-wrapper">
                        {images.map((image, index) =>
                            <div key={index} className="swiper-slide" style={{
                                width: '100px !important'
                            }}>
                                <img ref={divRef} src={`/pdf/${image.url}`}/>
                                <div className="htmlContent">
                                    {image['html_elements'].map((htmlContent, index) =>
                                        <div data-style={JSON.stringify(htmlContent)} className={'overlay element_'+index} style={htmlContent} ></div>
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
        </>
    )
}
