import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddDoggoComponent } from './add-doggo/add-doggo.component';
import { MainDoggoComponent } from './main-doggo/main-doggo.component';
import { MyDoggosComponent } from './my-doggos/my-doggos.component';

export const APP_ROUTES: Routes = [
  {
    path: 'doggos',
    component: MainDoggoComponent,
  },
  {
    path: 'my',
    component: MyDoggosComponent,
  },
  {
    path: 'my/add',
    component: AddDoggoComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '', redirectTo: '/doggos', pathMatch: 'full' },
];
