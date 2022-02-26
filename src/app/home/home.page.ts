import { Component } from '@angular/core';
import { NavController , ModalController, AlertController } from '@ionic/angular';
import { Clipboard } from "@ionic-native/clipboard";
import { Toast } from '@ionic-native/toast';
//import { CreatePage } from "../create/create";
import { PasswordGeneratorService } from '../services/password/password-generator.service';
import { DatabaseService } from '../services/database/database.service';
import { ModalRegisterPage } from '../modal-register/modal-register.page';
import { JsonPipe } from '@angular/common';

type teste = 
{
  id: number,
  title: string,
  secret:string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public passwords: Array<any>;
  public countdown: number;
  private epochSnapshot: number;
  private passwordGenerator: PasswordGeneratorService;
  public database: DatabaseService;
  public navCtrl: any;
  public modalDataResponse: any;

  public constructor(private alertCtrl: AlertController, private modalCtrl: ModalController)
  {
    this.passwords = [];
    this.epochSnapshot = 0;
    this.passwordGenerator = new PasswordGeneratorService();
    this.database = new DatabaseService();
    this.navCtrl = NavController;
  }
  

  public ionViewDidEnter()
  {
    this.retrievePasswords();
    this.ticker();
  }

  async initModal() {
    const modal = await this.modalCtrl.create({
      component: ModalRegisterPage,
      componentProps: {
        'name': 'Registrar nova Credencial'
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
    if (modalDataResponse !== null)
    {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  public copy(value: string)
  {
    Toast.show("Código copiado!", "3000", "bottom").subscribe(
        toast => {
            Clipboard.copy(value);
        }
    );
  }

  private ticker()
  {
    let epoch = Math.round(new Date().getTime() / 1000.0);
    this.countdown = (30 - (epoch % 30));
    if(epoch % 30 == 0) {
        if(epoch > this.epochSnapshot + 5) {
            this.epochSnapshot = epoch;
            this.retrievePasswords();
        }
    }
    setTimeout(() => {
        this.ticker();
    }, 100);
  }

  public retrievePasswords()
  {
    this.database.retrieve()
      .then((results: Array<teste>) => {
        this.passwords = [];
          for(let i = 0; i < results.length; i++) {
 
              this.passwords.push({
                  "id": results[i].id,
                  "title": results[i].title,
                  "password": this.passwordGenerator.getOTP(results[i].secret)
              });

          }    
      }, error => {
          console.error(error);
      });
      
  }

  public async remove_credencial(id:any)
  { 
    let alerta = await this.alertCtrl.create({
      header: 'Atenção!',
      subHeader: 'esta operação não pode ser desfeita.',
      message: 'Deseja realmente remover esta credencial?',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            console.log('por hora, nada a ser feito.');
          }
        },
        {
          text: 'Remover',
          handler: () => {
            if(id) 
            {
              this.database.delete(id).then(result => {
                  this.retrievePasswords();
              }, error => {
                  alert('falha ao remover credencial.');
              });
            }
          }
        }
    ]
    }).then(res => {
      res.present();
    }); 
  } 

  doRefresh(event) {  
    setTimeout(() => {
      this.retrievePasswords();
      event.target.complete();
    }, 1500); 
  } 


}


