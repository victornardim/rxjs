import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { PaintBrushComponent } from './paint-brush/paint-brush.component';
import { EndingCreditsComponent } from './ending-credits/ending-credits.component';
import { WhackAMoleComponent } from './whack-a-mole/whack-a-mole.component';

const appRoutes: Routes = [
  { path: 'user-cards', component: UserCardsComponent },
  { path: 'paint-brush', component: PaintBrushComponent },
  { path: 'ending-credits', component: EndingCreditsComponent },
  { path: 'whack-a-mole', component: WhackAMoleComponent }];

@NgModule({
  declarations: [
    AppComponent,
    UserCardsComponent,
    PaintBrushComponent,
    EndingCreditsComponent,
    WhackAMoleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
