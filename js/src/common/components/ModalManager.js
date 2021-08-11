import Component from '../Component';
import { createFocusTrap } from '../utils/focusTrap';

/**
 * The `ModalManager` component manages a modal dialog. Only one modal dialog
 * can be shown at once; loading a new component into the ModalManager will
 * overwrite the previous one.
 */
export default class ModalManager extends Component {
  /**
   * @type {import('../utils/focusTrap').FocusTrap | undefined}
   */
  focusTrap;

  view() {
    const modal = this.attrs.state.modal;

    return (
      <div className="ModalManager modal fade">
        {modal
          ? modal.componentClass.component({
              ...modal.attrs,
              animateShow: this.animateShow.bind(this),
              animateHide: this.animateHide.bind(this),
              state: this.attrs.state,
            })
          : ''}
      </div>
    );
  }

  /**
   * @param {import('mithril').VnodeDOM<{}, this>} vnode
   */
  oncreate(vnode) {
    super.oncreate(vnode);

    // Ensure the modal state is notified about a closed modal, even when the
    // DOM-based Bootstrap JavaScript code triggered the closing of the modal,
    // e.g. via ESC key or a click on the modal backdrop.
    this.$().on('hidden.bs.modal', this.attrs.state.close.bind(this.attrs.state));

    this.focusTrap = createFocusTrap(this.element);
  }

  onupdate(vnode) {
    super.onupdate(vnode);
  }

  animateShow(readyCallback) {
    const dismissible = !!this.attrs.state.modal.componentClass.isDismissible;

    // If we are opening this modal while another modal is already open,
    // the shown event will not run, because the modal is already open.
    // So, we need to manually trigger the readyCallback.
    if (this.$().hasClass('in')) {
      readyCallback();
      return;
    }

    this.$()
      .one('shown.bs.modal', readyCallback)
      .modal({
        backdrop: dismissible || 'static',
        keyboard: dismissible,
      })
      .modal('show');

    if (this.focusTrap) this.focusTrap.activate();
  }

  animateHide() {
    this.$().modal('hide');

    if (this.focusTrap) this.focusTrap.deactivate();
  }
}
