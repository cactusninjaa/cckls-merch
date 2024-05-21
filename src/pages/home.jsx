import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Home() {
    const galleryRef = useRef();
    let radius = 200;
    let isGalleryOpen = false;

    useEffect(() => {
        if (galleryRef.current) {
            const gallery = galleryRef.current;
            const centerX = gallery.offsetWidth / 2;
            const centerY = gallery.offsetHeight / 2;
            const items = Array.from(gallery.children);
            const angleIncrement = (Math.PI * 2) / items.length;
            const tl = gsap.timeline();

            if (window.innerWidth < 500) {
                radius = 150;
            } else if (window.innerWidth < 800) {
                radius = 200;
            }

            items.forEach((item, index) => {
                const img = document.createElement("img");
                img.src= '../assets/img/gallery/gallery' + (index + 1) + '.jpg';
                item.appendChild(img);

                const angle = angleIncrement * index;
                const initialRotation = (angle * 180 / Math.PI) - 90;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                gsap.set(item, {scale : 0});

                tl.to(item, {
                    left : x + "px",
                    top : y + "px",
                    rotation : initialRotation,
                    scale : 1,
                    duration : 1,
                    ease : "power2.out",
                    delay: 1
                }, index * 0.1);

                item.addEventListener("click", function() {
                    if (!isGalleryOpen) {
                        isGalleryOpen = true;

                        const duplicate = item.cloneNode(true);
                        duplicate.style.position = "absolute";
                        gallery.appendChild(duplicate);
                    }
                });
            });
        }
    }, []);

    return (
        <div id="gallery" className='gallery' ref={galleryRef}>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
            <div className="gallery__item"></div>
        </div>
    );
}
