import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';


// Déclaration d'une class comme étant un service avec le décorateur @Injectable()
@Injectable({
  // dit à Angular d'enregistrer ce service à la racine de l'application.
  //ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
  providedIn: 'root',
})
//un service n'a pas de méthode  ngOnInit(), car les services ne sont pas instanciés de la même manière que les components

export class FaceSnapsService {
  //Injectez HttpClient dans FaceSnapsService en y créant un constructor, comme pour les components
  constructor(private http: HttpClient){}
  // Récupération du model faceSnap et initialisation des attributs du tableau faceSnap
  //faceSnaps: FaceSnap[] = [];
// Récupération tous les faceSnap
  // getAllFaceSnaps(): FaceSnap[] {
  //   return this.faceSnaps;
  // }
// Retournée l'obsersable
getAllFaceSnaps(): Observable<FaceSnap[]> {
  return this.http.get<FaceSnap[]>("http://localhost:3000/facesnaps");
}
// On recherche un facesnap par son id ans le tableau faceSnaps avec la fonction  find() sinon, on  throw  une erreur.
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    // const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    // if (!faceSnap) {
    //     throw new Error('FaceSnap not found!');
    // } else {
    //     return faceSnap;
    // }
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
  }

//   snapFaceSnapById(faceSnapId: number, snapType: string): void {
//     const faceSnap = this.getFaceSnapById(faceSnapId);
//     snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
// }

//Afin de limiter les possibilités à des options sémantiques, on peut remplacer le type  string  par un literal type .
  snapFaceSnapById(faceSnapId: number, snapType: "snap" | "unsnap") : Observable<FaceSnap> {
    // const faceSnap = this.getFaceSnapById(faceSnapId);
    // snapType === "snap" ? faceSnap.snaps++ : faceSnap.snaps--;
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === "snap" ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
    )
  }
  // Ajout d'un nouveau faceSnap

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    
    return this.getAllFaceSnaps().pipe(
      map(faceSnaps => [...faceSnaps].sort((a,b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate : new Date(),
        id : previousFacesnap.id + 1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>(
        "http://localhost:3000/facesnaps", newFacesnap
      ))
    );
  }
}
