import { Component, OnInit } from '@angular/core';
import { ChromeService } from 'src/app/service/chrome/chrome.service';
import { BackgroundService } from 'src/app/service/entity/background.service';
import { HttpLoggerService } from 'src/app/service/http-logger.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor(
    private chromeService: ChromeService,
    private backgroundService: BackgroundService,
    private httpLoggerService: HttpLoggerService
  ) { }

  ngOnInit() {
    this.httpLoggerService.initHttpLogger();

    this.httpLoggerService.initMessageListener();

    // chrome.runtime.onInstalled.addListener(function() {      
    //   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //     let rule = {
    //       conditions: [
    //         new chrome.declarativeContent.PageStateMatcher({
    //           pageUrl: { hostSuffix: 'pinterest.com' }
    //         })
    //       ],
    //       actions: [ new chrome.declarativeContent.ShowPageAction() ]
    //     };

    //     chrome.declarativeContent.onPageChanged.addRules([rule]);
    //   });
    // });
  }

  

}
