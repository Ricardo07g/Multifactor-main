import { Component } from '@angular/core';
import { NavController , ModalController, AlertController } from '@ionic/angular';
import { Clipboard } from "@ionic-native/clipboard";
import { Toast } from '@ionic-native/toast';
import { PasswordGeneratorService } from '../services/password/password-generator.service';
import { DatabaseService } from '../services/database/database.service';
import { ModalRegisterPage } from '../modal-register/modal-register.page';
import { JsonPipe } from '@angular/common';

type struct_password = 
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
    this.getPasswords();
    this.timer();
  }

  async initModal() {
    const modal = await this.modalCtrl.create({
      component: ModalRegisterPage,
      componentProps: {
        'name': 'Register new credential'
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null)
      {
        this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

  public copy(value: string)
  {
    Toast.show("Code '"+value+"' copied!", "2000", "bottom").subscribe(
        toast => {
            Clipboard.copy(value);
        }
    );
  }

  private timer()
  {
    let epoch = Math.round(new Date().getTime() / 1000.0);
    this.countdown = (30 - (epoch % 30));

    if(epoch % 30 == 0)
    {
      if(epoch > this.epochSnapshot + 5)
      {
          this.epochSnapshot = epoch;
          this.getPasswords();
      }
    }

    setTimeout(() => {
        this.timer();
    }, 100);

  }

  public getPasswords()
  {
    this.database.getContent()
      .then((results: Array<struct_password>) => {

        this.passwords = [];

        for(let i = 0; i < results.length; i++)
        {
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

  public async remove_credential(id:any)
  { 
    let alert_credential = await this.alertCtrl.create({
      header: 'Attention!',
      subHeader: 'this operation cannot be undone.',
      message: 'Do you really want to remove this credential?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('for now, nothing to be done.');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            if(id) 
            {
              this.database.delete(id).then(result => {
                  this.getPasswords();
                  location.reload();
              }, error => {
                  alert('failed to remove credential.');
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
      this.getPasswords();
      event.target.complete();
    }, 1500); 
  } 


}


