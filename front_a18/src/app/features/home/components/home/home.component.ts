import { Component } from '@angular/core';

import { RouterLink} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatButtonModule,
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ...materialModules,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
