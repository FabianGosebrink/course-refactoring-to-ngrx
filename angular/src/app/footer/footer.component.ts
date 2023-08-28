import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrls: ['./footer.component.css'],
  imports: [NgIf],
})
export class FooterComponent {
  backendUrl = environment.server;
}
