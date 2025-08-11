import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { HeroContextService } from "./../../../../core/services/hero-context/hero-context.service";

@Component({
  selector: "app-hero-dialog-edit",
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
  templateUrl: "./hero-dialog-edit.html",
  styleUrls: ["./hero-dialog-edit.scss"],
})
export class HeroDialogEdit {
  private readonly dialogRef = inject(MatDialogRef<HeroDialogEdit>);
  private readonly fb = inject(FormBuilder);
  private readonly heroContext = inject(HeroContextService);
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);

  heroForm: FormGroup;

  constructor() {
    this.heroForm = this.fb.group({
      name: [this.data.hero.name, [Validators.required]],
      alias: [this.data.hero.alias, [Validators.required]],
      powerLevel: [
        this.data.hero.powerLevel,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const updatedHero: Hero = {
        ...this.data.hero,
        ...this.heroForm.value,
      };
      this.heroContext.updateHero(updatedHero);
      this.dialogRef.close(updatedHero);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
