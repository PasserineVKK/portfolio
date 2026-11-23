const tabs = [...document.querySelectorAll('[data-capability-tab]')];

function selectCapability(id, focus = false) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.capabilityTab === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });

  document.querySelectorAll('[data-capability-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.capabilityPanel !== id;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () =>
    selectCapability(tab.dataset.capabilityTab),
  );
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft')
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    selectCapability(tabs[nextIndex].dataset.capabilityTab, true);
  });
});
