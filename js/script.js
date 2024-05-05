const form = document.querySelector('.form');
const submit = document.querySelector('.form__submit')
const url = 'https://order.drcash.sh/v1/order';
const inputs =document.querySelectorAll('.form__inp')
const error = document.querySelector('.error')

function postOrder(client) {
    console.log(client);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA'
        },
        body: JSON.stringify({
            'stream_code': 'vv4uf',
            'client': client
        })
    }).then(response => response.json());
}

function validation(inp){
    const errMsg = inp.nextElementSibling
    if(inp.validity.patternMismatch){
        errMsg.textContent = inp.getAttribute('data-error-pattern')
    } else if (inp.validity.valueMissing){
        errMsg.textContent = 'Поле не должно быть пустым'
    } else if(inp.validity.tooLong || inp.validity.tooShort){
        errMsg.textContent = inp.getAttribute('data-error-length')
    }
    else {
        errMsg.textContent = ''
    }
    submit.disabled = !Array.from(inputs).every((inp)=> inp.validity.valid)
}

function formSubmit(e) {
    e.preventDefault();
    const numbers = JSON.parse(localStorage.getItem('numbers')) || []
    const { name, phone } = e.target.elements;
    const obj = {
        name: name.value,
        phone: phone.value
    };
    if(!numbers.includes(phone.value)){
        error.classList.add('hidden')
        postOrder(obj)
            .then(data => {
                localStorage.setItem('numbers', JSON.stringify([...numbers, phone.value]))
                window.location.href = '/pages/try.html'
            })
            .catch(err => console.error(err));
    }else {
        error.classList.remove('hidden')
    }
}

form.addEventListener('submit', formSubmit);
inputs.forEach(inp => inp.addEventListener('input', () => validation(inp)))