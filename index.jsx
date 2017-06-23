import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import './styles.scss';


class Alert extends Component {

  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node,
    dismissible: PropTypes.bool,
    display: PropTypes.bool,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  };

  static defaultProps = {
    animation: 'slide-down',
    children: null,
    dismissible: false,
    display: true,
    type: 'info',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.display,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display !== this.state.show) {
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
            styleName='alert'
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
