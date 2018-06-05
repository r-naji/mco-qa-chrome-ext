import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChromeService {

  constructor() { }

  public addChromeListener(chromeComponent, onAction, callback, additionalParam?) {
    chrome[chromeComponent][onAction].addListener(callback, ...additionalParam);
  }

  public captureVisibleTab(): Promise<string> {
    return new Promise(function(resolve, reject){
      chrome.tabs.captureVisibleTab(screenshotUrl => {
          resolve(screenshotUrl);
        }
      );
    });
  }
}
