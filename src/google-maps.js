import {
  default as React,
  Component,
} from "react";


import {
  withGoogleMap,
  GoogleMap,
  OverlayView,
  Polyline,
  Marker
} from "react-google-maps";

import Fetch from './Data';
import Constants from './Constants';


function getPixelPositionOffset(width, height) {
  return { x: -(width / 2), y: -(height / 2) };
}

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{ lat: 38.628001, lng: 34.717691 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <OverlayView
        position={marker.position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
        key={marker.key}
        >
          <div>
          <div style={{height:"15px",width:"15px",'borderRadius':10,backgroundColor:marker.hover||marker.active?"#034dcb":"#32abab"}}
            onMouseEnter={()=>props.toggleHover(marker.key,true)} onMouseLeave={()=>props.toggleHover(marker.key,false)}
            onClick={()=>props.toggleActive(marker.key,true)}>
          </div>
          <span
            style={{
              width: '140px',
              backgroundColor: 'black',
              color: '#fff',
              'textAlign': 'center',
              'borderRadius': '6px',
              'padding': '5px 0',
              position: 'absolute',
              'zIndex': 1,
              bottom: '100%',
              left: '50%',
              'marginLeft': '-60px',
              visibility:marker.hover||marker.active?'visible':'hidden',
            }}
            >
            <button onClick={()=>props.toggleActive(marker.key,false)} style={{backgroundColor:'transparent',color:'#e7e7e7',marginRight:'10px'}}>X</button>
              <span>
              Plaka: {marker.licencePlate}
              <br/>
              Hiz: {marker.speed}
            </span>
          </span>
        </div>
        </OverlayView>)
  )}
    <Polyline path={props.coords}/>
  </GoogleMap>
));

export default class GettingStartedExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      coords:window.google.maps.geometry.encoding.decodePath(this.props.coords),
      zoom:5,
      dataUpdateInterval: null,
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.newPositionData = this.newPositionData.bind(this);
    this.newPositionArray = this.newPositionArray.bind(this);
    this.fetchPositionArray = this.fetchPositionArray.bind(this);
  }
  componentDidMount(){
    if(this.props.channel == 'onesignal'){
      let context = this;
      window.newDataCallback = function(data){
        console.log("NEW DATA => " + data);
        if(data && data.latitude!=undefined && data.longitude!=undefined)
          context.newPositionData(data);
      }
    }else{
        let dataUpdateInterval = this.fetchPositionArray(this.props.line);
        this.setState({dataUpdateInterval:dataUpdateInterval});
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.line != this.props.line){
      var context = this;
      setTimeout(function(){
        var bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < context.state.coords.length; i++) {
          bounds.extend(context.state.coords[i]);
        }
        if(context.state.coords.length>0)
          context._mapComponent.fitBounds(bounds);
      },2000);
      let dataUpdateInterval = this.fetchPositionArray(nextProps.line);
      this.setState({coords:window.google.maps.geometry.encoding.decodePath(nextProps.coords),
                      dataUpdateInterval:dataUpdateInterval,
                      markers:[]});
    }
  }
  componentWillUnmount(){
    if(this.props.channel=='http')
      clearInterval(this.state.dataUpdateInterval);
  }
  fetchPositionArray(line){
    if(line=='' || line==undefined){
      return undefined;
    }else{
      clearInterval(this.state.dataUpdateInterval);
      let context = this;
      let dataUpdateInterval = setInterval(function(){
          Fetch('pullPositionData','POST',{minibusLine:line},function(response){
            if(response==Constants.Responses.NO_ACTIVE_MINIBUS){
              console.log("NO_ACTIVE_MINIBUS");
              context.setState({markers:[]});
            }else if (response==undefined) {
              console.log("NETWORK_ERROR");
            }else if(Array.isArray(response)){
              context.newPositionArray(response);
            }else{
              console.log("unidentified response");
            }
          });
      },Constants.PULL_POSITION_INTERVAL*1000);
      return dataUpdateInterval;
    }
  }
  newPositionArray(array){
    array = array.map(function(location,i){
      let latlng = {lat:parseFloat(location.latitude),lng:parseFloat(location.longitude)};
      location.position = new window.google.maps.LatLng(latlng);
      location.key = i;
      location.hover = false;
      location.active = false;
      location.timer = 0;
      return location;
    });
    this.setState({markers:array});
  }

  newPositionData(location){
  var array=this.state.markers;
    var count=0;
    var index=-1;

    for(var i=0;i<array.length;i++){

      if(array[i].licencePlate==location.licencePlate){
       if(array[i].position.lat()==location.latitude&&array[i].position.lng()==location.longitude){
        array[i].timer=array[i].timer+1;
        if(array[i].timer==20){
          index=i;
        }
      }else if(array[i].index<location.index){
          let latlng = {lat:parseFloat(location.latitude),lng:parseFloat(location.longitude)};
          location.position = new window.google.maps.LatLng(latlng);
          location.key = i;
          location.hover = array[i].hover;
          location.active = array[i].active;
          location.timer = 0;
          array[i]=location;
        }
      }
      //licencePlatelar eşleşmiyorsa markerların içinde yok demektir
      else{
        count++;
      }
    }
    if(count==array.length){
      location.timer=0;
      let latlng = {lat:parseFloat(location.latitude),lng:parseFloat(location.longitude)};
      location.position = new window.google.maps.LatLng(latlng);
      location.key = count;
      location.hover = false;
      location.active = false;
      array.push(location);
    }
    if(index>-1){
      if(index>0){
        array=array.slice(0,index).concat(array.slice(index+1));
      }else{
        array=array.slice(1);
      }
    }
    console.log(array);
    this.setState({markers:array});
  }
  handleMapLoad(map) {
    this._mapComponent = map;
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    //this.toggleHover(-1);
  }
  toggleHover(index,state){
    if(index>=0 && index<this.state.markers.length){
      let array = this.state.markers;
      array[index].hover = state;
      this.setState(array);
    }
  }
  toggleActive(index,state){
    let array = this.state.markers;
    if(index>=0 && index<this.state.markers.length){
      array[index].active = state;
      this.setState({markers:array});
    }
  }
  render() {
    return (
        <GettingStartedGoogleMap
          containerElement={
            <div style={{width: this.props.width, height: this.props.height,margin:'auto'}}/>
          }
          mapElement={
            <div style={{width: this.props.width, height: this.props.height}}/>
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          toggleHover={this.toggleHover.bind(this)}
          toggleActive={this.toggleActive.bind(this)}
          coords={this.state.coords}
        />
    );
  }
}
