// FUNCIONALIDAD Y ANIMACIÓN MENU DESPLEGLABE

const 
    // $openClose = document.querySelector("#menu_button"),
    // $aside = document.querySelector("#menu_content"),
    $menuElements = document.querySelectorAll(".ctlg_filters_element");
    // $submenus = document.querySelectorAll(".ctlg_filters_subcontent");

// $openClose.addEventListener("click", () => {
//     $aside.classList.toggle("desplegar");
//     adjustPadding();
// });

$menuElements.forEach((menuElement, index) => {
    menuElement.addEventListener("click", () => {        
        const submenuContent = menuElement.nextElementSibling;
        // const iconMenu = menuElement.querySelector(".fa-chevron-down");
        if (submenuContent && submenuContent.classList.contains("ctlg_filters_subcontent")) {
            if (submenuContent.style.display === "flex") {
                // Animación de salida
                // gsap.to(iconMenu, {
                //     rotate: 0,
                //     duration: 0.2,
                // });
                gsap.to(submenuContent, {
                    height: 0,
                    duration: 0.5,
                    onComplete: () => {
                        submenuContent.style.display = "none";
                    }
                });
                gsap.to(submenuContent.children, {
                    opacity: 0,
                    y: -50,
                    duration: 0.1,
                    stagger: {
                        amount: -0.25
                    }
                });
            } else {
                submenuContent.style.display = "flex";
                const submenuHeight = submenuContent.scrollHeight;
                submenuContent.style.height = "0px";
                // gsap.to(iconMenu, {
                //     rotate: -180,
                //     duration: 0.2,
                // });
                gsap.to(submenuContent, {
                    height: submenuHeight,
                    duration: 0.3,
                    onComplete: () => {
                        submenuContent.style.height = "auto";
                    }
                });
                gsap.fromTo(submenuContent.children, {
                    opacity: 0,
                    y: -50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    stagger: {
                        amount: 0.25
                    }
                });
            }
        }
    });
});
