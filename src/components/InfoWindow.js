import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export class InfoWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.map !== prevProps.map)) {
        let {
          map, google, mapCenter
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

    if (this.props.children !== prevProps.children) {
      this.updateContent();
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
    this.updateContent();
    this.infowindow.open(this.props.map, this.props.marker);
  }

  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }

  closeWindow() {
    this.infowindow.close();
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
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

  // callbacks
  onClose: React.PropTypes.func,
  onOpen: React.PropTypes.func
}

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow
