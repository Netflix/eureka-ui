export function addModalOpen() {
  if (document && document.body) {
    var orig = document.body.className;
    document.body.className = orig + (orig ? ' ' : '') + 'modal-open';
  }
}

export function removeModalOpen() {
  if (document && document.body) {
    document.body.className = document.body.className.replace(/ ?modal-open/, '');
  }
}