import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

const camelize = function(str) {
    return str.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

const evtNames = ['click', 'mouseover'];

export class InfoWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.place !== prevProps.place)) {
        let {
          map, google, place, mapCenter
        } = this.props;

        const iw = this.infowindow = new google.maps.InfoWindow({
          content: ''
        });

        google.maps.event
          .addListener(iw, 'closeclick', this.onClose.bind(this))
        google.maps.event
          .addListener(iw, 'domready', this.onOpen.bind(this));
    }

    if (this.props.visible !== prevProps.visible ||
        this.props.marker !== prevProps.marker) {
      this.setState({
        isOpen: this.props.visible,
      }, () => {
        this.props.visible ?
          this.openWindow() :
          this.closeWindow();
      })
    }
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  openWindow() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
    this.infowindow.open(this.props.map, this.props.marker);
  }

  closeWindow() {
    this.infowindow.close();
  }

  renderChildren() {
    const {children} = this.props;
    const component = React.cloneElement(children, {

    })

    return ReactDOMServer.renderToString(component);
  }

  render() {
    return null;
  }
}

InfoWindow.propTypes = {
  children: React.PropTypes.element.isRequired,
  map: React.PropTypes.object,
  marker: React.PropTypes.object,
  visible: React.PropTypes.bool,

  // callback
  onClose: React.PropTypes.func
}

evtNames.forEach(e => InfoWindow.propTypes[camelize(e)] = T.func)

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow
