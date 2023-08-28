import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { concatMap } from 'rxjs';
import { Doggo } from '../models/doggo';
import { DoggosService } from '../services/doggos.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-add-doggo',
  standalone: true,
  templateUrl: './add-doggo.component.html',
  styleUrls: ['./add-doggo.component.css'],
  imports: [RouterLink, NgIf, ReactiveFormsModule],
})
export class AddDoggoComponent {
  private readonly fb = inject(FormBuilder);

  private readonly uploadService = inject(UploadService);

  private readonly doggoService = inject(DoggosService);

  formGroup = this.fb.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    comment: ['', Validators.required],
  });

  lastAddedDoggo: Doggo;

  filename = '';

  private formData: FormData;

  setFormData(files) {
    if (files[0]) {
      const formData = new FormData();
      formData.append(files[0].name, files[0]);
      this.filename = files[0].name;
      this.formData = formData;
    }
  }

  addDoggo() {
    if (this.formGroup.valid) {
      const { name, comment, breed } = this.formGroup.value;

      this.uploadService
        .upload(this.formData)
        .pipe(
          concatMap(({ path }) =>
            this.doggoService.addDoggo(name, breed, comment, path)
          )
        )
        .subscribe((doggo) => {
          this.lastAddedDoggo = doggo;
        });
    }
  }
}
