import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Empleado } from '../modelos/empleado';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private empleadosUrl = 'http://localhost:3000/empleados/';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.empleadosUrl).pipe(
      tap(_ => console.log('Lista de empleados obtenida')),
      catchError(this.handleError<Empleado[]>('getEmpleados', []))
    )
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(this.empleadosUrl + id).pipe(
      tap(_ => console.log('Fetched de empleado')),
      catchError(this.handleError<Empleado>('getEmpleado'))
    )
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosUrl, empleado).pipe(
      tap(_ => Swal.fire({
          icon: "success",
          title: "Operación realizada con Éxito",
          text: "Empleado Añadido correctamente",
          timer: 3000
        })),
      catchError((error) => {
        throw console.log(error, "Error en el servidor"),
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "No se ha podido Eliminar el Empleado",
          timer: 3000
        }
        )
      })
    );
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(this.empleadosUrl + empleado.id, empleado).pipe(
      tap(_ => Swal.fire({
          icon: "success",
          title: "Operación realizada con Éxito",
          text: "Empleado Actualizado correctamente",
          timer: 3000
        })),
      catchError((error) => {
        throw console.log(error, "Error en el servidor"),
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "No se ha podido Actualizar el Empleado",
          timer: 3000
        })
      })
    );
  }

  deleteEmpleado(id: number): Observable<Empleado> {
    return this.http.delete<any>(this.empleadosUrl + id).pipe(
      tap(_ => Swal.fire({
          icon: "success",
          title: "Operación realizada con Éxito",
          text: "Empleado Eliminado correctamente",
          timer: 3000
        })),
      catchError((error) => {
        throw console.log(error, "Error en el servidor"),
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "No se ha podido Actualizar el Empleado",
          timer: 3000
        })
      })
    );
  }

  faltanDatos() {
    return Swal.fire({
      icon: "warning",
      title: "Cuidado no se puede añadir empleado sin datos",
      text: "Complete todos campos",
      timer: 3000
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
