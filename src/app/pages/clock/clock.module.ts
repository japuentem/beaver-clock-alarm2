import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ClockPageRoutingModule } from './clock-routing.module';
import { ClockPage } from './clock.page';

@NgModule({
  providers: [Storage],
  imports: [CommonModule, FormsModule, IonicModule, ClockPageRoutingModule],
  declarations: [ClockPage],
})
export class ClockPageModule {}
