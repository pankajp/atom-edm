'use babel';

const {exec} = require('child_process');

export default class EdmView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('edm');

    // Create message element
    // const frame = document.createElement('iframe');
    // Fix from @kwaak (https://github.com/webBoxio/atom-html-preview/issues/1/#issuecomment-49639162)
    // Allows for the use of relative resources (scripts, styles)
    // frame.setAttribute("sandbox", "allow-scripts allow-same-origin")
    // frame.src = '../html/edm.html';
    // this.element.appendChild(frame);

    const message = document.createElement('pre');
    message.textContent = 'The Edm package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
    exec('edm info', {}, (error, stdout, stderr) => {
      console.log('EDM info:', error, stdout, stderr);
      message.textContent = stdout;
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    // Used by Atom for tab text
    return 'EDM Commander';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://EDM-Commander';
  }

}
