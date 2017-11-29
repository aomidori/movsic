import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the LocalstorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalstorageProvider {

  constructor(
              private storage:Storage
  ) {}

  setUser(userId){
    this.storage.set('user',userId).then(()=>{
      console.log('success')
    })
  }

  getUser(){
    this.storage.get('user').then( userId => {
      console.log('success get');
      return userId;
    }).catch(err =>{
      return null
    })
  }

  removeUser(){
    this.storage.remove('user').then(() =>{
      console.log('key clear')
    })
  }

  clearStorage(){
    this.storage.clear()
  }
}
