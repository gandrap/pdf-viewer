import { isMobile, isDesktop, isTablet, mobileModel } from 'react-device-detect';
import {useEffect, useRef, useState} from "react";
import {tns} from "tiny-slider";
import '../src/assets/css/tiny-slider.css';
import { useImageSize } from 'react-image-size';

const images = [
    {
        'url': 'NF1_11_page-0001.jpg',
        'width': 1240,
        'height': 1755
    },
    {
        'url': 'NF1_11_page-0002.jpg',
        'width': 1240,
        'height': 1755
    },
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

        if(windowSize.width > 425 && windowSize.width <= 768) {
            console.log(111);
            return {width: '100%', height: 'auto', objectFit: 'contain'};
        } else {
            if (dimensions.width > (windowSize.width + 80)) {
                // If the image width is larger than the window, limit the width to 100% with auto height
                return {maxWidth: '100%', height: 'auto', objectFit: 'contain'};
            } else {
                // Otherwise, limit the height to 100% with auto width
                return {maxHeight: '100%', width: 'auto', objectFit: 'contain'};
            }
        }
    }

    let slider = useRef(null);
    useEffect(() => {
        if (slider.current) {
            slider.current.destroy();
            slider.current = null;
        }


        function getImageWidth() {
            if(windowSize.width > 425 && windowSize.width < 768) {
                return (images[0].width / images[0].height) * windowSize.height;
            } else if(windowSize.width > 768) {
                return windowSize.width / 2;
            } else {
                return false;
            }
        }


        slider = tns({
            container: '.slider',
            items: windowSize.width > 425 ? 2 : 1,
            slideBy: 'page',
            autoplay: false,
            mouseDrag: true,
            controls: false,
            nav: false,
            autoplayButtonOutput: false,
            loop: false,
            // fixedWidth: getImageWidth(),
        });

    }, []);



    return (
        <div className="publication" style={{height: windowSize.height}}>
            <div className="reader">
                <div className="content">
                    <div className="slider">
                        {images.map((image) =>
                            <div className="innerContent">
                                <img ref={divRef} style={getStyle(image)} src={`/pdf/${image.url}`}/>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

