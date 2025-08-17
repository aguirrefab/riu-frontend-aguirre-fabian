import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Hero } from "@shared/models/hero.model";
import { HeroContextService } from "./../../../../core/services/hero-context/hero-context.service";

@Component({
  selector: "app-add-hero-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: "./add-hero-dialog.html",
  styleUrls: ["./add-hero-dialog.scss"],
})
export class AddHeroDialog {
  private readonly dialogRef = inject(MatDialogRef<AddHeroDialog>);
  private readonly fb = inject(FormBuilder);
  private readonly heroContext = inject(HeroContextService);

  heroForm: FormGroup;
  heroName = signal<string>("");

  constructor() {
    this.heroForm = this.fb.group({
      name: ["", [Validators.required]],
      alias: ["", [Validators.required]],
      powerLevel: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.heroForm.get("name")?.valueChanges.subscribe((value: string) => {
      this.heroName.set(value || "");
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      this.heroContext.addHero(this.heroForm.value);
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
