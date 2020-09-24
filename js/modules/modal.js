function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  // modalWindow.classList.toggle('show');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}


function modal(triggerSelector, modalSelector, modalTimerId) {
  const callUs = document.querySelectorAll(triggerSelector);
  const modalWindow = document.querySelector(modalSelector);

  callUs.forEach((element) => {
    element.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close')==='') {
      closeModal(modalSelector);
    }
  });

  document.documentElement.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });



  function showModalByScroll() {
    const documentElement = document.documentElement;
    if (window.pageYOffset + documentElement.clientHeight >= documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal, openModal};