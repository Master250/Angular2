import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FaceSnap } from '../models/face-snap-model';
import { AsyncPipe, DatePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,UpperCasePipe,DatePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss',
})
export class NewFaceSnapComponent implements OnInit {
  //Déclaration et création d'un observable
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;

  //Injection de formbuilder reactif
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // construction de formulaire
    this.snapForm = this.formBuilder.group({
      title: [""],
      description: [""],
      imageUrl: [""],
      location: [""],
    });
    //liaison de formulaire en faceSnaps
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        //Récupération tous les attributs du formulaire
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id:0
      }))
    )
  }

  onSubmitForm() {
    console.log(this.snapForm.value);
  }
}
