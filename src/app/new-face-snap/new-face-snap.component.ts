import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap-model';
import { AsyncPipe, DatePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

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
  //Ajout des expressions régulière(RegExp)
  urlRegex!: RegExp;

  //Injection de formbuilder reactif, de faceSnapsService et de router
  constructor(private formBuilder: FormBuilder,
    private faceSnapsService: FaceSnapsService,
    private router: Router) {}

  ngOnInit(): void {
    // construction ou initialisation de la formulaire
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      // Ajout des validators
      title: ["",[Validators.required]],
      description: ["",[Validators.required]],
      imageUrl: ["", [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [""],
    },
    {
      // Modifie le déclenchement de valueChanges afin d'éviter les erreurs dans la console
      updateOn:"blur"
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
    //Appelle de la méthode addFaceSnap lors de l'envoi du formulaire et redirection vers faceSnaps.
    this.faceSnapsService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => this.router.navigateByUrl("/facesnaps"))
    ).subscribe();
    
  }
}
