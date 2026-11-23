document.querySelectorAll('[data-output-open]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.outputOpen);
  if (!(dialog instanceof HTMLDialogElement)) return;

  trigger.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('[data-output-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => trigger.focus());
});
