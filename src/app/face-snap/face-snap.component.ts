import { Component, Input, OnInit} from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { NgIf, NgStyle, NgClass, DatePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, DatePipe, UpperCasePipe, TitleCasePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})

export class FaceSnapComponent implements OnInit{
  // injection des inputs depuis les models
  @Input() faceSnap!: FaceSnap;

  buttonText!: string;
  // on injecte les facesnaps depuis services et injecter le router pour pouvoir faire les changements programmatique et utiliser sa méthode  navigateByUrl()
  constructor(private faceSnapsService: FaceSnapsService,
    private router: Router){}

    //On va maintenant initialiser les quatre propriétés dans la méthode  ngOnInit() et l'affichées
  ngOnInit() {
    // Création du button "Oh Snap et unSnap"
      this.buttonText = "Oh Snap!"
  }
  // Implémentation de la méthode ajouter un snap ou unsnap
  onAddSnap(){
    if (this.buttonText === "Oh Snap!"){
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, "snap");
      this.buttonText = "Oops, unSnap!"
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, "unsnap");
      this.buttonText = "Oh Snap!";
    }
    
  }
  // implémentation de la méthode de l'aperçue d'une facesnap
  onViewFaceSnap(){
    // Fonction pour récupérer l'id du facesnap qu'on veut acceder
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

}
