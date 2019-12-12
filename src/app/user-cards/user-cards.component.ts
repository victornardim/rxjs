import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { dataByPeriod } from '../shared/data-every-second.operator';
import { map } from 'rxjs/operators';
import { UsersService } from '../shared/user.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  users: any[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.compactUsersInfo()
      .subscribe(user => this.users.push(user));
  }

  public compactUsersInfo(): Observable<any> {
    return this.usersService.getUsers()
      .pipe(
        dataByPeriod(),
        map(user => {
          return {
            name: user.name,
            email: user.email.toLowerCase(),
            phone: user.phone
          };
        })
      );
  }
}
