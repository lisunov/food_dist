function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);
  const ACTIVE_ITEM = activeClass;
  const SHOW_ITEM = 'show';
  const HIDE_ITEM = 'hide';
  const FADE_ANIMATION = 'fade';

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add(HIDE_ITEM);
    item.classList.remove(SHOW_ITEM, FADE_ANIMATION);
  });
    tabs.forEach((item) => {
      item.classList.remove(ACTIVE_ITEM);
  });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add(SHOW_ITEM, FADE_ANIMATION);
    tabsContent[i].classList.remove(HIDE_ITEM);
    tabs[i].classList.add(ACTIVE_ITEM);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const { target } = event;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, index) => {
        if (item === target) {
        hideTabContent();
        showTabContent(index);
      }
      });
    }
  });
}

export default tabs;