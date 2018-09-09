import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import './styles.scss';


class Alert extends Component {
  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    dangerouslySetInnerHTML: PropTypes.shape({ __html: PropTypes.string }),
    dismissible: PropTypes.bool,
    display: PropTypes.bool,
    onDismiss: PropTypes.func,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  };

  static defaultProps = {
    animation: 'slide-down',
    children: null,
    className: null,
    dangerouslySetInnerHTML: undefined,
    dismissible: false,
    display: true,
    onDismiss: undefined,
    type: 'info',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.display,
    };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display !== this.state.show) {
      this.setState({ show: nextProps.display });
    }
  }

  handleDismiss() {
    const { onDismiss } = this.props;
    if (onDismiss) onDismiss();
    this.setState({ show: false });
  }

  render() {
    const {
      type, dismissible, animation, className, children, display,
      dangerouslySetInnerHTML, onDismiss, ...alertOpts
    } = this.props;
    const { show: stateShow } = this.state;

    const show = onDismiss ? display : stateShow;

    return (
      <CSSTransitionGroup
        transitionName={animation}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >

        { show ?

          <div
            className={classNames(
              'alert',
              `alert-${type}`, {
                'alert-dismissible': dismissible,
              },
              className,
            )}
            styleName='alert'
            {...alertOpts}
          >

            { dismissible ?
              <button
                type='button'
                className='close'
                styleName='close'
                onClick={this.handleDismiss}
                data-dismiss='alert'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            : null }

            { dangerouslySetInnerHTML ?
              <div
                dangerouslySetInnerHTML={dangerouslySetInnerHTML} // eslint-disable-line react/no-danger, max-len
              />
            : children }

          </div>

        : null }

      </CSSTransitionGroup>
    );
  }
}

export default Alert;
