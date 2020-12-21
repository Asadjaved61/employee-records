import { Component, OnInit } from '@angular/core';

import { EmployeeService } from 'src/app/services/employee.service';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees: Employee[] | null = null;

  ngOnInit(): void {
    if (!localStorage.getItem('employees')) {
      this.employeeService.onGet().subscribe((data: any) => {
        this.employees = data.map(
          (employee: Employee): Employee => this.mapDataToEmployee(employee)
        );
        localStorage.setItem('employees', JSON.stringify(this.employees));
      });
    }

    let localEmployees: string | null = localStorage.getItem('employees');
    this.employees = localEmployees ? JSON.parse(localEmployees) : null;
  }

  mapDataToEmployee = (employee: Employee): Employee => {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
    };
  };
}
