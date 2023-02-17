import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpleadoComponent } from './components/edit-empleado/edit-empleado.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'empleados', component: EmpleadosComponent },
  {path: 'edit/:id', component: EditEmpleadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
