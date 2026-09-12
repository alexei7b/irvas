const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector);
    const tabs = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);


    function hideTabContent() {
        content.forEach(item => {
            item.style.display = "none";
        })
        // Вписываем ф-ционал, при клике добавляется активный класс у элемента, по которому кликнули
        // У остальных он скрывается
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }
    // Отслеживаем по какому элементу нажал пользователь
    function showTabContent(i = 0) {
        content[i].style.display = display;
        // Вписываем ф-ционал, при клике добавляется активный класс у элемента, по которому кликнули
        // У остальных он скрывается
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();


    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tabs.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

export default tabs;