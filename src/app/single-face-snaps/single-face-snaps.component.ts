import { Component} from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { DatePipe, NgClass, NgFor, NgIf, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-single-face-snaps',
  standalone: true,
  imports: [NgClass,NgFor,NgIf,NgStyle, DatePipe,TitleCasePipe,UpperCasePipe, RouterLink],
  templateUrl: './single-face-snaps.component.html',
  styleUrl: './single-face-snaps.component.scss'
})

export class SingleFaceSnapsComponent {
  faceSnap!: FaceSnap;

  buttonText!: string;

  // injection de ActivatedRoute afin de récuperer les informations de la route
  constructor(private faceSnapsService: FaceSnapsService, 
    private route: ActivatedRoute){}

  ngOnInit() {
      
      this.buttonText = "Oh Snap!"
      // récupérer le paramètre id via le snapshot de la route (un snapshot est un aperçu instantané d'une valeur qui change au cours du temps via son objet  snapshot.params)
      //récupérer l'id d'un facesnaps et convertir avec Ajouter le  +  au début de l'expression permet de cast (changer le type d'une variable) une string  de nombres en  number. Par exemple
      const snapId = +this.route.snapshot.params['id'];
      //initialiser le facenaps
      this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
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

  
}
