import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACR_CONFIG } from "../../app/app.acr.config";
import { Http, Headers } from "@angular/http";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

// import { crypto fs}

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
              private mediaCapture: MediaCapture
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
  recognition(filePath,options=this.defaultOption){
    let data = fs.readFileSync(filePath);

    let current_data = new Date();
    let timestamp = current_data.getTime()/1000;

    function sign(signString, accessSecret) {
      return crypto.createHmac('sha1', accessSecret)
        .update(new Buffer(signString, 'utf-8'))
        .digest().toString('base64');
    }

    function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
      return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
    }

    let stringToSign = buildStringToSign('POST',
      options.endpoint,
      options.access_key,
      options.data_type,
      options.signature_version,
      timestamp);

    let signature = sign(stringToSign, options.access_secret);

    let formData = {
      sample: data,
      access_key:options.access_key,
      data_type:options.data_type,
      signature_version:options.signature_version,
      signature:signature,
      sample_bytes:data.length,
      timestamp:timestamp,
    };
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    headers.append('Content-Type', 'application/json');
    let url = "http://"+options.host + options.endpoint;
    return this._http.post(url,formData,{headers:headers})
      .map(res => res.json())
    // this._request.post({
    //   url: "http://"+options.host + options.endpoint,
    //   method: 'POST',
    //   formData: formData
    // }, cb);
  }
  // https://ionicframework.com/docs/native/media-capture/
  recordAudio(){
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }
}
