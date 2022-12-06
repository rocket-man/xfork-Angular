import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    //signUpForm is the overall formGroup
    this.signupForm = new FormGroup({
      //we are creating new instances of FormControl and FormGroup here,
      //because unlike in Template driver apprach we are not declaring ngModel and ngFormgroup in the HTML
      userData: new FormGroup({
        //userData is a nested FormGroup inside another
        username: new FormControl(null, [
          Validators.required, //required() with () is not used, refereence is passed, CHECK
          this.forbiddenNames.bind(this) //JS part, 'this' down below is not pointing to same object
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    //Hooks that we subscribe to and listen to
    // this.signupForm.valueChanges.subscribe(value => console.log(value));
    this.signupForm.statusChanges.subscribe(status => console.log(status));
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Juan',
    //     email: 'juan@test.com'
    //   },
    //   gender: 'male',
    //   hobbies: []
    // });
    this.signupForm.patchValue({
      userData: {
        username: 'Juan'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    //JSON object userData
    this.signupForm.reset({
      gender: 'male'
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  } //CHECK, <FormArray> type casted explicitly, and () are used to tell that it is an array

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    // we only return an extra param nameIsForbidden:true when invalid
    return null; //null or nothing is used when the form is valid
  }


  //async validators when we need to check from backend
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          return resolve({ emailIsForbidden: true }); //a resolve object is returned
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  get controls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}
