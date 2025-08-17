import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { InputUppercaseDirective } from "@src/app/shared/directives/input-uppercase.directive";

@Component({
  selector: "app-hero-dialog-edit",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DialogContainer,
    InputUppercaseDirective,
  ],
  templateUrl: "./hero-dialog-edit.html",
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .hero-edit-form tr {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
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
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
