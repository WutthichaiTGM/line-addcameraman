import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import liff from '@line/liff';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Location } from '@angular/common';

interface File {
  name: string;
  url: string;
}

@Component({
  selector: 'app-cameraman',
  templateUrl: './cameraman.component.html',
  styleUrls: ['./cameraman.component.less'],
})
export class CameramanComponent implements OnInit {
  profileForm = new FormGroup({
    names: new FormControl(''),
    phoneNumber: new FormControl(''),
    images: new FormControl(''),
    sex: new FormControl(''),
    age: new FormControl(''),
  });
  // Upload File
  files: File[] = [];
  file: any;
  path: string;
  uploadPercentage$: Observable<number>;
  downloadURL: string;
  // selection
  public selection: string;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.main();
  }

  onFileUpload(files: FileList) {
    this.file = files[0];
    this.path = `Images/${files[0].name}`;
  }

  async UploadStorage() {
    const fullName = this.profileForm.get('names').value;
    const phone = this.profileForm.get('phoneNumber').value;
    const images = this.profileForm.get('images').value;
    const sex = this.profileForm.get('sex').value;
    const age = this.profileForm.get('age').value;

    const profile = await liff.getProfile();
    const DisplayName = profile.displayName;
    const uid = profile.userId;

    this.storage.upload(this.path, this.file);
    this.uploadPercentage$ = this.storage
      .upload(this.path, this.file)
      .percentageChanges();
    const ref = this.storage.ref(this.path);
    const task = this.storage.upload(this.path, this.file);

    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.downloadURL = await ref.getDownloadURL().toPromise();
          ref
            .getDownloadURL()
            .toPromise()
            .then((url) => {
              const allFile: File = { name: this.file.name, url };
              this.afs.collection('CameraMan').doc(uid).set({
                Status: 'reject',
                Name: DisplayName,
                FullName: fullName,
                Sex: sex,
                Age: age,
                Uid: uid,
                Phone: phone,
                ImageUrl: url,
                nameImage: this.file.name,
                Time: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        })
      )
      .subscribe((res) => {
        console.log(res);
        setTimeout(function request() {
          if (res.state == 'success') {
            let Status = confirm('เพิ่มข้อมูลสำเร็จ');
            if (Status == true) {
              liff.closeWindow();
            } else {
              liff.closeWindow();
            }
          } else {
            console.log('running');
          }
        }, 1000);
      });
  }

  async onSubmit() {
    const fullName = this.profileForm.get('names').value;
    const phone = this.profileForm.get('phoneNumber').value;
    const images = this.profileForm.get('images').value;
    const sex = this.profileForm.get('sex').value;
    const age = this.profileForm.get('age').value;
    console.log('fullName:', fullName);
    console.log('phone:', phone);
    console.log('images:', images);
    console.log('sex:', sex);
    console.log('age:', age);
    // console.warn(this.profileForm.value);
    // this.UploadStorage();
    // const fullName = this.profileForm.get('names').value;
    // const phone = this.profileForm.get('phoneNumber').value;
    // const images = this.profileForm.get('images').value;
    // const profile = await liff.getProfile();
    // const DisplayName = profile.displayName;
    // const uid = profile.userId;
    // this.afs.collection('CameraMan').doc(uid).set({
    //   Name: DisplayName,
    //   FullName: fullName,
    //   Uid: uid,
    //   Phone: phone,
    //   Image: images._fileNames,
    // });
  }

  async getUserProfile() {
    const profile = await liff.getProfile();
    const ImageUrl = profile.pictureUrl;
    const Uid = profile.userId;
    const statusMessage = profile.statusMessage;
    const DisplayName = profile.displayName;
    const Emsil = liff.getDecodedIDToken().email;
    // console.log('profile', profile);
  }

  async main() {
    await liff.init({ liffId: '1655102649-oxL8EWBj' });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        // this.getUserProfile();
        // this.adduser();
      } else {
        liff.login();
      }
    });
  }
}
