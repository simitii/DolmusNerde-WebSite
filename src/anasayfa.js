import React, { Component } from 'react';

import AndroidLogo from './images/Android-app-logo.png';
import IOSLogo from './images/app-store.png'
import yakinda from './images/yakinda.png'

import './css/anasayfa.css';

class Anasayfa extends Component {
  render(){
    console.log(this.props.isMobile);
    if(this.props.isMobile){
      return (
        <div className="container">
          <div className="announcements">
            <h4 className="announce-text">Uyumlu cihazlar icin web sitemizden dolmus takibi aktif...</h4>
            <h4 className="announce-text">IOS uygulamamiz yakinda..!</h4>
            <h4 className="announce-text">Android uygulamamiza asagidaki linkten ulasabilirsiniz!</h4>
          </div>
          <div className="row">
              <div className="col-xs-12">
              <a href="https://play.google.com/store/apps/details?id=com.dolmuskullaniciapp">
              <img src={AndroidLogo} style={{height:'95px',width:'auto'}}/>
            </a>
              </div>
              <div className="col-xs-12">
                <a>
                  <img src={IOSLogo} style={{height:'70px',width:'auto'}}/>
                <img src={yakinda} height="70px"
                  style={{position:'absolute',top:'-5px',left:'45%'}}/>
                </a>
              </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="container">
          <div className="announcements">
            <p className="announce-text lead">Uyumlu cihazlar icin web sitemizden dolmus takibi aktif...</p>
            <p className="announce-text lead">IOS uygulamamiz yakinda..!</p>
            <p className="announce-text lead">Android uygulamamiza asagidaki linkten ulasabilirsiniz!</p>
          </div>
          <div className="row">
              <span >
              <a href="https://play.google.com/store/apps/details?id=com.dolmuskullaniciapp">
              <img src={AndroidLogo} style={{height:'95px',width:'auto',position:'relative',left:'50px'}}/>
            </a>
            </span>
              <span >
                <a>
                  <img src={IOSLogo} style={{height:'70px',width:'auto',position:'relative',left:'50px'}}/>
                <img src={yakinda} height="70px"
                  style={{position:'relative',right:'100px'}}/>
                </a>
              </span>
          </div>
        </div>
      );
    }
  }
}
export default Anasayfa;
