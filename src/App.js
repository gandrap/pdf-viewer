import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import {FreeMode, Navigation, Pagination, Zoom, Keyboard} from 'swiper/modules';
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
        modules: [Pagination, Navigation, Keyboard],
        freeMode: true,
        slidesPerView:2,
        spaceBetween: 0,
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

    function adjustAllOverlayPositionsZoomed() {
        const slides = document.querySelectorAll('.zoomed-slide');


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

        const activeSlide = document.querySelector('.swiper-slide-active');
        const zoomedWindow =  document.querySelector('.zoomedWindow');
        const zoomedContent = document.querySelector('.zoomedContent');
        const swiperContainer = document.querySelector('.swiper');
        zoomedWindow.classList.add('active');
        zoomedWindow.id = 'activeSlide-'+activeSlide.id;
        setIsZoomed(true)



        const slidesData = swiper.slides
            .filter(slide =>
                slide.classList.contains('swiper-slide-active') || slide.classList.contains('swiper-slide-next')
            )
            .map(slide => {
                const imageSrc = slide.querySelector('img')?.src || null;
                const htmlContent = slide.querySelector('.htmlContent')?.innerHTML || '';

                return {
                    image: imageSrc,
                    htmlContent: htmlContent
                };
            });

        zoomedContent.innerHTML = slidesData
            .map(data => `
        <div class="zoomed-slide">
            ${data.image ? `<img src="${data.image}" alt="Zoomed Image">` : ''}
            ${data.htmlContent ? `<div class="html-content-zoomed">${data.htmlContent}</div>` : ''}
        </div>
    `).join('');

        adjustAllOverlayPositionsZoomed()

        const rect1 = document.querySelector('.swiper').getBoundingClientRect();
        const rect2 =  document.querySelector('.zoomedContent').getBoundingClientRect();

        const actualWidth1 = rect1.width;
        const actualHeight1 = rect1.height;

        const actualWidth2 = rect2.width;
        const actualHeight2 = rect2.height;

        let clickX = 0;
        let clickY = 0;
        if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
            const touch = e.changedTouches[0];
            clickX = touch.clientX - rect1.left;
            clickY = touch.clientY - rect1.top;
        } else {
            clickX = e.clientX - rect1.left;
            clickY = e.clientY - rect1.top;
        }

        // Skaliranje pozicije na dimenzije drugog diva
        const scaleX = actualWidth2 / actualWidth1;
        const scaleY = actualHeight2 / actualHeight1;



        const newPosX = (clickX * scaleX)/2.5;
        const newPosY = (clickY * scaleY)/1.3;

        console.log(e);

        let isDragging = false;


        gsap.set('.zoomedContent', {
            x: -newPosX,
            y: -newPosY
        });

        Draggable.create('.zoomedContent', {
            bounds: '.zoomedWindow',
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
        const activeSlideId = document.querySelector('.zoomedWindow').id;
        const activeSlide = parseInt(activeSlideId.split('_').slice(-1)[0]);

        swiper.slideTo(activeSlide, 0, false); // Zaključaj na trenutni aktivni slajd
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
               zoomWindow(e)
           }

           lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
       }
    }

    function onTapClose(e) {
        if (device == 'mobile-s' || device == 'mobile-l' || device == 'mobile-m') {
            const currentTime = new Date().getTime(); // Trenutno vreme
            const tapInterval = currentTime - lastTap; // Razlika između trenutnih i poslednjih tapova

            if (tapInterval < doubleTapDelay && tapInterval > 0) {
                closeZoomedWindow(e)
            }

            lastTap = currentTime; // Ažurirajte vreme poslednjeg tap-a
        }
    }

    function onClickOpen(e) {
       if(device == 'laptop' || device == 'laptop-l' || device == 'desktop') {
           zoomWindow(e)
       }
    }

    function onClickClose(e) {
        if(device == 'laptop' || device == 'laptop-l' || device == 'desktop') {
            closeZoomedWindow(e)
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
            <div className="zoomedWindow">
                <div className="zoomFrame">
                    <div className="zoomedContent"
                         onClick={(e) => onClickClose(e)}
                         onTouchEnd={(e) => onTapClose(e)}
                    >
                </div>
                </div>
            </div>
            <div style={getStyle(pages[0])} className="swiperMainHolder"
            >
                    <div className="swiper"
                         onClick={(e) => onClickOpen(e)}
                         onTouchEnd={(e) => onTapOpen(e)}
                    >

                        <div className="swiper-wrapper">
                            {pages.map((page, index) =>
                                <div key={index} id={'slide_'+index} className="swiper-slide" style={{
                                    width: '100px !important'
                                }}>
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
        </>
    )
}
