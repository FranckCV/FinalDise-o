const $openClose = document.querySelector("#menu_button"),
      $aside = document.querySelector("#menu_content"),
      $menuElements = document.querySelectorAll(".menu_element");

$openClose.addEventListener("click", () => {
    $aside.classList.toggle("desplegar");
});

$menuElements.forEach((menuElement, index) => {
    menuElement.addEventListener("click", () => {
        const submenuContent = menuElement.nextElementSibling;
        if (submenuContent && submenuContent.classList.contains("submenu_content")) {
            submenuContent.style.display = submenuContent.style.display === "flex" ? "none" : "flex";
        }
    });
});


// ANIMACIONES

const header_items = document.querySelector('header')
gsap.from(header_items.children,{
    opacity: 0,
    y: -50,
    duration: 0.1,
    stagger:{
        amount: 0.75
    }
});

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".domus_title",{
    display: "block",
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        toggleActions: "none none none none",
    }
},{
    display: "none",
    y: 100,
    opacity: 0,
    duration: 0.2,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        start: "top 85%",
        end: "top 85%",
        // markers:true,
        toggleActions: "play none reverse none",
    }
});

gsap.fromTo(".domus_img",{
    y: -200,
    opacity: 0,
    scale: 0.5,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        toggleActions: "none none none none",
    }
},{
    y: 0,
    opacity: 1,
    scale:1,
    duration: 0.2,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        start: "top 85%",
        end: "top 85%",
        // markers: true,
        toggleActions: "play none reverse none",
    }
});

gsap.utils.toArray('.domus_text').forEach(domus_text=>{
    gsap.fromTo(domus_text,{
        x: 500,
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: domus_text,
            toggleActions: "none none none none",
        }
    },{
        x: 0,
        opacity: 1,
        scale:1,
        duration: 0.2,
        scrollTrigger: {
            trigger: domus_text,
            start: "top 90%",
            end: "top 22.5%",
            toggleActions: "play none none none",
        }
    });
});

gsap.utils.toArray('.domus_text2').forEach(domus_text2=>{
    gsap.fromTo(domus_text2,{
        x: -1000,
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: domus_text2,
            toggleActions: "none none none none",
        }
    },{
        x: 0,
        opacity: 1,
        scale:1,
        duration: 0.2,
        scrollTrigger: {
            trigger: domus_text2,
            start: "top 70%",
            end: "top 22.5%",
            toggleActions: "play none none none",
        }
    });
});

gsap.utils.toArray('h1').forEach(h1=>{
    gsap.fromTo(h1,{
        letterSpacing:'5px',
        opacity:0,
        y:-150,
    },{
        letterSpacing:'0',
        opacity:1,
        y:0,
        duration: 0.2,
        scrollTrigger: {
            trigger: h1,
            start: "top 85%",
        }
    });
});


/* ------------------- CARRUSEL DE CARRITO --------------- */

const wrapper = document.querySelector(".list_product");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".product").offsetWidth;
const arrowBtns = document.querySelectorAll(".list_product i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
