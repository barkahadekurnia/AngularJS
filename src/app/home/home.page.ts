import { Component } from '@angular/core';
import { Person } from '../interface/person';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  person:Person={name:'',email:''}
  themeName:string='';
  public personName:string="";
  public personEmail:string="";

  constructor(private storage:StorageService) {

  }

  setStorage()
  {
    let person:Person = { name:this.personName , email:this.personEmail}
    this.storage.create("person",JSON.stringify(person));
    this.storage.create("theme","dark");
  }
  async getStorage()
  {
    await this.storage.read("theme").then((data:any) => {
      if (data.value)
        this.themeName=data.value;
      else
        this.themeName="";
    } )

    await this.storage.read("person").then((data:any) => { 
      if (data.value)
      {
        let p=JSON.parse(data.value);
        this.person=p;
      }
      else
      {
        this.person=(data);
      }
    } )
  }
  
  async updateStorage()
  {
    let person:Person = { name:this.personName , email:this.personEmail}
    await this.storage.update("person",JSON.stringify(person));
    await this.storage.update("theme","light");
  }
  async deleteFromStorage()
  {
    await this.storage.delete("theme");
  }
  async clearStorage()
  {
    await this.storage.clear();
  }


}