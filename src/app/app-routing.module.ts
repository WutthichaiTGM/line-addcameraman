import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameramanComponent } from './cameraman/cameraman.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cameraman', component: CameramanComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
