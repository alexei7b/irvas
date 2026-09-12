// в функцию будем передавать selector 
const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);
    numInputs.forEach(item => {
        item.addEventListener('input', (e) => {
            // console.log(e);
            // удалим все символы, которые явл. не цифрами
            item.value = item.value.replace(/\D/, '');
        });
    });
}

export default checkNumInputs;