import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACR_CONFIG } from "../../app/app.acr.config";
import { Http, Headers } from "@angular/http";
//https://yanxiaodi.gitbooks.io/ionic2-guide/content/resources/third-party-libs.html

// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
// https://github.com/WeslleyDeSouza/SecureAngularLogin
//https://www.npmjs.com/package/crypto-js
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import request from 'request';
import { readFileSync} from 'fs';
import { FileOpener } from '@ionic-native/file-opener';
import { Buffer } from 'buffer';


import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*
  Generated class for the AcrProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcrProvider {
  private access_key = ACR_CONFIG.accessKey;
  private access_secret = ACR_CONFIG.accessSecret;
  private access_host = ACR_CONFIG.host;

  constructor(public http: HttpClient,
              public _http:Http,
              public _request: Request,

              private fileOpener: FileOpener,
              private transfer: FileTransfer,
              private file: File,
  ) {
    console.log('Hello AcrProvider Provider');
  }

  private defaultOption = {
    host: this.access_host,
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type:'audio',
    secure: true,
    access_key: this.access_key,
    access_secret: this.access_secret
  };
  identify(filePath) {
    function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
      return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
    }

    function sign(signString, accessSecret) {
      return crypto.createHmac('sha1', accessSecret)
        .update(new Buffer(signString, 'utf-8'))
        .digest().toString('base64');
    }

    let bitmap = readFileSync(filePath);
    let data = new Buffer(bitmap);

    let current_data = new Date();
    let timestamp = current_data.getTime()/1000;

    let stringToSign = buildStringToSign('POST',
      this.defaultOption.endpoint,
      this.defaultOption.access_key,
      this.defaultOption.data_type,
      this.defaultOption.signature_version,
      timestamp);
    let signature = sign(stringToSign, this.defaultOption.access_secret);

    let formData = {
      sample: data,
      access_key:this.defaultOption.access_key,
      data_type:this.defaultOption.data_type,
      signature_version:this.defaultOption.signature_version,
      signature:signature,
      sample_bytes:data.length,
      timestamp:timestamp,
    };
    request.post({
      url: "http://"+this.defaultOption.host + this.defaultOption.endpoint,
      method: 'POST',
      formData: formData
    }, function (err,res,body) {
      if(err){
        console.log(err);
        return null;
      }
      if(body){
        console.log(body);
        return body.json();
      }
    });
  }
}
