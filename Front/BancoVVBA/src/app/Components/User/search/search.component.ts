import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/Modelos/user';
import { UserService } from 'src/app/Services/User/user.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userList$:Observable<User[]>;
  private searchTerms= new Subject();
  constructor(private userService:UserService) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.userList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }
  
}
