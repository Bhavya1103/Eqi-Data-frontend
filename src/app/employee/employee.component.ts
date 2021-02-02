import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  data: ResponseEmployee;
  message: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  public employee:Employee;

  constructor(private _route: ActivatedRoute, private router:Router,private appService:AppService) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('employeeId');
    console.log(this._route.snapshot);
    
    this.appService.getEmployee({id:id}).subscribe((data:Response)=>{
      console.log(data); 
      this.employee = {
          id:data.data.id,
          name:data.data.employee_name,
          age:data.data.employee_age,
          salary:data.data.employee_salary,
          profileimage: data.data.profile_image
        }
         
      });
    
  }

}
