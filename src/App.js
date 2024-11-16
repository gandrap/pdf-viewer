import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {FreeMode, Navigation, Pagination} from 'swiper/modules';

import { useImageSize } from 'react-image-size';

const images = [
    {
        'url': 'NF1_11_page-0001.jpg',
        'width': 1240,
        'height': 1755,
        'html_elements': [
            {
                left: '1060px',
                top: '403px',
                width: '140px',
                height: '49px',
                position: "absolute",
                // background: 'black',
            },
            {
                top: '529px',
                left: '56px',
                width: '319px',
                height: '319px',
                position: "absolute",
                background: 'url(/pdf/idea-krug3.gif)',
                backgroundSize: 'contain',
            }
        ]
    },
    {
        'url': 'NF1_11_page-0002.jpg',
        'width': 1240,
        'height': 1755,
        'html_elements': []
    },
    {
        'url': 'NF1_11_page-0001.jpg',
        'width': 1240,
        'height': 1755,
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
    //const image = images[0]

    const divRef = useRef(null); // Referenca na `div` element
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

    const swiperContainer = document.querySelector('.swiper-container');


    const swiper = new Swiper('.swiper', {
        // configure Swiper to use modules
        modules: [Pagination, Navigation],
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
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
                //setSwiperWidth();
                adjustSlideWidths();
                adjustAllOverlayPositions();
              
            },
            resize: function () {
               // setSwiperWidth();
                adjustSlideWidths();
                adjustAllOverlayPositions();
             
            }
        },
});


    function setSwiperWidth() {
        // Selektuj prve dva slajda
        const firstSlide = document.querySelector('.swiper-slide:nth-child(1)');
        const secondSlide = document.querySelector('.swiper-slide:nth-child(2)');

        // Dobij širinu renderovanih slajdova
        const firstSlideWidth = firstSlide.clientWidth;
        const secondSlideWidth = secondSlide.clientWidth;

        // Postavi širinu Swiper kontejnera na zbir dve širine
        swiperContainer.style.width = `${firstSlideWidth + secondSlideWidth}px`;
    }

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
  

// Funkcija za podešavanje pozicije i dimenzija overlay-a
    function adjustOverlayPosition(img, overlay) {
        // Realne dimenzije slike

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
    

    return (
        <div style={getStyle(images[0])}>
            <div className="swiper" >

                <div className="swiper-wrapper">
                    {images.map((image) =>
                        <div className="swiper-slide" style={{
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
    )
}
