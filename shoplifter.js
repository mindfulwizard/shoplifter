(function shoplifter() {

    function createModal() {
        const cartTotal = document.querySelector('.order-value').innerHTML;
        const numItems = document.querySelector('.mini-cart-container').getAttribute('data-quantity');
        const imageSources = Array.from(document.querySelectorAll('.mini-cart-image'))
            .map(el => el.firstElementChild.firstElementChild.src);

        const outerDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        const amountDiv = document.createElement('div');
        amountDiv.innerHTML = `Cart total: ${cartTotal}`;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = `Cart quantity: ${numItems}`;

        outerDiv.appendChild(innerDiv);
        innerDiv.appendChild(descriptionDiv);
        innerDiv.appendChild(amountDiv);
        imageSources.forEach(src => {
            let img = document.createElement('img');
            img.src = src;
            imgDiv.appendChild(img);
        });
        innerDiv.appendChild(imgDiv);

        function styleModal(element) {
            element.style.display = 'block';
            element.style.zIndex = '1000';
            element.style.height = '100%';
            element.style.width = '100%';
            element.style.position = 'fixed';
            element.style.left = '0';
            element.style.top = '0';
            element.style.overflow = 'auto';
            element.style.backgroundColor = 'rgba(0,0,0,0.7)';

            const content = element.firstChild;
            content.style.backgroundColor = 'white';
            content.style.margin = '10% auto';
            content.style.width = '40%';
            content.style.textAlign = 'center';
            content.style.fontSize = '16px';

            const modalDivs = content.childNodes;
            modalDivs[0].style.display = 'inline-block';
            modalDivs[1].style.display = 'inline-block';
            modalDivs.forEach(node => node.style.padding = '3%');
        }

        styleModal(outerDiv);

        function createButtons() {
            function buttonMaker () {
                const button = document.createElement('button');
                button.style.margin = '5%';
                button.className = 'primary-button';
                return button;
            }

            const redirectButton = buttonMaker();
            redirectButton.innerHTML = 'Go to cart page';
            const cartPageLink = document.querySelector('.minicart-link').href;
            redirectButton.addEventListener('click', () => window.location.href = cartPageLink);

            const dismissButton = buttonMaker();
            dismissButton.innerHTML = 'Dismiss';
            dismissButton.addEventListener('click', () => {
                outerDiv.style.display = 'none';
                triggeredModal = false;
            });

            return [redirectButton, dismissButton];
        }

        const buttons = createButtons();
        innerDiv.appendChild(buttons[0]);
        innerDiv.appendChild(buttons[1]);
        return outerDiv;
    }

    function reachedBottom() {
        const totalScrolled = document.body.scrollTop + window.innerHeight;
        return totalScrolled >= (document.body.scrollHeight * .9);
    }
    
    let triggeredModal = false;

    function modalCtrl() {
        if(!reachedBottom() || triggeredModal) {return;}
        triggeredModal = true;
        const modal = createModal();
        document.body.appendChild(modal);
    }

    document.addEventListener('scroll', modalCtrl);
})();