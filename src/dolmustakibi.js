import React, { Component } from 'react';

import {FaSearch} from 'react-icons/lib/fa';


import pushNotificationCheck from './checkbrowser.js';

import loader from './images/loader.gif';

import MAP from './google-maps.js';

import './css/dolmustakibi.css';

import Coords from './Coords';
import Constants from './Constants';

String.prototype.convertTRchars = function(){
    return this.toUpperCase()
            .replace(/Ö/g, 'O')
            .replace(/Ç/g, 'C')
            .replace(/Ş/g, 'S')
            .replace(/İ/g, 'I')
            .replace(/Ğ/g, 'G')
            .replace(/Ü/g, 'U');
};
let hatlar = Constants.HATLAR;


class DolmusTakibi extends Component {

  constructor(props){
    super(props);
    this.state={
      notSupported:false,
      loading:true,
      channel:'',
      path:[],
      hat:0,
      baslangic: 0,
      line:''
    }
  }
  componentDidMount(){
      /*
      if(pushNotificationCheck()){
        //Use push notifications
        this.setState({notSupported:false,loading:false,channel:'onesignal'});
      }else{
        //Use default http requests
        this.setState({notSupported:false,loading:false,channel:'http'});
      }*/
      //USE HTTP DEFAULT TEMPRARY
      this.setState({notSupported:false,loading:false,channel:'http'});
  }
  componentWillUnmount(){
    if(this.state.channel=='onesignal'){
      window.newDataCallback = null;
      window.unsubscribeFromAllLines();
    }
  }
  handleSelections(){
    var choice = "35" + (2*parseInt(this.state.hat) + parseInt(this.state.baslangic));
    console.log(choice);
    if(this.state.channel=='onesignal')
      window.subscribeToLine(choice);

    this.setState({path:Coords[choice],line:choice});
  }
  handlePathChoice(event){
    this.setState({hat:event.target.value});
  }
  handleStartPointChoice(event){
    this.setState({baslangic:event.target.value});
  }

  render(){
    if(this.state.loading){
      return (
        <div className="container-dolmus-takibi">
          <img src={loader} height="100px" width="auto" style={{position:'relative',top:"35%"}}/>
        </div>
      );
    }else if(this.state.notSupported){
      return (
        <div className="container-dolmus-takibi">
          <p>Maalesef kullandiginiz tarayici suan icin desteklenmemektedir.</p>
          <p>Eger asagidaki tarayicilardan birini kullaniyorsaniz lutfen guncelleyin...</p>
        </div>
      );
    }else{
      if(this.props.isMobile){
        return (
            <div className="container">
              <div className="mobile-choice-box">
                  <div className="col-xs-5">
                  <label className="choice-box-label">
                    HAT<br/>
                    <select onChange={this.handlePathChoice.bind(this)} style={{width:'100%'}}>
                      {
                        hatlar.map(function(hat,index){
                          hat = hat.convertTRchars();
                          return <option value={index}>{hat}</option>;
                        })
                      }
                    </select>
                  </label>
                  </div>
                  <div className="col-xs-4">
                  <label className="choice-box-label">
                    BASLANGIC<br/>
                    <select onChange={this.handleStartPointChoice.bind(this)} style={{width:'100%'}}>
                      {
                        hatlar[this.state.hat].split("-").map(function(point,index){
                          point = point.convertTRchars();
                          return <option value={index}>{point}</option>
                        })
                      }
                    </select>
                  </label>
                  </div>
                  <div className="col-xs-3">
                  <button className="btn btn-default mobile-search-button"
                    onClick={this.handleSelections.bind(this)}>
                    <FaSearch size={20} color="#32abab"/>
                  </button>
                  </div>
              </div>

              <div style={{
                margin:'auto',
                width: "100%",
                height:this.props.height*0.59,
                backgroundColor:'#32abab',
                paddingLeft:this.props.width*0.01,
                paddingRight:this.props.width*0.01,
                paddingTop:this.props.height*0.01,
                paddingBottom:this.props.height*0.01,
                boxShadow: '2px 1.5px 1px #888888',
                borderRadius: '15px'}}>
                <MAP height={this.props.height*0.57} width={this.props.width<900?this.props.width*0.77:this.props.width*0.70}
                      channel={this.state.channel} coords={this.state.path} line={this.state.line}/>
              </div>
            </div>
        );
      }else{
        return(
          <div className="container-dolmus-takibi">
              <div className="row" style={{margin:'auto'}}>
                <div className="col-md-3 col-sm-3 hat-sec-box">
                  <div>
                    <div>
                    <label className="choice-box-label">
                      HAT
                      <br/>
                      <select onChange={this.handlePathChoice.bind(this)}>
                        {
                          hatlar.map(function(hat,index){
                            hat = hat.convertTRchars();
                            return <option value={index}>{hat}</option>;
                          })
                        }
                      </select>
                    </label>
                    </div>
                    <br/>
                    <div>
                    <label className="choice-box-label">
                      BASLANGIC
                      <br/>
                      <select onChange={this.handleStartPointChoice.bind(this)}>
                        {
                          hatlar[this.state.hat].split("-").map(function(point,index){
                            point = point.convertTRchars();
                            return <option value={index}>{point}</option>
                          })
                        }
                      </select>
                    </label>
                    </div>
                    <br/>
                    <button onClick={this.handleSelections.bind(this)}>Sefer Ara</button>
                  </div>
                </div>
                <div className="col-md-8 col-sm-8" style={{
                  width:this.props.width*0.52,
                  height:this.props.height*0.60,
                  backgroundColor:'#32abab',
                  paddingLeft:this.props.width*0.01,
                  paddingRight:this.props.width*0.01,
                  paddingTop:this.props.height*0.01,
                  paddingBottom:this.props.height*0.01,
                  boxShadow: '2px 1.5px 1px #888888',
                  borderRadius: '15px'}}>
                  <MAP height={this.props.height*0.58} width={this.props.width*0.50}
                        channel={this.state.channel} coords={this.state.path} line={this.state.line}/>
                </div>
              </div>
          </div>
        );
      }
    }
  }
}
export default DolmusTakibi;
