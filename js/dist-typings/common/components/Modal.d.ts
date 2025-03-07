import Component from '../Component';
import { AlertAttrs } from './Alert';
import type Mithril from 'mithril';
import type ModalManagerState from '../states/ModalManagerState';
import type RequestError from '../utils/RequestError';
import type ModalManager from './ModalManager';
interface IInternalModalAttrs {
    state: ModalManagerState;
    animateShow: ModalManager['animateShow'];
    animateHide: ModalManager['animateHide'];
}
/**
 * The `Modal` component displays a modal dialog, wrapped in a form. Subclasses
 * should implement the `className`, `title`, and `content` methods.
 */
export default abstract class Modal<ModalAttrs = {}> extends Component<ModalAttrs & IInternalModalAttrs> {
    /**
     * Determine whether or not the modal should be dismissible via an 'x' button.
     */
    static readonly isDismissible = true;
    protected loading: boolean;
    /**
     * Attributes for an alert component to show below the header.
     */
    alertAttrs: AlertAttrs;
    oninit(vnode: Mithril.VnodeDOM<ModalAttrs & IInternalModalAttrs, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<ModalAttrs & IInternalModalAttrs, this>): void;
    onbeforeremove(vnode: Mithril.VnodeDOM<ModalAttrs & IInternalModalAttrs, this>): Promise<void> | void;
    view(): JSX.Element;
    /**
     * Get the class name to apply to the modal.
     */
    abstract className(): string;
    /**
     * Get the title of the modal dialog.
     */
    abstract title(): string;
    /**
     * Get the content of the modal.
     */
    abstract content(): Mithril.Children;
    /**
     * Handle the modal form's submit event.
     */
    abstract onsubmit(e: Event): void;
    /**
     * Callback executed when the modal is shown and ready to be interacted with.
     *
     * @remark Focuses the first input in the modal.
     */
    onready(): void;
    /**
     * Hides the modal.
     */
    hide(): void;
    /**
     * Sets `loading` to false and triggers a redraw.
     */
    loaded(): void;
    /**
     * Shows an alert describing an error returned from the API, and gives focus to
     * the first relevant field involved in the error.
     */
    onerror(error: RequestError): void;
}
export {};
