
import { Component, OnInit, Input } from '@angular/core';
import {Task,item} from "../../../models/task-model";
import {User} from "../../../models/user.model";
import {UtilsService} from "../../../services/utils.service";
import {FirebaseService} from "../../../services/firebase.service";
import {FormControl, Validators,FormGroup, FormsModule} from "@angular/forms";
import {ItemReorderEventDetail} from "@ionic/core";



@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task;
  user = {} as User;

  form = new FormGroup
  ({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
  }

  ngOnInit() {
    this.user = this.utilsSvc.getElementFromLocalStorage('user');

    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
  }

  //crear o actualizar
  submit(){
    if(this.form.valid){
      if(this.task){
        this.updateTask();
      }else{
        this.createTask();
      }
    }
  }

  //Crear tarea
  createTask(){
    let path = `users/${this.user.uid}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.addToSubcollection(path, 'tasks', this.form.value).then(res =>{

      this.utilsSvc.dismissModal({success: true});
      this.utilsSvc.presentToast({
        message: 'Tarea creada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.utilsSvc.dismissLoading()
    }, error =>{
      this.utilsSvc.presentToast({
        message: 'Error',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.utilsSvc.dismissLoading()
    })
  }

  //
updateTask(){
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(res =>{

      this.utilsSvc.dismissModal({success: true});
      this.utilsSvc.presentToast({
        message: 'Tarea actualizada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.utilsSvc.dismissLoading()
    }, error =>{
      this.utilsSvc.presentToast({
        message: 'Error',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.utilsSvc.dismissLoading()
    })
  }
  getPercentage() {
    return this.utilsSvc.getPercentage(this.form.value as Task);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }

  removeItem(index: number){
    this.form.value.items.splice(index, 1);
    this.form.controls.items.updateValueAndValidity();
  }

  createItem(){
    this.utilsSvc.presentAlert({
      header: 'Nueva actividad',
      backdropDismiss: false,
      inputs:[
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...'
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {
            let Item: item = {name: res.name, completed: false};
            this.form.value.items.push(Item);
            this.form.controls.items.updateValueAndValidity();
          }
        }
      ]
    })
  }

}
