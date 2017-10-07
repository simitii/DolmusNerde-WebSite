import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import classNames from 'classnames';
import {FaBars,FaClose} from 'react-icons/lib/fa';

//IMAGES
import logo from './images/logo.png';


//GENERAL CSS
import './css/bootstrap.min.css';
import './css/App.css';

//PAGES
import Anasayfa from './anasayfa.js';
import DolmusTakibi from './dolmustakibi.js';
import Iletisim from './iletisim.js';


class App extends Component {
  constructor(props){
    super(props);
    let isMobile = this.isMobile(window.innerWidth);
    this.state={
      width: window.innerWidth,
      height:window.innerHeight,
      currentContent:0,
      transition:true,
      items: [],
      nav:false,
      visibleNav : false,
      isMobile: isMobile
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }
  handleAdd(newItems) {
   this.setState({items: [newItems]});
 }

 handleRemove() {
   this.setState({items: []});
 }
  componentWillMount() {
    this.updateDimensions.call(this);
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions.bind(this));
      this.handleNavigation(0,{closeNav:true});
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions(){
    var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
    height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    let isMobile = this.isMobile(width);
    if(isMobile!=this.state.isMobile){
      this.handleNavigation(this.state.currentContent,{isMobile:isMobile,width:width,height:height,closeNav:true});
    }else{
      //this.handleNavigation(this.state.currentContent,{width:width,height:height});
    }
    this.setState({width: width, height: height,isMobile:isMobile});
  }
  handleNavigation(index,args){
    args = args || {};
    let currentContent = (function(currentContent){
          switch (currentContent) {
            case 1:return(<DolmusTakibi height={args.height||this.state.height} width={args.width||this.state.width} isMobile={args.isMobile || this.state.isMobile}/>);
            case 2:break;
            case 3:return(<Iletisim isMobile={args.isMobile || this.state.isMobile}/>);
            case 0:
            default:
            return(<Anasayfa isMobile={args.isMobile||this.state.isMobile}/>);
          }
    }).call(this,index);
    this.handleRemove();
    let context = this;
    if(args.closeNav!=undefined){
      this.setState({currentContent:index,nav:!args.closeNav});
      if(args.closeNav){
        setTimeout(function(){
          context.setState({visibleNav:false});
        },400);
      }
    }else{
      this.setState({currentContent:index});
    }
    setTimeout(function(){
      context.handleAdd(currentContent);
    },500);
  }
  isMobile(width){
    return width<=1000;
  }
  render() {
    const items = this.state.items.map((item, i) => {
      return(
      <div key={item}>
        {item}
      </div>);
    });
    if(this.state.isMobile){
      return(
        <div className="App container-fluid vertical-center">
          <div className="row mobile-top-bar">
            <div className="col-xs-3">
              <button className="btn btn-default mobile-top-bar-button"
                onClick={()=>{
                  if(this.state.nav){
                    this.setState({nav:false});
                    let context = this;
                    setTimeout(function(){
                      context.setState({visibleNav:false});
                    },400);
                  }else{
                    this.setState({nav:true,visibleNav:true});
                  }
                }}>
                {this.state.nav?
                  <FaClose size={30} color="#32abab"/>
                  :
                  <FaBars size={30} color="#32abab"/>}
              </button>
            </div>
            <div className="col-xs-4 col-xs-offset-1">
            <img src={logo} style={{
              position: 'relative',
              top:'-20px',
              right:'10px',
              margin: '-10px 0 -25px 0',
              height: '120px'}}/>
            </div>
          </div>
          <div className={classNames("row","mobile-top-nav",{"mobile-top-nav-active":this.state.nav})}
            style={{visibility:this.state.visibleNav?'visible':'hidden'}}>
            <div className="col-xs-10 col-xs-offset-1">
              <button onClick={()=>this.handleNavigation(0,{closeNav:true})}
                className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==0})}>
                Anasayfa
              </button>
            </div>
            <div className="col-xs-10 col-xs-offset-1">
              <button onClick={()=>this.handleNavigation(1,{closeNav:true})}
                className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==1})}>
                DolmusTakibi
              </button>
            </div>
            <div className="col-xs-10 col-xs-offset-1">
              <button onClick={()=>this.handleNavigation(2,{closeNav:true})}
                className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==2})}>
                Hakkimizda
              </button>
            </div>
            <div className="col-xs-10 col-xs-offset-1">
              <button onClick={()=>this.handleNavigation(3,{closeNav:true})}
                className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==3})}>
                Iletisim
              </button>
            </div>
          </div>
          <div style={{position:'relative',top:this.state.visibleNav?'110px':'-60px',overflowY: 'scroll',height:this.state.visibleNav?this.state.height-300:this.state.height-130,width:"100%"}}>
            <CSSTransitionGroup
              transitionName="content"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
            {items}
            </CSSTransitionGroup>
          </div>
          <div className="App-footer">
            <p style={{'font-size':15,margin:"2px",padding:"0px"}}>Copyright © DolmusNerde.Net</p>
          </div>
        </div>
      );
    }else{
      return (
        <div className="App container-fluid vertical-center">
            <img src={logo} style={{
              position: 'relative',
              margin: '-20px 0 -25px 10px',
              height: '200px'}}/>
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-8 col-centered">
                <button onClick={()=>this.handleNavigation(0,{closeNav:false})}
                  className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==0})}>
                  Anasayfa
                </button>
              </div>
              <div className="col-xs-8 col-md-2 col-sm-2 col-centered">
                <button onClick={()=>this.handleNavigation(1,{closeNav:true})}
                  className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==1})}>
                  Dolmus Takibi
                </button>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-8 col-centered">
                <button onClick={()=>this.handleNavigation(2,{closeNav:false})}
                  className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==2})}>
                  Hakkimizda
                </button>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-8 col-centered">
                <button onClick={()=>this.handleNavigation(3,{closeNav:false})}
                  className={classNames("App-nav-buttons",{"App-nav-buttons-active":this.state.currentContent==3})}>
                  Iletisim
                </button>
              </div>
            </div>
          <div className="row" style={{overflowY: 'scroll',height:this.state.height-240 ,width:"100%",position:'relative',left:'15px',top:'8px'}}>
            <CSSTransitionGroup
              transitionName="content"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
            {items}
            </CSSTransitionGroup>
          </div>
          <div className="App-footer">
            <p style={{'font-size':15,margin:"2px",padding:"0px"}}>Copyright © DolmusNerde.Net</p>
          </div>
        </div>
      );
    }
  }
}
export default App;
