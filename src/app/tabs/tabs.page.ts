import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../service/apigateway.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private api: ApigatewayService) {}

  ngOnInit() {}
}
