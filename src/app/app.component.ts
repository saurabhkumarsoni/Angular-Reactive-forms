import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators} from '@angular/forms'
import { RegistrationService } from './registration.service';
import { passwordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup | any;

  get userName() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(){
    this.alternateEmails.push(this.fb.control(''));
  }

  ngOnInit(){
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, {validator: passwordValidator});

    this.registrationForm.get('subscribe').valueChanges
    .subscribe((checkValue: any) =>{
      const email = this.registrationForm.get('email');
      if(checkValue){
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })

  }

  constructor(private fb: FormBuilder, private service: RegistrationService){}



  loadAPI() {
    this.registrationForm.patchValue ({
      username: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560066'
      }
    })
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.service.register(this.registrationForm.value).subscribe(
      response => console.log('success', response),
      error => console.log('error', error)

    )
  }
}
