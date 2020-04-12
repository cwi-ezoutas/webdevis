import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Parse} from './app.parse';
import { NgForm, FormsModule } from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//https://github.com/SebastianM/angular-google-maps
import { AgmCoreModule } from '@agm/core';
//environment variables
import { environment } from '../environments/environment';



import {OrderBy} from './_helpers/parseOrderBy'
import {TruncatePipe} from './_helpers/truncate.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandmarkComponent } from './landmark/landmark.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdmineditComponent } from './adminedit/adminedit.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandmarkComponent,
    AdminloginComponent,
    AdminlistComponent,
    AdmineditComponent,
    OrderBy,
    TruncatePipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })


  ],
  providers: [
      Parse,
    NgForm,
    OrderBy
    /*{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  parse;

  constructor(parse: Parse){
    this.parse = parse.init();
    this.parse.initialize('webdevis','myJavKey');
    this.parse.serverURL='http://localhost:1337/parse';


    /*const Landmark = this.parse.Object.extend("dubailandmarks");

    console.log('test');
    const query = new this.parse.Query(Landmark);
    query.equalTo("title", "Burj Khalifa");
    const results = query.find();

    for (let i = 0; i < results.length; i++) {
      let object = results[i];
      console.log(object.id + ' - ' + object.get('title'));
    }*/


    //let cUse = new this.parse

  }

}

