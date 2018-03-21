import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDD4TWmxa8aQOSzwdhQMt2vEGaKBnvOKhA'
    })
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
