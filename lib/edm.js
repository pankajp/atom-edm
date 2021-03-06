'use babel';

import EdmView from './edm-view';
import { CompositeDisposable } from 'atom';

export default {

  edmView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.edmView = new EdmView(state.edmViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.edmView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://EDM-Commander') {
          return new EdmView();
        }
      }),
    );

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'edm:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.edmView.destroy();
  },

  serialize() {
    return {
      edmViewState: this.edmView.serialize()
    };
  },

  toggle() {
    console.log('Edm was toggled!');
    atom.workspace.toggle('atom://EDM-Commander');
  }

};
