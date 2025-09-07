import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],  // Forms आणि material modules standalone component मध्ये Import केलेले असतील
  bootstrap: [],             // standalone component असल्यास इथे काहीही नको
})
export class AppModule {}