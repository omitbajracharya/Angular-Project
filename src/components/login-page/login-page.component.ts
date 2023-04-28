import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public flipkart!: FormGroup;

  constructor(private messageService: MessageService, private router: Router, private _authService: AuthService) { }

  /**
   * Initialize Reactive Form.
   */
  ngOnInit(): void {
    this.flipkart = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get email() { return this.flipkart.get('email'); }
  get password() { return this.flipkart.get('password'); }

  /**
   * Get userdata from loginpage and check it with userdata in Localstorage.
   * If successfully login, redirect to homepage..
   */
  public login() {
    let userdata: Record<string, string> = {};
    Object.keys(this.flipkart.controls).forEach(key => {
      userdata[key] = this.flipkart.controls[key].value;
    });
    let userRecordInLocalStorage: Record<string, string> = {};
    const existEmailFromLocalStorage = localStorage.getItem(userdata['email']);
    if (existEmailFromLocalStorage) {
      userRecordInLocalStorage = JSON.parse(existEmailFromLocalStorage);
      if (userRecordInLocalStorage['email'] === userdata['email'] && userRecordInLocalStorage['password'] === userdata['password']) {
        this._authService.setLoginStatus(userRecordInLocalStorage);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Login' });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800)
      }
      else {
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'Incorrect username or password...' });
      }
    }
    else{
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'Incorrect username or password...' });
    }
  }
}