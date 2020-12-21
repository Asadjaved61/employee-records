import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Employee from '../models/employee.model';

const employeeUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  onGet = (): Observable<any> => {
    return this.http.get(employeeUrl);
  };

  getEmployee = (id: string): Employee => {
    let localEmployees: string | null = localStorage.getItem('employees');
    const employees = localEmployees ? [...JSON.parse(localEmployees)] : null;

    return employees?.find((employee) => employee.id === parseInt(id));
  };

  updateEmployee = (employee: Employee): boolean => {
    let localEmployees: string | null = localStorage.getItem('employees');
    const employees = localEmployees ? [...JSON.parse(localEmployees)] : null;

    const index = employees?.findIndex((emp) => emp.id === employee.id);

    if (employees && index !== undefined) {
      employees[index] = employee;
      localStorage.setItem('employees', JSON.stringify(employees));

      return true;
    }

    return false;
  };
}
