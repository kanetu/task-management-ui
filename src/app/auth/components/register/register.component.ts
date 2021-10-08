import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  registerForm = this.formBuilder.group({
    name: [""],
    email: [""],
    password: [""]
  })

  ngOnInit(): void {
  }


  handleRegister(): void {
    console.log(this.registerForm.value)
  }
}
