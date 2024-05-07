import { Component, OnInit} from '@angular/core';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { delay, map, mergeMap, take, tap, concatMap, exhaustMap, switchMap, takeUntil, subscribeOn } from 'rxjs/operators';
import { AsyncPipe, DatePipe } from '@angular/common';
import { interval, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewFaceSnapComponent } from './new-face-snap/new-face-snap.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FaceSnapListComponent,
    HeaderComponent,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    NewFaceSnapComponent,
    DatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // on déclare le type de  interval$  , on le déclare comme  Observable  qui émet des  number  en passant  number  entre chevrons <>  .

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
  //private destroy$!: Subject<boolean>;
  ngOnInit() {
    // initialisation de l'interval ,filter et la destruction
    //this.destroy$ = new Subject<boolean>();
     interval(1000).pipe(
      
      take(3),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(color => this.getTrainObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`)),
      //takeUntil(this.destroy$),
    ).subscribe();

    //Simplification d'une vraie implémentation

  //   const displayedStream$ = buttonClicks$.pipe(
  //     switchMap(chosenStream => getCameraStream$(chosenStream))
  // )
  }
  // ngOnDestroy(): void {
  //     this.destroy$.next(true);
  // }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }
  }
  
