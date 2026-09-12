const images = () => {
    console.log('images works');
    // создаем модальное окно
    const imgPopup = document.createElement('div');
    const workSection = document.querySelector('.works');
    const bigImage = document.createElement('img');

    // добавим мод. окну стили
    imgPopup.classList.add('popup');

    // Пока мод. окно сущестует только в JS. Поместим мод. окно в секцию html .workSection
    workSection.appendChild(imgPopup);

    // 3
    // Разместим мод. окно по центру (через inline стили)
    imgPopup.style.justifyContent = 'center';
    // выравняем по вертикали
    imgPopup.style.alignItems = 'center';
    // изначально изображение скрыто
    imgPopup.style.display = 'none';

    // так же в мод. окно поместим изображение
    imgPopup.appendChild(bigImage);

    // 4
    // Вешаем обработчик события на всю .workSection
    workSection.addEventListener('click', (e) => {
        console.log('КЛИК ПО WORKS');
        e.preventDefault();

        // запишем событие в переменную
        let target = e.target;

        // Условие: 1 - проверим наличие target, 2 - проверим что у этого элемента есть класс "preview"
        if (target && target.classList.contains('preview')) {
            // показываем окно
            imgPopup.style.display = "flex";

            // Показываем именно то изображение на котором был клик
            // ВАЖНО! У нас  <a href="assets/img/our_works/big_img/1.png"><img class="preview" src="assets/img/our_works/1.png" alt="window"></a>
            // Есть две ссылки на изображение: 1) - на обычное "...our_works/1.png", 2)  на большое "...our_works/big_img/1.png"
            // Возмем ссылку именно на большое изображение - our_works/big_img/1.png т.е. получим его в переменную path            
            const path = target.parentNode.getAttribute('href');  // обращаемся к parentNode т.к. ссылка именно в теге <a></a>

            // берем изображение, котор. существует внутри мод. окно и при помощи setAttribute, установим ему 'src'
            bigImage.setAttribute('src', path);
        }


        //5
        // Следующее условие: когда кликаем на подложку, мод. окно закрывается/
        // Проверяем наличие target и что клик пришелся не в изображение, а в образовавшийся popup
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
        }

    });
}
export default images;