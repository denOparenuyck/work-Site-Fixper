window.addEventListener('DOMContentLoaded', () => {




    /*=====================BURGER MENU=======================*/
    const menu = document.querySelector('.header__menu'),
        toggle = document.querySelector('.toggle'),
        linkMenu = document.querySelectorAll('.nav__list-link'),
        locationName = document.querySelector('.location__name'),
        locationMapSettings = document.querySelector('.location__map-settings'),
        contentPromo = document.querySelector('.hero__content-promo'),
        contentPromoClose = document.querySelector('.hero__content-promo-close');

    locationName.addEventListener('click', () => {
        locationMapSettings.classList.toggle('location__map-settings-active');
        menu.classList.remove('nav__menu-show');
        toggle.classList.remove('active');
    });

    toggle.addEventListener('click', () => {
        menu.classList.toggle('nav__menu-show');
        locationMapSettings.classList.remove('location__map-settings-active');
        toggle.classList.toggle('active');
    });

    linkMenu.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('nav__list-link')) {
                menu.classList.remove('nav__menu-show');
                toggle.classList.remove('active');
            }
        });
    });

    contentPromoClose.addEventListener('click', () => {
        contentPromo.classList.add('hero__content-promo-close-active');
        document.querySelector('.hero-content__descr-btn').classList.add('hero-content__descr-btn-active');
    });

    /*=====================/BURGER MENU=======================*/


    /*=====================ACTIVE ANIMATION=======================*/

    const animateItems = document.querySelectorAll('.animate-item');

    if (animateItems.length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        function animateOnScroll() {
            for (let i = 0; i < animateItems.length; i++) {
                const animateItem = animateItems[i],
                    animateItemHeight = animateItem.offsetHeight,
                    animateItemOffset = offset(animateItem).top,
                    animateItemStart = 0.5;

                let animateItemPoint = window.innerHeight - animateItemHeight / animateItemStart;

                if (animateItemHeight > window.innerHeight) {
                    animateItemPoint = window.innerHeight - window.innerHeight / animateItemStart;
                }

                if ((window.pageYOffset > animateItemOffset - animateItemPoint) &&
                    window.pageYOffset < (animateItemOffset + animateItemHeight)) {
                    animateItem.classList.add('active-animation');
                } else {
                    if (!animateItem.classList.contains('animate-no-hide')) {
                        animateItem.classList.remove('active-animation');
                    }
                }
            }
        }

        setTimeout(() => {
            animateOnScroll();
        }, 300);
    }


    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top
        };
    }
    /*=====================/ACTIVE ANIMATION=======================*/


    /*=====================SLIDER=======================*/
    function createDots(panelDots, countItem, dotsClass) {

        const itemCount = document.querySelectorAll(countItem);
        const wrapperDot = document.querySelector(panelDots);
        let dot;

        for (let i = 0; i < itemCount.length; i++) {
            dot = document.createElement('li');
            dot.setAttribute('class', `panel-control__dots-item ${dotsClass}`);
            wrapperDot.append(dot);
        }
    }
    createDots('.workers-panel-control__dots', '.workers-slider__item', 'workers-panel-control__dots-item');
    createDots('.recall-panel-control__dots', '.recall-slider__item', 'recall-panel-control__dots-item');



    function slider(slidesToShow, slidesToScroll, nameSlider, trackSlider, item, btnprev, brnnext, dotsClass) {

        let position = 0;
        const container = document.querySelector(nameSlider);
        const track = document.querySelector(trackSlider);
        const itemSlider = document.querySelectorAll(item);
        const itemCount = itemSlider.length;
        const btnPrev = document.querySelector(btnprev);
        const btnNext = document.querySelector(brnnext);
        const itemWidth = container.offsetWidth / slidesToShow;
        const movePosition = slidesToScroll * itemWidth;
        let indexSlide = 0;

        itemSlider.forEach(item => {
            item.style.minWidth = itemWidth + 'px';
        });


        function active(i = 0) {
            const dots = document.querySelectorAll(`.${dotsClass}`);


            dots.forEach((item, index) => {
                item.classList.remove("panel-control__dots-item--active");

                item.addEventListener('click', () => {
                    indexSlide = index;
                    active(indexSlide);
                    position = -(movePosition * indexSlide) + itemWidth;
                    if (indexSlide == 0) {
                        position = 0;
                    }
                    setPosition();
                    checkBtn();
                });
            });
            if (i == 0) {
                btnPrev.disabled = true;
            }
            dots[i].classList.add("panel-control__dots-item--active");
        }
        active();

        btnNext.addEventListener('click', () => {
            const itemLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
            position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
            indexSlide++;

            setPosition();
            checkBtn();
            active(indexSlide);
        });

        btnPrev.addEventListener('click', () => {
            const itemLeft = Math.abs(position) / itemWidth;
            position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
            indexSlide--;

            setPosition();
            checkBtn();
            active(indexSlide);
        });


        function setPosition() {
            track.style.transform = `translateX(${position}px)`;
        }

        function checkBtn() {
            btnPrev.disabled = position === 0;
            btnNext.disabled = position <= - (itemCount - slidesToShow) * itemWidth;
        }
        checkBtn();

    }

    slider(3, 3, '.workers-slider', '.workers-slider__inner', '.workers-slider__item', '.workers-btn__prev', '.workers-btn__next', 'workers-panel-control__dots-item');
    slider(2, 2, '.recall-slider', '.recall-slider__inner', '.recall-slider__item', '.recall-btn__prev', '.recall-btn__next', 'recall-panel-control__dots-item');


    window.addEventListener('resize', () => {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewportWidth > 1160) {
            slider(3, 3, '.workers-slider', '.workers-slider__inner', '.workers-slider__item', '.workers-btn__prev', '.workers-btn__next', 'workers-panel-control__dots-item');
            slider(2, 2, '.recall-slider', '.recall-slider__inner', '.recall-slider__item', '.recall-btn__prev', '.recall-btn__next', 'recall-panel-control__dots-item');
        }
        if (viewportWidth < 1160) {
            slider(2, 2, '.workers-slider', '.workers-slider__inner', '.workers-slider__item', '.workers-btn__prev', '.workers-btn__next', 'workers-panel-control__dots-item');
            slider(1, 1, '.recall-slider', '.recall-slider__inner', '.recall-slider__item', '.recall-btn__prev', '.recall-btn__next', 'recall-panel-control__dots-item');
        }

        if (viewportWidth < 550) {
            slider(1, 1, '.workers-slider', '.workers-slider__inner', '.workers-slider__item', '.workers-btn__prev', '.workers-btn__next', 'workers-panel-control__dots-item');
        }
    });
    /*=====================/SLIDER=======================*/



    /*=====================DIAGNOSTICS-SECTION=======================*/
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelectorAll('[data-close]'),
        modal = document.querySelectorAll('.diagnostics-box');

    let count = 0;


    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            const box = document.querySelector(item.dataset.modal);
            openBox(box);
            count++;

        });
    });

    modalCloseBtn.forEach(item => {
        item.addEventListener('click', () => {
            const btn = item.closest('.diagnostics-box--active');
            close(btn);
        });
    });



    function openBox(modal) {
        if (modal == null) {
            return;
        } else {
            modal.classList.add('diagnostics-box--active');
            modal.classList.remove('diagnostics-box');
        }
    }

    function close(modal) {
        if (modal == null) {
            return;
        } else {
            modal.classList.add('diagnostics-box');
            modal.classList.remove('diagnostics-box--active');
        }
    }









    const openSelectBtn = document.querySelector('.diagnostics-content__select'),
        selecList = document.querySelector('.diagnostics-content__list'),
        selectItem = document.querySelectorAll('.diagnostics-content__list-item-btn');

    openSelectBtn.addEventListener('click', () => {
        selecList.classList.toggle('diagnostics-content__list--active');
        openSelectBtn.classList.toggle('diagnostics-content__select--active');
    });

    selectItem.forEach(function (item) {
        item.addEventListener('click', function () {
            openSelectBtn.innerText = this.innerText;
            selecList.classList.remove('diagnostics-content__list--active');
        });
    });



    /*=====================/DIAGNOSTICS-SECTION=======================*/



    /*=====================PRICE-SECTION=======================*/

    const showPriceBtn = document.querySelector('.price-content__show-all'),
        priceWrapper = document.querySelector('.price-content__work-item-wrapper');


    showPriceBtn.addEventListener('click', () => {
        priceWrapper.classList.toggle('price-content__work-item-wrapper--active');
        showPriceBtn.classList.toggle('price-content__show-all--active');
    });

    /*=====================/PRICE-SECTION=======================*/





    /*=====================ACCORDION=======================*/
    const accordionBtn = document.querySelectorAll('.questions-description__accordion-btn');

    accordionBtn.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentNode;
            parent.classList.toggle('questions-description__accordion--active');
        });
    });
    /*=====================/ACCORDION=======================*/






    //=====================SMOOTH-SCROLL===============
    new SmoothScroll('.nav__list a[href*="#"]', {
        speed: 350
    });
    //=====================/SMOOTH-SCROLL===============



});


