import { Injectable } from '@angular/core';
import { ChromeService } from 'src/app/service/chrome/chrome.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoggerService {

  private isLoggingStarted:boolean;
  private logStorage:any = {};
  private networkFilters = {urls: ["*://github.com/*"]};
  private messageType = "HTTP_LOG_REQUEST";

  constructor(private chromeService: ChromeService) { }

  public initMessageListener() {
    this.chromeService.addChromeListener('runtime', 'onMessage', (request, sender, sendResponse) => {
      if(request.type == this.messageType) {
        sendResponse(this.logStorage);
      }
    });
  }

  public initHttpLogger() {
    this.chromeService.addChromeListener('webRequest', 'onBeforeRequest', (details:chrome.webRequest.WebRequestBodyDetails) => {
      const { tabId, requestId } = details;
      if (this.logStorage[tabId]) {
        this.logStorage[tabId].requests[requestId] = {
          requestId: requestId,
          url: details.url,
          startTime: details.timeStamp,
          status: 'pending',
          method: details.method,
          parameters : details.requestBody
        };
        console.log(this.logStorage[tabId].requests[requestId]);
      }
    },
    this.networkFilters);

    this.chromeService.addChromeListener('webRequest', 'onCompleted', (details: chrome.webRequest.WebResponseCacheDetails) => {
      const { tabId, requestId } = details;
      if (this.logStorage[tabId] && this.logStorage[tabId].requests[requestId]) {
        let request = this.logStorage[tabId].requests[requestId];
        this.logStorage[tabId].requests[requestId] = {...request, statusCode: details.statusCode, endTime: details.timeStamp, requestDuration: details.timeStamp - request.startTime, status: 'complete'};

        console.log(this.logStorage[tabId].requests[requestId]);
      }
    }, this.networkFilters);

    this.chromeService.addChromeListener('webRequest', 'onErrorOccurred', (details: chrome.webRequest.WebResponseCacheDetails)=> {
      const { tabId, requestId } = details;
      if (this.logStorage[tabId] && this.logStorage[tabId].requests[requestId]) {
        let request = this.logStorage[tabId].requests[requestId];
        this.logStorage[tabId].requests[requestId] = {...request, statusCode: details.statusCode, endTime: details.timeStamp, status: 'error'};

        console.log(this.logStorage[tabId].requests[requestId]);
      }
    }, this.networkFilters);

    this.chromeService.addChromeListener('tabs', 'onActivated', (tab) => {
      console.log("registering webhandler for tab " + tab.tabId);
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!this.logStorage.hasOwnProperty(tabId)) {
          this.logStorage[tabId] = {
            id: tabId,
            requests: {},
            registerTime: new Date().getTime()
          };
        }
    });
    
    this.chromeService.addChromeListener('tabs', 'onRemoved', (tab) => {
      console.log("unregistering webhandler for tab " + tab);
      this.logStorage[tab] = null;
    });
  }
}
