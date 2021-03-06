import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Actions extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  onOpen(event) {
    this.dispatchEvent('actions:open actionsOpen', event);
  }

  onOpened(event) {
    this.dispatchEvent('actions:opened actionsOpened', event);
  }

  onClose(event) {
    this.dispatchEvent('actions:close actionsClose', event);
  }

  onClosed(event) {
    this.dispatchEvent('actions:closed actionsClosed', event);
  }

  open(animate) {
    const self = this;
    if (!self.$f7) return undefined;
    return self.$f7.actions.open(self.refs.el, animate);
  }

  close(animate) {
    const self = this;
    if (!self.$f7) return undefined;
    return self.$f7.actions.close(self.refs.el, animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      grid
    } = props;
    const classes = Utils.classNames(className, 'actions-modal', {
      'actions-grid': grid
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    const el = self.el;
    if (!el) return;
    el.removeEventListener('actions:open', self.onOpenBound);
    el.removeEventListener('actions:opened', self.onOpenedBound);
    el.removeEventListener('actions:close', self.onCloseBound);
    el.removeEventListener('actions:closed', self.onClosedBound);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const props = self.props;
    const {
      grid,
      target,
      convertToPopover,
      forceToPopover,
      opened
    } = props;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('actions:open', self.onOpenBound);
    el.addEventListener('actions:opened', self.onOpenedBound);
    el.addEventListener('actions:close', self.onCloseBound);
    el.addEventListener('actions:closed', self.onClosedBound);
    self.$f7ready(() => {
      const actionsParams = {
        el: self.refs.el,
        grid
      };
      if (target) actionsParams.targetEl = target;
      if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
      if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get el() {
    return __reactComponentEl(this);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.f7Actions) return;

      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
      }
    });
  }

}

__reactComponentSetProps(F7Actions, Object.assign({
  id: [String, Number],
  opened: Boolean,
  grid: Boolean,
  convertToPopover: Boolean,
  forceToPopover: Boolean,
  target: [String, Object]
}, Mixins.colorProps));

F7Actions.displayName = 'f7-actions';
export default F7Actions;