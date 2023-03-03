import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../../environments/environment'; // Importar environment
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.page.html',
  styleUrls: ['./clock.page.scss'],
})
export class ClockPage {
  backgroundColor: string = 'white';

  today: Date = new Date();
  currentTime: Date = new Date();

  alarmDate: string = '';
  alarmTime: string = '';

  private myDb: any;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private storage: Storage
  ) {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    this.init();
    this.showData();
  }

  async presentColorAlert() {
    firebase.initializeApp(environment.firebaseConfig); // Inicializar Firebase
    // Crear una referencia a la colección 'tasks' en Firebase 11
    const db = firebase.firestore();
    const tasksRef = db.collection('colors');

    const alert = await this.alertController.create({
      header: 'Select a color',
      inputs: [
        {
          name: 'color',
          type: 'radio',
          label: 'Azul primario',
          value: 'primary',
          checked: this.backgroundColor === 'primary',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Azul claro',
          value: 'secondary',
          checked: this.backgroundColor === 'secondary',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Azul',
          value: 'tertiary',
          checked: this.backgroundColor === 'tertiary',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Verde',
          value: 'success',
          checked: this.backgroundColor === 'success',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Amarillo',
          value: 'warning',
          checked: this.backgroundColor === 'warning',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Rojo',
          value: 'danger',
          checked: this.backgroundColor === 'danger',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Blanco',
          value: 'light',
          checked: this.backgroundColor === 'light',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Gris',
          value: 'medium',
          checked: this.backgroundColor === 'medium',
        },
        {
          name: 'color',
          type: 'radio',
          label: 'Negro',
          value: 'dark',
          checked: this.backgroundColor === 'dark',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (event) => {
            this.backgroundColor = event;
            console.log(this.backgroundColor);
            // Agregar el color al almacenamiento local
            this.storage.set('color', this.backgroundColor);
            console.log('Color de reloj guardado');
          },
          /* ste codigo era para guardar datos en firebase
          handler: (event) => {
            tasksRef
              .add({
                id: '1',
                color: this.backgroundColor,
              })
              .then(() => {
                console.log('Color de reloj guardado');
              });
          },
          */
        },
      ],
    });

    await alert.present();
  }

  async presentAlarmAlert() {
    firebase.initializeApp(environment.firebaseConfig); // Inicializar Firebase
    // Crear una referencia a la colección 'tasks' en Firebase 11
    const db = firebase.firestore();
    const tasksRef = db.collection('alarms');

    const alert = await this.alertController.create({
      header: 'Crear alarma',
      inputs: [
        {
          name: 'date',
          type: 'date',
          label: 'Fecha',
          value: this.alarmDate,
          min: new Date().toISOString(),
        },
        {
          name: 'time',
          type: 'time',
          label: 'Hora',
          value: '09:00',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.alarmDate = data.date;
            this.alarmTime = data.time;
            // guardar la fecha y hora de la alarma en Firebase
            this.storage.set('alarms', this.alarmDate + ' ' + this.alarmTime);

            /* Este codigo era para guardar datos en firebase
            tasksRef
              .add({
                id: '1',
                date: this.alarmDate,
                time: this.alarmTime,
              })
              .then(() => {
                console.log('Alarma guardada');
              });
*/
          },
        },
      ],
    });
    await alert.present();
  }

  async init() {
    const storage = await this.storage.create();
    this.myDb = storage;
    console.log(storage);
  }

  async getData(key: string) {
    if (!this.myDb) {
      await this.init();
    }
    return await this.myDb.get(key);
  }

  async setData(key: string, value: any) {
    if (!this.myDb) {
      await this.init();
    }
    return await this.myDb.set(key, value);
  }

  async showData() {
    await this.storage.create();
    this.backgroundColor = await this.storage.get('color');
    console.log(this.backgroundColor);
  }
}
