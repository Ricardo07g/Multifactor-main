import { NavController, NavParams } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable()

export class DatabaseService
{
    public navCtrl: any;
    public navParams: any;
    public storage: SQLite;

    constructor()
    {   
        this.navCtrl = NavController;
        this.navParams = NavParams;
        this.storage = new SQLite();

        this.storage.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {

            db.executeSql("CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, secret TEXT)", [])
            .then(() => console.log('executeSql: Executed SQL'))
            .catch(e => console.log('executeSql: '+e));

        }).catch(e => alert('db: '+e));            
        
    }

    public insert(title: string, secret: string)
    {   
        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
    
                db.executeSql("INSERT INTO passwords (title, secret) VALUES (?, ?)", [title, secret]).then((data) => {
                    resolve({
                        "title": title,
                        "secret": secret
                    });
                }, (error) => {
                    reject(error);
                    alert('insert: Error');
                });
    
            }).catch(e => alert('db: '+e));
        });
    }

    public delete(id: string,)
    {
        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                db.executeSql("DELETE FROM passwords WHERE id = ?", [id]).then((data) => {
                    resolve({
                        "id": id
                    });
                }, (error) => {
                    reject(error);
                    alert('delete: Error');
                });
            }).catch(e => alert('db: '+e));
        });
    }

    public retrieve()
    {   
        return new Promise((resolve, reject) => {
            
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT id, title, secret FROM passwords", []).then((data) => {
                    if(data.rows && data.rows.length > 0) {
                        let passwords = [];
                        for(let i = 0; i < data.rows.length; i++) {
                            passwords.push({
                                "id": data.rows.item(i).id,
                                "title": data.rows.item(i).title,
                                "secret": data.rows.item(i).secret,
                            });
                        }
                        resolve(passwords);
                    }
                }, (error) => {
                    reject(error);
                    alert('retrieve: Error');
                });
    
            }).catch(e => alert('db: '+e));
        });
    }
    
}
