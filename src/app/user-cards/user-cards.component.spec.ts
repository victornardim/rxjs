import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardsComponent } from './user-cards.component';
import { getTestScheduler } from 'jasmine-marbles';
import { UsersService } from '../shared/user.service';
import { sourcePersons, expectedPersons } from './user-cards.mock.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersComponent', () => {
  let component: UserCardsComponent;
  let fixture: ComponentFixture<UserCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardsComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the compacted info of all users', () => {
    const scheduler = getTestScheduler();

    const usersService = TestBed.get(UsersService);
    spyOn(usersService, 'getUsers').and.callFake(() => {
      return scheduler.createColdObservable('(a)', sourcePersons);
    });

    component.ngOnInit();

    scheduler.run(helpers => {
      fixture.detectChanges();

      helpers
        .expectObservable(component.compactUsersInfo())
        .toBe('1s a 999ms b 999ms (c)', expectedPersons);
    });

    expect(component.users.length).toEqual(3);
  });
});
