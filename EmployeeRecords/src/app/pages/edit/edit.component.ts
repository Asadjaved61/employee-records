import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  employee: Employee | null = null;

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employee = this.employeeService.getEmployee(id);
    }
  }

  onSubmit = () => {
    if (this.employee?.name === '') {
      return;
    }
    if (this.employee) {
      if (this.employeeService.updateEmployee(this.employee)) {
        this.router.navigate(['']);
      }
    }
  };
}
