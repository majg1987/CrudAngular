import { Component } from '@angular/core';
import { Empleado } from 'src/app/modelos/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService){}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => this.empleados = empleados);
  }

  delete(empleado: Empleado): void {
    this.empleadoService.deleteEmpleado(empleado.id).subscribe(
      ()=> this.getEmpleados()
    );
  }

  add(nombre: string, dni: string, fechaNacimiento: string): void {

    const id = this.empleados[this.empleados.length - 1].id + 1;
    nombre = nombre.trim();
    dni = dni.trim(),
    fechaNacimiento = fechaNacimiento.trim()

    if (!nombre || !dni || !fechaNacimiento) {
      this.empleadoService.faltanDatos();
      return;
    } else {
      this.empleadoService.addEmpleado({id, nombre, dni, fechaNacimiento} as Empleado )
        .subscribe(()=> this.getEmpleados());
    }
  }
}
