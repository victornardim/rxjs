import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingCreditsComponent } from './ending-credits.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { UsersService } from '../shared/user.service';
import { sourcePersons, expectedPersons } from './ending-credits.mock.spec';

describe('EndingCreditsComponent', () => {
  let component: EndingCreditsComponent;
  let fixture: ComponentFixture<EndingCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndingCreditsComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the name of all users', () => {
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
        .toBe('5s a 4s 999ms b 4s 999ms (c)', expectedPersons);
    });

    expect(component.users.length).toEqual(3);
  });
});
