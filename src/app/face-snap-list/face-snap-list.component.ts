import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnap } from '../models/face-snap-model';
import { AsyncPipe, DatePipe, NgFor} from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Observable} from 'rxjs';

    //Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
    @Component({
      selector: 'app-face-snap-list',
      standalone: true,
      imports: [FaceSnapComponent, NgFor, AsyncPipe, DatePipe],
      templateUrl: './face-snap-list.component.html',
      styleUrl: './face-snap-list.component.scss'
    })
    export class FaceSnapListComponent implements OnInit{
      // Déclaration facesnaps et destroy
      //faceSnaps!: FaceSnap[];
      //import de facesnaps sous forme d'observable
      faceSnaps$!: Observable<FaceSnap[]>
  //constructor(private destroy$!: Subject<boolean>){};

  // on injecte les facesnaps depuis services 

  constructor(private faceSnapsService: FaceSnapsService ) {}

  //On va maintenant initialiser les quatre propriétés dans la méthode  ngOnInit() et l'affichées
  
  ngOnInit(): void {
    // Initialisations
    //this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
    // this.destroy$ = new Subject<boolean>();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
    // interval(1000).pipe(
    //   tap(console.log),
    //   takeUntil(this.destroy$),
    // ).subscribe();
  }
  // destruction de l'observable
//   ngOnDestroy(): void {
//       this.destroy$.next(true);
//   }
  
}
