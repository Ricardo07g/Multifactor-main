import { Component, OnInit ,Input} from '@angular/core';
import { ModalController , NavController, AlertController} from '@ionic/angular';
import { DatabaseService } from '../services/database/database.service';
import { PasswordGeneratorService } from '../services/password/password-generator.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.page.html',
  styleUrls: ['./modal-register.page.scss'],
})

export class ModalRegisterPage implements OnInit {

  @Input() name: string;

  public navCtrl: any;
  public title: string;
  public secret: string;
  public database: DatabaseService;
  private passwordGenerator: PasswordGeneratorService;

  constructor(private modalCtr: ModalController,private alertCtrl: AlertController)
  {
    this.title = "";
    this.secret = "";
    this.database = new DatabaseService();
    this.passwordGenerator = new PasswordGeneratorService();
    this.navCtrl = NavController;
  }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  public async save() {

    this.secret = this.secret.replace(/ /g, "");
    let check_hash = this.passwordGenerator.getOTP(this.secret);

    if(this.title && this.secret && check_hash !== false )
    {
        this.database.insert(this.title, this.secret).then(async result => {
            const closeModal: string = "Modal Closed";
            await this.modalCtr.dismiss(closeModal);
            location.reload();
        }, error => {
            alert('error saving credentials');
        });

    }else{

      const alert_error = await this.alertCtrl.create({
        header: 'Attention!',
        subHeader: 'invalid hash',
        message: 'Cannot generate an OTP via this secret',
        buttons: ['OK']
      });
      
      await alert_error.present();
    }
  }

  public async textareaMaxLengthValidation() {
    this.secret = this.secret.replace(/ /g, ""); 
    if ((this.secret.length * 4) > 320)
    {
      const alerta = await this.alertCtrl.create({
        header: 'Attention!',
        subHeader: 'maximum size exceeded',
        message: 'the secret cannot exceed 320 bits.',
        buttons: ['OK']
      });
      await alerta.present();
    }
  }
  
}
