import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DoggoListComponent } from '../doggo-list/doggo-list.component';
import { DoggoRateComponent } from '../doggo-rate/doggo-rate.component';
import { Doggo } from '../models/doggo';
import { DoggosService } from '../services/doggos.service';

@Component({
  selector: 'app-main-doggo',
  templateUrl: './main-doggo.component.html',
  standalone: true,
  styleUrls: ['./main-doggo.component.css'],
  imports: [DoggoListComponent, DoggoRateComponent, NgIf],
})
export class MainDoggoComponent implements OnInit {
  private readonly doggoService = inject(DoggosService);

  doggos: Doggo[] = [];

  selectedDoggo: Doggo;

  private selectedDoggoIndex = 0;

  ngOnInit(): void {
    this.doggoService.getMyDoggos().subscribe((doggos) => {
      this.doggos = doggos;
      this.selectedDoggo = this.doggos[this.selectedDoggoIndex] ?? null;
    });
  }

  rateDoggo(rating: number) {
    this.doggoService
      .rate(this.selectedDoggo.id, rating)
      .subscribe((ratedDoggo) => {
        this.selectedDoggo = ratedDoggo;
      });
  }

  skipDoggo() {
    this.selectedDoggoIndex = this.getNextIndex(this.selectedDoggoIndex);
    this.selectedDoggo = this.doggos[this.selectedDoggoIndex];
  }

  selectDoggo(id: string) {
    this.selectedDoggo = this.doggos.find((x) => x.id === id);
  }

  private getNextIndex(currentIndex: number): number {
    if (currentIndex === this.doggos.length) {
      this.selectedDoggoIndex = 0;
    }

    return currentIndex++;
  }
}
