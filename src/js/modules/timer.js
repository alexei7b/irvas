const timer = (id, deadLine) => {
    // Ф-ция которая будет вычислять время до конца акции
    // endTime - время до конца акции, по факту это deadLine
    const getTimeRemaining = (endTime) => {

        // разница между текущим временем и deadLine
        const t = Date.parse(endTime) - Date.parse(new Date());
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 100 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor((t / (1000 * 60 * 60 * 24)))


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    // ф-ция помошник, которая будет добавлять 0 к значению меньше 10
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    }


    // Ф-ция котор. отвечает что за то что мы определенное значение помещаем в элемент на странице
    // selector - место куда помещаем, endTime
    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        // Запустим setInterval - котор. будет каждую секунду обновлять наш таймер
        // и что бы его в конечном счете остановить нам нужем будет его идентификатор
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();
        // ф-ция остановки таймера, она оперделяет сколько времени осталось до deadLine
        function updateClock() {
            // getTimeRemaining - вернет нам объект
            const t = getTimeRemaining(endTime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                // останавливаем интервал
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

export default timer;