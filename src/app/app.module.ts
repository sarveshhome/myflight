import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { MainLinksComponent } from './components/main-links/main-links.component';
import { InternationalSitesComponent } from './components/international-sites/international-sites.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        MatRippleModule, MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    SearchFlightsComponent,
    RecommendationComponent,
    MainLinksComponent,
    InternationalSitesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
