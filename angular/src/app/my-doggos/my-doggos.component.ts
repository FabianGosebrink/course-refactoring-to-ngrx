import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doggo } from '../models/doggo';
import { DoggosService } from '../services/doggos.service';

@Component({
  selector: 'app-my-doggos',
  standalone: true,
  templateUrl: './my-doggos.component.html',
  styleUrls: ['./my-doggos.component.css'],
  imports: [RouterLink, DatePipe, DecimalPipe, NgFor],
})
export class MyDoggosComponent implements OnInit {
  private readonly doggoService = inject(DoggosService);

  doggos: Doggo[];

  ngOnInit(): void {
    this.doggoService.getMyDoggos().subscribe((doggos) => {
      this.doggos = doggos;
    });
  }

  deleteDoggo(doggo: Doggo) {
    this.doggoService.deleteDoggo(doggo).subscribe(() => {
      this.doggos = this.doggos.filter((dog) => dog.id !== dog.id);
    });
  }
}
