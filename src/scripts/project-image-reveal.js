const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function revealImage(frame) {
  const image = frame.querySelector('.case-full-image');
  if (!image) return;

  const finish = async () => {
    try {
      await image.decode();
    } catch {
      frame.classList.add('is-ready');
      return;
    }

    if (reduceMotion.matches) {
      frame.classList.add('is-ready');
      return;
    }

    const width = Math.round(frame.clientWidth);
    const height = Math.round(frame.clientHeight);
    if (!width || !height) {
      frame.classList.add('is-ready');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'case-pixel-canvas';
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: true });
    const lowResolution = document.createElement('canvas');
    const pixelSize = Math.max(16, Math.round(width / 44));
    lowResolution.width = Math.ceil(width / pixelSize);
    lowResolution.height = Math.ceil(height / pixelSize);
    const lowContext = lowResolution.getContext('2d');
    if (!context || !lowContext) {
      frame.classList.add('is-ready');
      return;
    }

    lowContext.drawImage(image, 0, 0, lowResolution.width, lowResolution.height);
    context.imageSmoothingEnabled = false;
    context.drawImage(lowResolution, 0, 0, width, height);

    const columns = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);
    const cells = Array.from({ length: columns * rows }, (_, index) => index);
    for (let index = cells.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [cells[index], cells[swap]] = [cells[swap], cells[index]];
    }

    frame.append(canvas);
    frame.classList.add('is-ready');
    let cleared = 0;
    const started = performance.now();
    const duration = 680;

    function step(now) {
      const progress = Math.min(1, (now - started) / duration);
      const target = Math.floor(cells.length * (1 - Math.pow(1 - progress, 3)));
      while (cleared < target) {
        const cell = cells[cleared++];
        context.clearRect((cell % columns) * pixelSize, Math.floor(cell / columns) * pixelSize, pixelSize, pixelSize);
      }
      if (progress < 1) requestAnimationFrame(step);
      else canvas.remove();
    }

    requestAnimationFrame(step);
  };

  if (image.complete) finish();
  else {
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', () => frame.classList.add('is-ready'), { once: true });
  }
}

document.querySelectorAll('[data-pixel-image]').forEach(revealImage);
