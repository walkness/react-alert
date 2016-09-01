import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';


class Alert extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    dismissible: PropTypes.bool,
    display: PropTypes.bool,
    animation: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    type: 'info',
    dismissible: false,
    display: true,
    animation: 'slide-down',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.display,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display !== this.props.display) {
      this.setState({ show: nextProps.display });
    }
  }

  render() {
    const { type, dismissible, animation, children, ...alertOpts } = this.props;
    const { show } = this.state;

    return (
      <ReactCSSTransitionGroup
        transitionName={animation}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >

        { show ?

          <div
            className={classNames('alert', `alert-${type}`, { 'alert-dismissible': dismissible })}
            {...alertOpts}
          >

            { dismissible ?
              <button
                type='button'
                className='close'
                onClick={() => this.setState({ show: false })}
                data-dismiss='alert'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            : null }

            { children }

          </div>

        : null }

      </ReactCSSTransitionGroup>
    );
  }
}

export default Alert;
