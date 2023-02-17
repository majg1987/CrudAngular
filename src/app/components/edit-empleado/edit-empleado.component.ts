import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Empleado } from 'src/app/modelos/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})
export class EditEmpleadoComponent implements OnInit {
  @Input() empleado?: Empleado;

  constructor(private location: Location, private empleadoService: EmpleadoService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.empleadoService.getEmpleado(id)
     .subscribe(empleado => this.empleado = empleado);
  }

  editEmpleado(): void {
    if (this.empleado) {
      this.empleadoService.updateEmpleado(this.empleado)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }

}
