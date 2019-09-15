const paintBucket = document.querySelector('.paint-bucket');
const chooseColor = document.querySelector('.choose-color');
const move = document.querySelector('.move');
const transform = document.querySelector('.transform');
const square = document.querySelectorAll('.square');
const colorEl = document.querySelectorAll('.color');
const currentColorEl = document.querySelector('.current-color');
const previousColorEl = document.querySelector('.previous-color');
const canvas = document.querySelector('#canvas');

function transformActive() {
  transform.classList.add('active');
  paintBucket.classList.remove('active');
  chooseColor.classList.remove('active');
  move.classList.remove('active');
}

function paintBucketActive() {
  paintBucket.classList.add('active');
  chooseColor.classList.remove('active');
  move.classList.remove('active');
  transform.classList.remove('active');
}

function chooseColorActive() {
  chooseColor.classList.add('active');
  paintBucket.classList.remove('active');
  move.classList.remove('active');
  transform.classList.remove('active');
}

function moveActive() {
  move.classList.add('active');
  paintBucket.classList.remove('active');
  chooseColor.classList.remove('active');
  transform.classList.remove('active');
}

// transform tool and paint bucket tool

transform.addEventListener('click', () => {
  transformActive();
});

paintBucket.addEventListener('click', () => {
  paintBucketActive();
});

Array.from(square).forEach((div) => {
  div.addEventListener('click', (event) => {
    const e = event;
    if (transform.classList.contains('active')) {
      e.target.classList.toggle('circle');
    }
    if (paintBucket.classList.contains('active')) {
      const currentColor = getComputedStyle(currentColorEl).backgroundColor;
      e.target.style.backgroundColor = currentColor;
    }
  });
});

// color picker tool

chooseColor.addEventListener('click', () => {
  chooseColorActive();
});

Array.from(colorEl).forEach((div) => {
  div.addEventListener('click', (event) => {
    if (chooseColor.classList.contains('active')) {
      const currentColor = getComputedStyle(currentColorEl).backgroundColor;
      const targetColor = getComputedStyle(event.target).backgroundColor;
      if (targetColor !== currentColor) {
        previousColorEl.style.backgroundColor = currentColor;
        currentColorEl.style.backgroundColor = targetColor;
      }
    }
  });
});

// move tool

move.addEventListener('click', () => {
  moveActive();
});

Array.from(square).forEach((div) => {
  div.addEventListener('mousedown', (e) => {
    const elem = div;
    function drapDrop() {
      function moveAt(event) {
        elem.style.left = `${event.pageX - div.offsetWidth / 2}px`;
        elem.style.top = `${event.pageY - div.offsetHeight / 2}px`;
      }
      moveAt(e);
      elem.style.zIndex = 1000;
      document.onmousemove = (event) => {
        moveAt(event);
      };
      elem.onmouseup = () => {
        document.onmousemove = null;
        elem.onmouseup = null;
      };
      elem.ondragstart = () => false;
    }

    if (move.classList.contains('active')) {
      if (div.style.position !== 'absolute') {
        elem.style.position = 'absolute';

        const replacement = document.createElement('div');
        replacement.className = 'replacement';
        canvas.insertBefore(replacement, e.target);

        drapDrop();
      } else {
        drapDrop();
      }
    }
  });
});

// keyboard controls

const keys = {
  p: 80, c: 67, m: 77, t: 84,
};

document.addEventListener('keyup', (event) => {
  if (event.keyCode === keys.p) { // key "p" activates paint bucket tool
    paintBucketActive();
  }
  if (event.keyCode === keys.c) { // key "c" activates color picker tool
    chooseColorActive();
  }
  if (event.keyCode === keys.m) { // key "m" activates move tool
    moveActive();
  }
  if (event.keyCode === keys.t) { // key "t" activates transform tool
    transformActive();
  }
});
