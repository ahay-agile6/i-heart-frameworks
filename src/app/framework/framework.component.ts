import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  framework: string;
  frameworkDisplayName: string;
  frameworkEnv;
  apiBase: string;
  sub: any;
  messages: Array<Message> = [];

  constructor(
    private route: ActivatedRoute, 
    private themeService: ThemeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.messages = [];
      this.framework = params['framework'];
      this.frameworkEnv = environment.frameworks.find(f => f.name == this.framework)
      this.apiBase = this.frameworkEnv.apiBase;
      this.frameworkDisplayName = this.frameworkEnv.displayName;
      this.setTheme(this.framework);
      this.messageService.getMessages(this.apiBase) 
      .subscribe((messages: Array<Message>) => messages.forEach(message => this.messages.push(message)));;
    });    
  }  

  setTheme(framework) {
    this.themeService.setTheme(framework);
  }

}
