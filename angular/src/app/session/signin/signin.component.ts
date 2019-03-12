import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginDto } from 'src/app/dto/login.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    const userLogin: LoginDto = <LoginDto>this.form.value;
    this.loginService.login(userLogin).subscribe( loginResponse => {
      console.log(loginResponse);
      this.loginService.setLoginData(loginResponse);
      this.router.navigate(['/products'])
    });
  }

}
