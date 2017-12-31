import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import './styles.scss';


class Alert extends Component {

  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node,
    dangerouslySetInnerHTML: PropTypes.shape({ __html: PropTypes.string }),
    dismissible: PropTypes.bool,
    display: PropTypes.bool,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  };

  static defaultProps = {
    animation: 'slide-down',
    children: null,
    dangerouslySetInnerHTML: undefined,
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
    const {
      type, dismissible, animation, children, display,
      dangerouslySetInnerHTML, ...alertOpts
    } = this.props;
    const { show } = this.state;

    return (
      <CSSTransitionGroup
        transitionName={animation}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
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
                styleName='close'
                onClick={() => this.setState({ show: false })}
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
