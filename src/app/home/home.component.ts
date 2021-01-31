import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup;
  hide = true;


  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
    })
  }
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  async onSubmit() {
    if(this.email.value=="bhavya.jain850@gmail.com"&&this.password.value=="qwertyuiop")
    {
      this.router.navigate(['/employees'])
    }else{
      alert("Enter valid username or password")
    }

  }

}
