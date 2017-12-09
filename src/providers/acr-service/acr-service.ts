import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { ACR_CONFIG } from "../../app/app.acr.config";
import * as crypto from 'crypto';
import { File } from '@ionic-native/file';
import request from 'request';
import * as fs from 'fs';
import {hasDiagnostics} from "@ionic/app-scripts/dist/logger/logger-diagnostics";
import {literalArr} from "@angular/compiler/src/output/output_ast";
import {convertDeepLinkConfigEntriesToString} from "@ionic/app-scripts/dist/deep-linking/util";

/*
  Generated class for the AcrServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcrServiceProvider {
  private access_key = ACR_CONFIG.accessKey;
  private access_secret = ACR_CONFIG.accessSecret;
  private access_host = ACR_CONFIG.host;
  private defaultOption = {
    host: this.access_host,
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type:'audio',
    secure: true,
    access_key: this.access_key,
    access_secret: this.access_secret
  };
  constructor(private _http:Http,
              private file: File) {
    console.log('Hello AcrServiceProvider Provider');
  }
  identifySong(filePath: string,name:string){
    // let data = this.file.readAsArrayBuffer(filePath,name).
    //       then(arr => {return arr},
    //           err => console.log(err,'this is err'));
    // console.log(data,'data is read');
    // console.log(data[0],'data is read');
    //object
    // let bitmap = fs.readFileSync(filePath);
    let bitmap = this.file.readAsArrayBuffer(filePath,name).then(
      bit => {
        return bit
      }
    ).catch(err => console.log(err));
    console.log(bitmap[0],'bitmap');
    // let data = new Buffer(bitmap);
    // console.log(data,'data');

    let current_data = new Date();
    let timestamp = current_data.getTime()/1000;

    let stringToSign = ['POST',
      this.defaultOption.endpoint,
      this.defaultOption.access_key,
      this.defaultOption.data_type,
      this.defaultOption.signature_version,
      timestamp].join('\n');
    let signature = crypto.createHmac('sha1', this.defaultOption.access_secret)
      .update(new Buffer(stringToSign, 'utf-8'))
      .digest().toString('base64');
    console.log(signature,'crypto');
    // let formData = {
    //   sample: data,
    //   access_key:this.defaultOption.access_key,
    //   data_type:this.defaultOption.data_type,
    //   signature_version:this.defaultOption.signature_version,
    //   signature:signature,
    //   sample_bytes:data.length,
    //   timestamp:timestamp,
    // };
    // let headers = new Headers();
    // headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    // return this._http.post("http://"+this.defaultOption.host + this.defaultOption.endpoint,
    //   formData,{headers:headers}).map(res => res.json())
  }

}
