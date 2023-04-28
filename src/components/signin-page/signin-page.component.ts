import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {
  public flipkart!: FormGroup;
  
  constructor(private router:Router) { }

  /**
   * Initialize signup data
   */
  ngOnInit(): void {
    this.flipkart = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  //Getter to access firstname,lastname,email,password
  public get firstName(){ return this.flipkart.get('firstName'); }
  public get lastName(){ return this.flipkart.get('lastName'); }
  public get email(){ return this.flipkart.get('email'); }
  public get password(){ return this.flipkart.get('password'); }

  /**
   * Check if it is already register in our data in localstorage
   * If not registered, register new user to localstorage. 
   */
  public registerUser():void {
   let userdata: Record<string, string> = {};
    Object.keys(this.flipkart.controls).forEach(key => {
      userdata[key] = this.flipkart.controls[key].value;
    });
    const emailFromLocalStorage = localStorage.getItem(userdata['email']);
    if (emailFromLocalStorage){
      if(userdata['email']===JSON.parse(emailFromLocalStorage).email)
        alert("Already register..Thank you");
      }
    else
    {
      localStorage.setItem(userdata['email'], JSON.stringify(userdata));
      alert("Thank you for registration...");
      this.router.navigate(['/login']);
    }
  }

}
