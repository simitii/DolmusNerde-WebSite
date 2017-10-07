import React, { Component } from 'react';

import loader from './images/loader.gif';
import './css/iletisim.css';

import Fetch from './Data';

import Constants from './Constants';


class Iletisim extends Component {
  constructor(props){
    super(props);
    this.state={
      "konu":"",
      "mesaj":"",
      "iletisim":"",
      "sending":false,
      "result":'',
    }
    this.resultDIV = null;
  }
  handleChange(area){
    let context = this;
    return function(event){
      switch (area) {
        case "konu":
            context.setState({konu:event.target.value,result:''});
          break;
        case "mesaj":
            context.setState({mesaj:event.target.value,result:''});
          break;
        case "iletisim":
            context.setState({iletisim:event.target.value,result:''});
          break;
      }
    };
  }
  handleSubmit(){
    let json = {
      subject: this.state.konu,
      text: this.state.mesaj,
      contact: this.state.iletisim
    };
    this.setState({sending:true,konu:'',mesaj:'',iletisim:''});
    let context = this;
    Fetch('tellUs','POST',json,function(response){
      console.log(response);
        if(response==Constants.Responses.SUCCESS){
          context.setState({result:"BASARILI!",sending:false});
        }else if(response==Constants.Responses.INVALID_INPUT){
          context.setState({result:"Girdilerde hata.Lutfen tekrar deneyiniz..",sending:false});
        }else if(response==Constants.Responses.MAIL_SERVER_ERROR){
          context.setState({result: "Beklenmedik hata..",sending:false});
        }
    });
  }
  render(){
    if(this.state.sending){
      return(
        <div className="contact-container">
        <img src={loader} height="25%" width="auto" style={{position:'relative',top:"35%"}}/>
      </div>
      );
    }else{
      return (
          <div className="contact-container">
            <p>E-mail: karaeskiyazilim@gmail.com</p>
            <p style={{fontSize:20,color:'red',zIndex:99}}>{this.state.result}</p>
            <form>
              <div>
              <label style={{width:"100%"}}>
                Konu:
                <br/>
                <textarea className="konu" value={this.state.konu} onChange={this.handleChange.call(this,"konu")} />
              </label>
              </div>
              <div>
              <label style={{width:"100%"}}>
                Mesaj:
                <br/>
                <textarea className="mesaj" value={this.state.mesaj} onChange={this.handleChange.call(this,"mesaj")} />
              </label>
              </div>
              <div>
              <label style={{width:"100%"}}>
                Iletisim (Tel/E-mail):
                <br/>
                <textarea className="iletisim" value={this.state.iletisim} onChange={this.handleChange.call(this,"iletisim")} />
              </label>
            </div>
            </form>
            <button className="btn btn-default submit-button" onClick={this.handleSubmit.bind(this)}>Gonder</button>
          </div>
      );
    }
  }
}
export default Iletisim;
