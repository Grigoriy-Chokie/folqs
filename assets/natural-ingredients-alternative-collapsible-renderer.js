document.addEventListener('DOMContentLoaded', function () {
    const collapsibleContainers = document.querySelectorAll('.ingredients__collapsible-content');
    const itemElements = document.querySelectorAll('.ingredients__item.ingredients__item--collapsible');

    const loadPageContent = async (popupIndex) => {
        const contentContainer = document.getElementById(`collapsible-content-${popupIndex}`);
        let popupPageLink = contentContainer?.getAttribute('page-link');
        try {
            const response = await fetch(popupPageLink);

            if (!response.ok) {
                throw new Error('Failed to load page');
            }

            const pageHTML = await response.text();

            const parser = new DOMParser();
            const incomingDocument = parser.parseFromString(pageHTML, 'text/html');

            const mainContent = incomingDocument.querySelector('#MainContent');

            if (!mainContent) {
                throw new Error('MainContent element not found');
            }
            contentContainer.appendChild(mainContent.cloneNode(true));
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    };

    collapsibleContainers.forEach((popupContainer, index) => {
        loadPageContent(index + 1);
    });

    (function () {
        itemElements.forEach((item) => {
            item.addEventListener('click', handleClick);
        });

        function handleClick() {
            let isContainerActive = !this.classList.contains('active');
            this.classList.toggle('active', isContainerActive);

            collapsibleContainers.forEach((container) => {
                if (container.getAttribute('index') == this.getAttribute('index')) {
                    container.classList.toggle('active', isContainerActive);
                }
            });
        }
    })();
}, {once: true});