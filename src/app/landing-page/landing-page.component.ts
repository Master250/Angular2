import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  
// on injecte les facesnaps depuis services et injecter le router pour pouvoir faire les changements programmatique et utiliser sa méthode  navigateByUrl()
  constructor(private router: Router){}

  ngOnInit(): void {
      
  }

  // Implémentation de la méthode clic onContinue
  onContinue(): void{
    this.router.navigateByUrl("facesnaps");
  }
}
