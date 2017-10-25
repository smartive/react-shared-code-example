import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

/**
 * Returns a Component rendering either a(nother) Component or a Loading Indicator Component based
 * on given criteria. This is eases the use of Skeleten UX patterns (described here
 * https://www.lukew.com/ff/entry.asp?1797) and improves the reuse and cleanliness of code.
 *
 * @param {React.Component} FullComponent
 * @param {React.Component} SkeletonComponent
 */
export const applySwitch = (FullComponent, SkeletonComponent) =>
  class extends Component {
    /**
     * Display Name to provide better output on error.
     *
     * @static
     */
    static displayName = `applySwitch(${FullComponent.name}, ${SkeletonComponent.name})`;

    /**
     * PropTypes to ensure the necessary criteria and load functions are provided.
     * This would, in a real world project, ideally be done with TypeScript or Flow to make sure
     * that these things are a) ensured at compile time and b) PropTypes from the Wrapped Components
     * are still provided to the outside world and not absorbed here.
     */
    static propTypes = {
      // This function is called to load the initial data.
      loadInitial: PropTypes.func.isRequired,
      // Boolean criteria whether the FullComponent or the SkeletonComponent should be rendered.
      // Should be `true` after `loadInitial` has completed.
      fullRender: PropTypes.bool.isRequired,
    };

    componentWillMount() {
      if (!this.props.fullRender) {
        this.props.loadInitial();
      }
    }

    render() {
      if (this.props.fullRender) {
        return <FullComponent {...this.props} />;
      }

      return <SkeletonComponent {...this.props} />;
    }
  };
