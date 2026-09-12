import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    // Получаем элементы:
    // 1. windowForm - в первом попап окне выбираем  .balcon_icons, внутри которого есть табы .balcon_icons_img
    // нам необходимо что бы при клике на каждое изображение, на каждый tab у нас что то происходило.
    //  И тогда мы точно сможем проследить куда кликнул пользователь
    const windowForm = document.querySelectorAll('.balcon_icons_img');

    // 2. ширина окна (котор. выберет пользователь) - по id = width
    const windowWidth = document.querySelectorAll('#width');

    // 3. высота окна
    const windowHeigth = document.querySelectorAll('#height');

    // 4. тип окна - этот элемент, уже будет на следующем модальном окне (после клика на "Далее") 
    const windowType = document.querySelectorAll('#view_type');

    // 5. профиль окна
    const windowProfile = document.querySelectorAll('.checkbox');

    state.form = 0;
    state.type = windowType[0].value;
    state.profile = "Холодное";
    windowProfile[0].checked = true;


    checkNumInputs('#width');
    checkNumInputs('#height');

    // event - отслеживает событие (клик, инпут)
    // elem - на котор. будет происходить событие
    // prop - проперти котор. мы будем изменять в state
    function bindActionToElements(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        console.log('span');
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            // проверим какой из 2х чекбоксов выбран и запишем в объект
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            // уберем галочки из всех чекбоксов, кроме того который кликнул пользователь
                            elem.forEach((box, j) => {
                                // каждый checkbox который сюда придет, установим ему значение - false
                                box.checked = false;
                                // но как только мы натыкаемся на тот checkbox, который выбрал пользователь
                                if (i == j) {
                                    box.checked = true;
                                }

                            })
                            console.log('checkbox')
                        } else {
                            state[prop] = item.value;
                            console.log('input')
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        console.log('select');
                        break;
                }
                console.log(state);

            })
        })
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('input', windowHeigth, 'height');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('input', windowProfile, 'profile');

    const nextButton = document.querySelector('.popup_calc_button');

    const popupCalc = document.querySelector('.popup_calc');
    const popupCalcProfile = document.querySelector('.popup_calc_profile');

    const closeCalcProfile = document.querySelector('.popup_calc_profile_close');

    closeCalcProfile.addEventListener('click', () => {
        popupCalcProfile.style.display = 'none';
        document.body.classList.remove('modal-open');

        console.log('ШАГ 6: второе окно закрыто');
    });
    nextButton.addEventListener('click', () => {
        if (!state.width || !state.height) {
            console.log('ШАГ 3: ширина или высота НЕ заполнены');
            return;
        }

        console.log('ШАГ 3: ширина и высота заполнены');

        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'block';

        console.log('ШАГ 4: перешли к выбору типа остекления');
    });

};

export default changeModalState;