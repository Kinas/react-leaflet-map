import React, { Component } from 'react';
import { Map, TileLayer, Polygon, GeoJSON} from 'react-leaflet';

import './App.css';
import bezirke from './BezirkeBerlin.json';
//get data from data file(s)

const data= [];


for (let key of Object.keys(bezirke.features)) {
  const bezirk = bezirke.features[key];
  data.push(bezirk.geometry.coordinates[0]);
}

function getColor(d) {
    return d > 300000  ? '#800026' :
           d > 270000  ? '#BD0026' :
           d > 235000  ? '#E31A1C' :
           d > 200000  ? '#FC4E2A' :
           d > 170000  ? '#FD8D3C' :
           d > 135000  ? '#FEB24C' :
           d > 100000   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}





const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [52.520008,  13.404954];
const zoomLevel = 10;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { currentZoomLevel: zoomLevel };

    }

    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
            const updatedZoomLevel = leafletMap.getZoom();
            this.handleZoomLevelChange(updatedZoomLevel);
        });

    }

    handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

    render() {
    
        return (
            <div>
                <Map
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                   <GeoJSON data={bezirke} style={style}/>
                </Map>
            </div>
        );
    }
}

export default App;
