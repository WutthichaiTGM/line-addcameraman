import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import VConsole from 'vconsole';
import liff from '@line/liff';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  vConsole = new VConsole();

  constructor() {}

  ngOnInit(): void {
    this.main();
  }

  async getUserProfile() {
    const profile = await liff.getProfile();
    const ImageUrl = profile.pictureUrl;
    const Uid = profile.userId;
    const statusMessage = profile.statusMessage;
    const DisplayName = profile.displayName;
    const Emsil = liff.getDecodedIDToken().email;
  }

  sendMessage() {
    liff
      .getProfile()
      .then((profile) => {
        liff
          .sendMessages([
            {
              type: 'text',
              text: 'ยินดีต้อนรับนะ:' + profile.displayName,
            },
          ])
          .then(() => {
            liff.closeWindow();
          })
          .catch((error) => {
            window.alert('Error sending message: ' + error.message);
          });
      })
      .catch((error) => {
        window.alert('Error getting profile: ' + error.message);
      });
  }

  async main() {
    await liff.init({ liffId: '1655102649-oxL8EWBj' });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        this.getUserProfile();
        // this.sendMessage();
      } else {
        liff.login();
      }
    });
  }
}
