import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {triggerMapUpdate, setStateValue} from '../actions/index';

class StyleSwitch extends Component {
  render() {
    return (
      <div
        id='style-switch'
        className='bg-black w-full h-full'
        onClick={() => {
          if (this.props.mapStyle === 'streets') this.props.setStateValue('mapStyle', 'satellite');
          else if (this.props.mapStyle === 'satellite') this.props.setStateValue('mapStyle', 'streets');
          this.props.setStateValue('needMapRestyle', true);
          this.props.triggerMapUpdate();
        }}
      >
        <ReactCSSTransitionGroup
          transitionName="style-switch"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
        >
          <img className='cover absolute top w-full h-full' alt='switch style' src={this.imgUrl} key={this.imgUrl} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  get imgUrl() {
    var style = this.props.mapStyle === 'streets' ? 'mapbox/satellite-v9/' : 'benjamintd/cj0szkyh5009i2slfhsmxhtni/';
    var base = 'https://api.mapbox.com/styles/v1/' + style + 'static/';
    var coords = this.props.center.join(',') + ',' + Math.max(0, this.props.zoom - 4);
    var size = '56x100@2x';

    return base
      + coords + '/'
      + size
      + '?access_token=' + this.props.accessToken
      + '&attribution=false';
  }
}

StyleSwitch.propTypes = {
  accessToken: React.PropTypes.string,
  center: React.PropTypes.array,
  setStateValue: React.PropTypes.func,
  mapStyle: React.PropTypes.string,
  triggerMapUpdate: React.PropTypes.func,
  zoom: React.PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.mapboxAccessToken,
    center: state.mapCenter,
    mapStyle: state.mapStyle,
    zoom: state.mapZoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStateValue: (k, v) => dispatch(setStateValue(k, v)),
    triggerMapUpdate: (v) => dispatch(triggerMapUpdate(v))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyleSwitch);
