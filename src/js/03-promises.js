// Підключаємо повідомлення
import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number.parseInt(e.currentTarget.elements.delay.value);
  const step = Number.parseInt(e.currentTarget.elements.step.value);
  const amount = Number.parseInt(e.currentTarget.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay).then(({ position, delay }) => {
      //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}

// Функція створення промісу
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });

  return promise;
}
