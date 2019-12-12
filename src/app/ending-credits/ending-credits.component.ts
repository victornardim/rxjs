import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { dataByPeriod } from '../shared/data-every-second.operator';
import { UsersService } from '../shared/user.service';

@Component({
  selector: 'app-ending-credits',
  templateUrl: './ending-credits.component.html',
  styleUrls: ['./ending-credits.component.css']
})
export class EndingCreditsComponent implements OnInit {

  users: string[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.compactUsersInfo()
      .subscribe(user => this.users.push(user));
  }

  public compactUsersInfo(): Observable<any> {
    return this.usersService.getUsers()
      .pipe(
        dataByPeriod(5000),
        pluck('name')
      );
  }

}
