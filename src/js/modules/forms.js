import checkNumInputs from "./checkNumInputs";
const forms = (state) => {
    // 2
    // соберем данные с формы
    const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');
    // 20



    checkNumInputs('input[name="user_phone"]');
    // 3
    // для оповещения пользователя
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    }

    // 9-14
    // Функция с запросом.
    const postData = async (url, data) => {
        // 10
        // Поместим сообщение loading - Загрузка
        document.querySelector('.status').textContent = message.loading;

        // 11
        // сам запрос
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        // 12
        // вернем запрос
        return await res.text();

    };

    // 16
    // Очищаем форму
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    // 4
    // На каждую форму навесим обработчик события
    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); // отмеяем стандартное поведение браузера

            // 5
            // Перед отправкой запроса, нужно подготовить форму
            let statusMessage = document.createElement('div');

            // 6
            // добавим стили новому блоку
            statusMessage.classList.add('status');

            // 7
            // Пока этот блок statusMessage, находится только внутри JS
            // Нам нужно его поместить на страницу, appendChild - в конец нашей формы
            item.appendChild(statusMessage);

            // 8
            // Собираем все данные которые есть у нас в форме
            // На данный момент самым простым и актуальным явл. FormData
            const formData = new FormData(item);   // данные из формы item

            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // 9-15
            // Делаем запрос. Вынесем в отдельную ф-цию.
            // Внутри папки assets есть server.php - 
            // (он в виде строки возвращает, массив тех данных, которые пользователь вписал в форму )
            postData('assets/server.php', formData)
                // ответом будет промис
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    console.log('error');
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    // 16
                    // Очищаем форму
                    clearInputs();

                    // Если это последняя форма калькулятора
                    if (item.getAttribute('data-calc') === 'end') {
                        setTimeout(() => {
                            const popupCalcEnd = document.querySelector('.popup_calc_end');

                            popupCalcEnd.style.display = 'none';
                            document.body.classList.remove('modal-open');

                            console.log('ПОСЛЕДНЕЕ ОКНО ЗАКРЫТО');
                        }, 5000);
                    }
                    // 17
                    // Убераем форму через время
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000)
                })

        });
    });
};

export default forms;