import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export interface Employee {
  Id:number;
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
  // displayedColumns: string[] = ['Id', 'name', 'age', 'salary' , 'profileimage'];
  // dataSource=new MatTableDataSource()
  // isRateLimitReached=false
  // isLoadingResults=false
  // employees:Employee[]=[]

  // constructor(private http:HttpClient) { }

  ngOnInit(): void {
  //   this.http.get('http://dummy.restapiexample.com/api/v1/employees').subscribe((data:Response)=>{
  //   this.isLoadingResults=true
  //   for(let i=0;i<data.data.length;i++){
  //     this.employees.push({
  //       Id:data.data[i].id,
  //       name:data.data[i].employee_name,
  //       age:data.data[i].employee_age,
  //       salary:data.data[i].employee_salary,
  //       profileimage:data.data[i].profile_image
  //     })
  //   }
  //   })
  //   console.log(this.dataSource)
  //   this.isLoadingResults=false
  //   this.dataSource.data=this.employees
  //   this.dataSource.data=this.dataSource.data
   }
  displayedColumns: string[] = ['id', 'name', 'salary', 'age'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: ResponseEmployee[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.data.length;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}



/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<Response> {
    const href = 'http://dummy.restapiexample.com/api/v1/employees';
    const requestUrl =
        `${href}`;

    return this._httpClient.get<Response>(requestUrl);
  }

}
