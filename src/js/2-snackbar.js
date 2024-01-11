import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");

function onSubmit () {
const delay = form.elements.delay.value;
const promise = new Promise((resolve, reject) => {
const isSubmitSuccessful = form.elements.state.value === "fulfilled";

setTimeout(() => {
        if(isSubmitSuccessful) {
            resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
            reject(`❌ Rejected promise in ${delay}ms`);
        }
    }, delay);
});

promise.then(
        value => {
            iziToast.show({
                backgroundColor: '#108C10',
                close: false,
                message: `✅ Fulfilled promise in ${delay}ms`,
                messageColor: '#ffffff',
                position: 'topRight'
    })
})
    .catch(
        error => {
            iziToast.show({
                backgroundColor: '#D82C20',
                close: false,
                message: `❌ Rejected promise in ${delay}ms`,
                messageColor: '#ffffff',
                position: 'topRight'
            })
    })
}

form.addEventListener("submit", submitForm);

function submitForm (evt) {
    evt.preventDefault();

    onSubmit();
    form.reset();
}
