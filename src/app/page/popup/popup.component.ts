import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChromeService } from 'src/app/service/chrome/chrome.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  public imageUrl:string;
  public httpLogs:any;

  public isScreenshotChecked:boolean=true;
  public isLogChecked:boolean=true;
  public hideScreenshot:boolean=true;
  public hideLogs:boolean=true;

  constructor(
    private ref: ChangeDetectorRef,
    private chromeService: ChromeService
  ) { }

  ngOnInit() { }

  public getHttpLogs() {
    chrome.runtime.sendMessage({type: "HTTP_LOG_REQUEST"}, (response) => {
      this.httpLogs = response;
      this.ref.detectChanges();
    });
  }

  public captureTabScreenshot() {
    this.chromeService.captureVisibleTab().then((imgUrl)=> {
      this.imageUrl = imgUrl;
      this.ref.detectChanges();
    });
  }

  public submit() {
    if(this.isLogChecked) {
      this.getHttpLogs();
      this.hideLogs = false;
    }
    else {
      this.hideLogs = true;
    }

    if(this.isScreenshotChecked) {
      this.captureTabScreenshot();
      this.hideScreenshot = false;
    }
    else {
      this.hideScreenshot = true;
    }
  }
}
