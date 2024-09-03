document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos de filtros
    const filterElements = document.querySelectorAll('.ctlg_filters_element');

    // Itera sobre cada elemento de filtro
    filterElements.forEach(element => {
        // Selecciona el subcontenido relacionado a este filtro
        const subContent = element.nextElementSibling;

        // Añade un evento de click al filtro principal
        element.addEventListener('click', () => {
            // Verifica si el subcontenido está visible o no
            const isVisible = !subContent.classList.contains('ctlg_filters_subcontent_hidden');

            // Oculta todos los subcontenidos
            document.querySelectorAll('.ctlg_filters_subcontent').forEach(sub => {
                sub.classList.add('ctlg_filters_subcontent_hidden');
            });

            // Alterna la visibilidad del subcontenido actual
            if (!isVisible) {
                subContent.classList.remove('ctlg_filters_subcontent_hidden');
            }

            // const icon = filter.classList.contains('fa-solid fa-plus');
            // if (icon) {
            //     icon.classList.toggle('fa-solid fa-minus');
            // } else {
            //     icon.classList.toggle('fa-minus');
            // }

        });
    });

    // Function to apply filters (example based on categories)
    const applyFilters = () => {
        const selectedCategories = [];
        const categoryElements = document.querySelectorAll('.ctlg_filters_subelement input[type="checkbox"]:checked');

        categoryElements.forEach(checkbox => {
            selectedCategories.push(checkbox.parentElement.textContent.trim());
        });

        const products = document.querySelectorAll('.product'); // Assumes products have a class "product"
        
        products.forEach(product => {
            const productCategory = product.dataset.category; // Assumes products have a data attribute "data-category"
            
            if (selectedCategories.length === 0 || selectedCategories.includes(productCategory)) {
                product.style.display = 'grid'; // Show product
            } else {
                product.style.display = 'none'; // Hide product
            }
        });
    };

    // Attach event listeners to the checkboxes
    const checkboxes = document.querySelectorAll('.ctlg_filters_subelement input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Initially apply filters on page load
    applyFilters();

    // Agregar evento para seleccionar el checkbox cuando se haga click en el elemento del filtro
    const filterSubElements = document.querySelectorAll('.ctlg_filters_subelement');
    filterSubElements.forEach(subelement => {
        subelement.addEventListener('click', () => {
            const checkbox = subelement.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            applyFilters();
        });
    });

    const buttonUpPage = document.querySelectorAll('.return_up_button');
    buttonUpPage.forEach(button => {
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

});
