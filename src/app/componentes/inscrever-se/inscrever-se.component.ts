import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/compartilhado/servico/auth.service';

@Component({
  selector: 'app-inscrever-se',
  templateUrl: './inscrever-se.component.html',
  styleUrls: ['./inscrever-se.component.css']
})
export class InscreverSeComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
