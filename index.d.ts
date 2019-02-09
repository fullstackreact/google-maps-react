import 'googlemaps'
import * as React from 'react'

interface IGoogleApiOptions {
  apiKey: string,
  libraries?: string[],
  client?: string,
  url?: string,
  version?: string,
  language?: string,
  region?: string,
  LoadingContainer?: any
}
type GoogleApiOptionsFunc = (props: any) => IGoogleApiOptions

type Omit<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>>

export type GoogleAPI = typeof google
export function GoogleApiWrapper(opts: IGoogleApiOptions | GoogleApiOptionsFunc):
  <TProps extends IProvidedProps>(ctor: React.ComponentType<TProps>) => React.ComponentType<Omit<TProps, IProvidedProps>>

export interface IProvidedProps {
  google: GoogleAPI
  loaded?: boolean
}

type mapEventHandler = (mapProps?: IMapProps, map?: google.maps.Map, event?) => any

type Style = Object<string, string | number | boolean>

export interface IMapProps extends google.maps.MapOptions {
  google: GoogleAPI
  loaded?: boolean

  style?: Style
  containerStyle?: Style

  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  centerAroundCurrentLocation?: boolean
  initialCenter?: google.maps.LatLngLiteral
  center?: google.maps.LatLngLiteral

  visible?: boolean

  onReady?: mapEventHandler
  onClick?: mapEventHandler
  onDragend?: mapEventHandler
  onRecenter?: mapEventHandler
  onBoundsChanged?: mapEventHandler
  onCenterChanged?: mapEventHandler
  onDblclick?: mapEventHandler
  onDragstart?: mapEventHandler
  onHeadingChange?: mapEventHandler
  onIdle?: mapEventHandler
  onMaptypeidChanged?: mapEventHandler
  onMousemove?: mapEventHandler
  onMouseover?: mapEventHandler
  onMouseout?: mapEventHandler
  onProjectionChanged?: mapEventHandler
  onResize?: mapEventHandler
  onRightclick?: mapEventHandler
  onTilesloaded?: mapEventHandler
  onTiltChanged?: mapEventHandler
  onZoomChanged?: mapEventHandler
}

type markerEventHandler = (props?: IMarkerProps, marker?: google.maps.Marker, event?) => any

export interface IMarkerProps extends Partial<google.maps.MarkerOptions> {
  mapCenter?: google.maps.LatLng | google.maps.LatLngLiteral

  onClick?: markerEventHandler
  onMouseover?: markerEventHandler
}

export class Map extends React.Component<IMapProps, any> {

}

export class Marker extends React.Component<IMarkerProps, any> {

}

export class Polygon extends React.Component<any, any> {

}

export class Polyline extends React.Component<any, any> {

}

export class Circle extends React.Component<any, any> {

}

export interface IInfoWindowProps extends Partial<google.maps.InfoWindowOptions> {
  google: typeof google
  map: google.maps.Map
  marker: google.maps.Marker

  mapCenter?: google.maps.LatLng | google.maps.LatLngLiteral
  visible?: boolean

}

export class InfoWindow extends React.Component<IInfoWindowProps, any> {

}
