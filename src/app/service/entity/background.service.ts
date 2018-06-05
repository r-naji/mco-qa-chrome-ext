import { Injectable } from '@angular/core';
import { ChromeService } from 'src/app/service/chrome/chrome.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor(private chromeService: ChromeService) { }

  
}
