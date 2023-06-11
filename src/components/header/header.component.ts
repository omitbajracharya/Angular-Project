import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CartService } from 'src/shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() searching = new EventEmitter<string>();
  @ViewChild('searchIcon') searchIcon!: ElementRef;
  @Input() username:string='';
  public isHidingSearchBox: boolean = false;
  public isHidingCart:boolean = false;
  public countInCart: number = 0;
  private searchSubscription?: Subscription;
  private readonly searchSubject = new Subject<string>();
  public showLogout:boolean=true;
  public isLogoutBtnShow:boolean=false;
  public selectedValue:string=this.username;

  constructor(private _cartService: CartService, private route: Router) {
    this._cartService.count.subscribe((count: number) => {
      this.countInCart = count;
    })

    if(['/sign-in' ,'/login'].includes(this.route.url)) {
      this.showLogout = false;
    }

    if (['/home/cart','/home/detail-page','/home/payment','/sign-in' ,'/login'].includes(this.route.url)) 
      this.isHidingSearchBox = true;
    else 
      this.isHidingSearchBox = false;
    
    if(['/sign-in','/login'].includes(this.route.url))
      this.isHidingCart=true;
    else
      this.isHidingCart=false;
  }


  /**
   * Logout from system.
   */
  public logout(){
    localStorage.removeItem("loggedIn");
    this.route.navigate(['/login']);
  }

  /**
   * Search process with debounceTime
   */
  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((results) => { this.searching.emit(results) });
  }

  /**
   * Search data along with subject to manage search process properly.
   * @param event - Search data
   */
  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
    if (searchQuery === '') {
      this.searchIcon.nativeElement.style.display = 'block';
    }
    else {
      this.searchIcon.nativeElement.style.display = 'none';
    }
  }

  /**
   * Unsubscribe the search subscription.
   */
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
