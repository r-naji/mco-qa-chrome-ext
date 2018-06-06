import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jira-issue',
  templateUrl: './jira-issue.component.html',
  styleUrls: ['./jira-issue.component.css']
})
export class JiraIssueComponent implements OnInit {

  private isScreenshotChecked:boolean=true;
  private isLogChecked:boolean=true;

  constructor() { }

  ngOnInit() {
  }

}
