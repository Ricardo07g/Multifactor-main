import { NavController, NavParams } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as jsSHA from "jssha";

@Injectable()
export class PasswordGeneratorService {

  public navCtrl: any;
  public navParams: any;

  constructor()
  {
    this.navCtrl = NavController;
    this.navParams = NavParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad passsword-generator');
  }

  private dec2hex(value: number)
  { 
    return (value < 15.5 ? "0" : "") + Math.round(value).toString(16);
  }

  private hex2dec(value: string)
  {
      return parseInt(value, 16);
  }

  private leftpad(value: string, length: number, pad: string)
  {
    if(length + 1 >= value.length)
    {
        value = Array(length + 1 - value.length).join(pad) + value;
    }
    return value;
  }

  private base32tohex(base32: string)
  {
    let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";

    for(let i = 0; i < base32.length; i++)
    {
        let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += this.leftpad(val.toString(2), 5, '0');
    }

    for(let i = 0; i + 4 <= bits.length; i+=4)
    {
        let chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16) ;
    }
    return hex;
  }

  public getOTP(secret: string)
  {
    try {
        let epoch = Math.round(new Date().getTime() / 1000.0);
        let time = this.leftpad(this.dec2hex(Math.floor(epoch / 30)), 16, "0");
        let hmacObj = new jsSHA(time, "HEX");
        let hmac = hmacObj.getHMAC(this.base32tohex(secret), "HEX", "SHA-1", "HEX");
        let offset = this.hex2dec(hmac.substring(hmac.length - 1));
        var otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + "";
        otp = (otp).substr(otp.length - 6, 6);

    } catch (error) {      
         alert('erro_OTP: '+error);
         return false;
         //throw error;
    }
    return otp;
  }

}
