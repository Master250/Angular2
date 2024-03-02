import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';

// Déclaration d'une class comme étant un service avec le décorateur @Injectable()
@Injectable({
  // dit à Angular d'enregistrer ce service à la racine de l'application.
  //ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
  providedIn: 'root',
})
//un service n'a pas de méthode  ngOnInit(), car les services ne sont pas instanciés de la même manière que les components

export class FaceSnapsService {

  // Récupération du model faceSnap et initialisation des attributs du tableau faceSnap
  faceSnaps: FaceSnap[] = [
    {
      id: 1,
      title: 'Archibald',
      description: 'Mon meilleur ami depuis tout petit !',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 200,
      location: 'Lomé',
    },
    {
      id: 2,
      title: 'Three Rock Mountain',
      description: 'Un endroit magnifique pour les randonnées.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
      createdDate: new Date(),
      snaps: 0,
      location: 'Montagne',
    },
    {
      id: 3,
      title: 'Un bon repas',
      description: "Mmmh que c'est bon !",
      imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
      createdDate: new Date(),
      snaps: 115,
    },
  ];
// Récupération tous les faceSnap
  getAllFaceSnaps(): FaceSnap[] {
    return this.faceSnaps;
  }
// On recherche un facesnap par son id ans le tableau faceSnaps avec la fonction  find() sinon, on  throw  une erreur.
  getFaceSnapById(faceSnapId: number): FaceSnap {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!faceSnap) {
        throw new Error('FaceSnap not found!');
    } else {
        return faceSnap;
    }
  }

//   snapFaceSnapById(faceSnapId: number, snapType: string): void {
//     const faceSnap = this.getFaceSnapById(faceSnapId);
//     snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
// }

//Afin de limiter les possibilités à des options sémantiques, on peut remplacer le type  string  par un literal type .
  snapFaceSnapById(faceSnapId: number, snapType: "snap" | "unsnap") : void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === "snap" ? faceSnap.snaps++ : faceSnap.snaps--;
  } 
}
