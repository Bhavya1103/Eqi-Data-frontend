import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

export interface Employee {
  id:number;
  name: string;
  age: number;
  salary: number;
  profileimage: string;
}
export interface ResponseEmployee {
  id:number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  profile_image: string;
}
export interface Response {
  status:number;
  data: ResponseEmployee[];
  message: string;
}



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public employees:Employee[]=[]

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.getEmployees().subscribe((data:Response)=>{
      for(let i=0;i<data.data.length;i++){
        this.employees.push({
          id:data.data[i].id,
          name:data.data[i].employee_name,
          age:data.data[i].employee_age,
          salary:data.data[i].employee_salary,
          profileimage:data.data[i].profile_image
        })
      }
      })
      console.log(this.employees)
  }
}
