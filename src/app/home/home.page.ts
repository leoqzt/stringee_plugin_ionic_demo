import { Component, OnInit } from '@angular/core';
import { QzStringee } from 'qzstringee';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{
  userId!: string;
  reciverid!: string;
  token!: string;
  constructor(private http: HttpClient, private toastController: ToastController) {}

  
  ngOnInit() {
  }

  async getToken(){
    const apiUrl ='https://bmapi.ceesolutionbox.com/company/public/stringeeToken';
      const requestBody = {
        "userId":this.userId,
    };
      try {
        const response = await this.http.post(apiUrl, requestBody).toPromise();
       
        let key_response = JSON.stringify(response);
        let parsedResponse = JSON.parse(key_response);
        console.log('API Response:', parsedResponse.token);
        
        this.token = parsedResponse.token;
         const toast = await this.toastController.create({
            message: 'API Response Token: ' + parsedResponse.token,
            duration: 2000
        });
        toast.present();
      }catch (error) {
        // Handle errors
        console.error('Error:', error);
      }

  }


  
async getPermisiion(){
      let result =  await QzStringee.getpermission();
      console.log("result", result);
}

    
  async getConfig(){
      let result =  await QzStringee.getConfig({ value: this.token });
      console.log("result", result);
  }

async outgoingCall(){
  let data = {
      CALLER_USER_ID : this.userId,
      RECEIVER_USER_ID : this.reciverid,
      }

  let result =  await QzStringee.outgoingCall({ value: JSON.stringify(data)});
  console.log("result", result);
       
}
async answerCall(){
  let result =  await QzStringee.answerCall();
  console.log("result", result);

}

async endCall(){
  let result =  await QzStringee.endCall();
  console.log("result", result);
}
}
