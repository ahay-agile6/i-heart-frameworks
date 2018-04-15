import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-dotnet-core',
  templateUrl: './dotnet-core.component.html',
  styleUrls: ['./dotnet-core.component.scss']
})
export class DotnetCoreComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.setTheme();
  }

  setTheme() {
    this.themeService.setTheme('dotnet-core');
  }

}
