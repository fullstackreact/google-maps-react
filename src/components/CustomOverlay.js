import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function createPopupClass() {
  function Popup({ position, content, map, passThroughMouseEvents, onDraw }) {
    this.position = position;
    this.containerDiv = content;
    this.onDraw = onDraw;
    this.setMap(map);
    if (!passThroughMouseEvents) {
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
  }

  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  Popup.prototype.show = function () {
    this.containerDiv.style.visibility = 'visible';
  };

  Popup.prototype.hide = function () {
    this.containerDiv.style.visibility = 'hidden';
  };

  Popup.prototype.onAdd = function () {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  Popup.prototype.onRemove = function () {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  Popup.prototype.draw = function () {
    if (!this.position) {
      return;
    }
    this.onDraw();
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? 'block'
        : 'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}

const asLatLng = (position) =>
  !position || position instanceof google.maps.LatLng
    ? position
    : new google.maps.LatLng(position.lat, position.lng);

export const CustomOverlay = ({
  map,
  position,
  children,
  visible,
  className,
  passThroughMouseEvents
}) => {
  const [hasDrawn, setHasDrawn] = useState(false);
  const containerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (map) {
      const Popup = createPopupClass();
      popoverRef.current = new Popup({
        position: asLatLng(position),
        content: containerRef.current,
        map,
        passThroughMouseEvents,
        onDraw: () => setHasDrawn(true)
      });
    }
  }, [map]);

  useEffect(() => {
    const popover = popoverRef.current;
    if (popover) {
      popover.position = asLatLng(position);
      popover.draw();
    }
  }, [position]);

  useEffect(() => {
    const popover = popoverRef.current;
    if (popover) {
      visible ? popover.show() : popover.hide();
    }
  }, [visible]);

  const display = hasDrawn ? 'block' : 'none';
  return (
    <div
      className={className}
      style={{ position: 'absolute', display }}
      ref={containerRef}
    >
      {visible && children}
    </div>
  );
};

CustomOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  map: PropTypes.object,
  position: PropTypes.object,
  visible: PropTypes.bool,
  passThroughMouseEvents: PropTypes.bool
};

CustomOverlay.defaultProps = {
  visible: true
};

export default CustomOverlay;
