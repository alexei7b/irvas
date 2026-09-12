const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');
        // 5
        const scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                console.log('click')
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
                // Добавим маржин при окрытии модалки
                document.body.style.marginRight = `${scroll}px`;
            });
        })

        // сокрытие модального окна
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
            // Уберем маржин при закритии модалки
            document.body.style.marginRight = `0px`;
        })

        // 12
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
                // Уберем маржин при закритии модалки
                document.body.style.marginRight = `0px`;
            }
        })

    }


    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = "block";
            document.body.classList.add('modal-open');
        }, time)
    }

    function calcScroll() {
        // что бы произвести рассчеты, нам нужен какойто блок
        let div = document.createElement('div');
        console.log('scroll')
        // Зададим этому блоку параметры
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        // вычисляем ширину скрола. offsetWidth - полная ширина, 
        // clientWidth - включает паддинги и главный контент, но не включается прокрутка
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        // как итог работы ф-ции вернем scrollWidth
        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;