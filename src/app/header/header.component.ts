import { Component } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Response} from "@angular/http";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorageService,
              private authservice: AuthService) {}

  saveData() {
    this.dataStorage.saveRecipes().subscribe(
        (response: Response) => {
          console.log(response);
        }
    );
  }
  fetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.authservice.logout();
  }


}
