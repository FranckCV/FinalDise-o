// var container = document.getElementById('container_slider_product')
// var slider = document.getElementById('list_product');
// var slides = document.getElementsByClassName('product').length;
// var buttons = document.getElementsByClassName('btn_slider_product');

// var currentPosition = 0;
// var currentMargin = 0;
// var slidesPerPage = 0;
// var slidesCount = slides - slidesPerPage;
// var containerWidth = container.offsetWidth;
// var prevKeyActive = false;
// var nextKeyActive = true;

// window.addEventListener("resize", checkWidth);

// function checkWidth() {
// 	containerWidth = container.offsetWidth;
// 	setParams(containerWidth);
// }

// function setParams(w) {
// 	if (w < 551) {
// 		slidesPerPage = 1;
// 	} else {
// 		if (w < 901) {
// 			slidesPerPage = 2;
// 		} else {
// 			if (w < 1101) {
// 				slidesPerPage = 3;
// 			} else {
// 				slidesPerPage = 4;
// 			}
// 		}
// 	}
// 	slidesCount = slides - slidesPerPage;
// 	if (currentPosition > slidesCount) {
// 		currentPosition -= slidesPerPage;
// 	};
// 	currentMargin = - currentPosition * (100 / slidesPerPage);
// 	slider.style.marginLeft = currentMargin + '%';
// 	if (currentPosition > 0) {
// 		buttons[0].classList.remove('inactive');
// 	}
// 	if (currentPosition < slidesCount) {
// 		buttons[1].classList.remove('inactive');
// 	}
// 	if (currentPosition >= slidesCount) {
// 		buttons[1].classList.add('inactive');
// 	}
// }

// setParams();

// function slideRight() {
// 	if (currentPosition != 0) {
// 		slider.style.marginLeft = currentMargin + (100 / slidesPerPage) + '%';
// 		currentMargin += (100 / slidesPerPage);
// 		currentPosition--;
// 	};
// 	if (currentPosition === 0) {
// 		buttons[0].classList.add('inactive');
// 	}
// 	if (currentPosition < slidesCount) {
// 		buttons[1].classList.remove('inactive');
// 	}
// };

// function slideLeft() {
// 	if (currentPosition != slidesCount) {
// 		slider.style.marginLeft = currentMargin - (100 / slidesPerPage) + '%';
// 		currentMargin -= (100 / slidesPerPage);
// 		currentPosition++;
// 	};
// 	if (currentPosition == slidesCount) {
// 		buttons[1].classList.add('inactive');
// 	}
// 	if (currentPosition > 0) {
// 		buttons[0].classList.remove('inactive');
// 	}
// };













// const wrapper = document.querySelector(".list_product");
// const carousel = document.querySelector(".carousel");
// const firstCardWidth = carousel.querySelector(".product").offsetWidth;
// const arrowBtns = document.querySelectorAll(".list_product i");
// const carouselChildrens = [...carousel.children];

// let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// // Get the number of cards that can fit in the carousel at once
// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// // Insert copies of the last few cards to beginning of carousel for infinite scrolling
// carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
// });

// // Insert copies of the first few cards to end of carousel for infinite scrolling
// carouselChildrens.slice(0, cardPerView).forEach(card => {
//     carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });

// // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
// carousel.classList.add("no-transition");
// carousel.scrollLeft = carousel.offsetWidth;
// carousel.classList.remove("no-transition");

// // Add event listeners for the arrow buttons to scroll the carousel left and right
// arrowBtns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
//     });
// });

// const dragStart = (e) => {
//     isDragging = true;
//     carousel.classList.add("dragging");
//     // Records the initial cursor and scroll position of the carousel
//     startX = e.pageX;
//     startScrollLeft = carousel.scrollLeft;
// }

// const dragging = (e) => {
//     if(!isDragging) return; // if isDragging is false return from here
//     // Updates the scroll position of the carousel based on the cursor movement
//     carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// }

// const dragStop = () => {
//     isDragging = false;
//     carousel.classList.remove("dragging");
// }

// const infiniteScroll = () => {
//     // If the carousel is at the beginning, scroll to the end
//     if(carousel.scrollLeft === 0) {
//         carousel.classList.add("no-transition");
//         carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
//         carousel.classList.remove("no-transition");
//     }
//     // If the carousel is at the end, scroll to the beginning
//     else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
//         carousel.classList.add("no-transition");
//         carousel.scrollLeft = carousel.offsetWidth;
//         carousel.classList.remove("no-transition");
//     }

//     // Clear existing timeout & start autoplay if mouse is not hovering over carousel
//     clearTimeout(timeoutId);
//     if(!wrapper.matches(":hover")) autoPlay();
// }

// const autoPlay = () => {
//     if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
//     // Autoplay the carousel after every 2500 ms
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
// }
// autoPlay();

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);
// carousel.addEventListener("scroll", infiniteScroll);
// wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// wrapper.addEventListener("mouseleave", autoPlay);