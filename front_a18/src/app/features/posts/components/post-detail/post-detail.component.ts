import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

const materialModules = [
  MatButtonModule,
  MatIconModule
]

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

}
