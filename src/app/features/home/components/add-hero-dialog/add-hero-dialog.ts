import { UpperCasePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { InputUppercaseDirective } from "@src/app/shared/directives/input-uppercase.directive";

@Component({
  selector: "app-add-hero-dialog",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputUppercaseDirective,
    UpperCasePipe,
    DialogContainer,
  ],
  templateUrl: "./add-hero-dialog.html",
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `,
  ],
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
