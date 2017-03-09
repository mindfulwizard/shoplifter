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

        function styleModal() {
            outerDiv.style.display = 'none';
            outerDiv.style.zIndex = '1000';
            outerDiv.style.height = '100%';
            outerDiv.style.width = '100%';
            outerDiv.style.position = 'fixed';
            outerDiv.style.left = '0';
            outerDiv.style.top = '0';
            outerDiv.style.overflow = 'auto';
            outerDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';

            innerDiv.style.backgroundColor = 'white';
            innerDiv.style.margin = '10% auto';
            innerDiv.style.width = '40%';
            innerDiv.style.textAlign = 'center';
            innerDiv.style.fontSize = '16px';

            const contentDivs = innerDiv.childNodes;
            contentDivs[0].style.display = 'inline-block';
            contentDivs[1].style.display = 'inline-block';
            contentDivs.forEach(el => el.style.padding = '3%');
        }

        function createButtons() {
            function genericButtonMaker() {
                const button = document.createElement('button');
                button.style.margin = '5%';
                button.className = 'primary-button';
                return button;
            }

            const redirectButton = genericButtonMaker();
            redirectButton.innerHTML = 'Go to cart page';
            const cartPageLink = document.querySelector('.minicart-link').href;
            redirectButton.addEventListener('click', () => window.location.href = cartPageLink);

            const dismissButton = genericButtonMaker();
            dismissButton.innerHTML = 'Dismiss';
            dismissButton.addEventListener('click', () => outerDiv.style.display = 'none');

            return [redirectButton, dismissButton];
        }

        styleModal();
        const buttons = createButtons();
        innerDiv.appendChild(buttons[0]);
        innerDiv.appendChild(buttons[1]);
        document.body.appendChild(outerDiv);

        return outerDiv;
    }

    function reachedBottom() {
        const totalScrolled = document.body.scrollTop + window.innerHeight;
        return totalScrolled >= document.body.scrollHeight * .9;
    }

    function modalCtrl() {
        if(reachedBottom()) {
            return modal.style.display = 'block';
        }
    }

    const modal = createModal();
    document.addEventListener('scroll', modalCtrl);
})();