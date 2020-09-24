import {closeModal, openModal} from './modal';
import {postData} from '../services/services'

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const  message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так',
  };

  forms.forEach(form => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener('submit', e=>onSubmit(e, form));
  }

  function onSubmit(event, form) {
    event.preventDefault();
    const currentModal = document.querySelector('img[data-loading="1"]');
    if (currentModal !== null) {
      return;
    }

    const statusMessage = document.createElement('img');
    statusMessage.setAttribute('data-loading', '1');
    statusMessage.style.cssText = 'display:block; margin:0 auto;';
    statusMessage.src = message.loading;
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);
    const jsonObject = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', jsonObject)
      .then((data) => {
      console.log(data);
    showThanksModal(message.success);

    statusMessage.remove();
  }).catch(() => {
      showThanksModal(message.failure);
  }).finally(() => {
      form.reset();
  });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div data-close class="modal__close">×</div>
          <div class="modal__title">${message}</div>
      </div>`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      modalDialog.classList.add('show');
    modalDialog.classList.remove('hide');
    thanksModal.remove();
    closeModal('.modal');
  }, 5000)
  };


}

export default forms;