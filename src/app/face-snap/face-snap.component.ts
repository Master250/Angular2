import { Component, Input, OnInit} from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { NgIf, NgStyle, NgClass, DatePipe, UpperCasePipe, TitleCasePipe, AsyncPipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, DatePipe, UpperCasePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})

export class FaceSnapComponent implements OnInit {
  // injection des inputs depuis les models
  @Input() faceSnap!:FaceSnap;
  //faceSnap$! : Observable<FaceSnap>
 
  buttonText!: string;
  // on injecte les facesnaps depuis services et injecter le router pour pouvoir faire les changements programmatique et utiliser sa méthode  navigateByUrl()
  constructor(private faceSnapsService: FaceSnapsService,
    private router: Router,
    private route: ActivatedRoute){}

    //On va maintenant initialiser les quatre propriétés dans la méthode  ngOnInit() et l'affichées
  ngOnInit() {
    // Création du button "Oh Snap et unSnap"
      this.buttonText = "Oh Snap!";
      //récupérer l'id d'un facesnaps et convertir avec Ajouter le  +  au début de l'expression permet de cast (changer le type d'une variable) une string  de nombres en  number. Par exemple
      const faceSnapId = +this.route.snapshot.params['id'];
      //initialiser le facenaps
      //this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
  // Implémentation de la méthode ajouter un snap ou unsnap
  onAddSnap(faceSnapId: number){
    if (this.buttonText === "Oh Snap!"){
      this.faceSnapsService.snapFaceSnapById(faceSnapId, "snap").pipe(
        tap(() => this.buttonText = "Oops, unSnap!"));
    } else {
      this.faceSnapsService.snapFaceSnapById(faceSnapId, "unsnap").pipe(
        tap(() => this.buttonText = "Oh Snap!"));
    }
    
  }
  // implémentation de la méthode de l'aperçue d'une facesnap
  onViewFaceSnap(){
    // Fonction pour récupérer l'id du facesnap qu'on veut acceder
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

}


  