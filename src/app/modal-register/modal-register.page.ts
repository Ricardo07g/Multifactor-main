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
    let verifica_hash = this.passwordGenerator.getOTP(this.secret);
    if(this.title && this.secret && verifica_hash !== false ) {
        this.database.insert(this.title, this.secret).then(async result => {
            const closeModal: string = "Modal Closed";
            await this.modalCtr.dismiss(closeModal);
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            location.reload();
        }, error => {
            alert('erro ao salvar credenciais');
        });
    }else{
      alert('hash invalida.');
      const alerta = await this.alertCtrl.create({
        header: 'Atenção!',
        subHeader: 'hash invalida',
        message: 'Não conseguimos gerar um OTP atravéz deste segredo',
        buttons: ['OK']
      });
      await alerta.present();
    }
  }

  public async textareaMaxLengthValidation() {
    this.secret = this.secret.replace(/ /g, ""); 
    if ((this.secret.length * 4) > 160)
    {
      const alerta = await this.alertCtrl.create({
        header: 'Atenção!',
        subHeader: 'tamanho máximo excedido',
        message: 'o segredo não pode ultrapassar 160 bits.',
        buttons: ['OK']
      });
      await alerta.present();
    }
  }
  
}
