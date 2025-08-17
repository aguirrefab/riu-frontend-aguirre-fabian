import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appUppercase]",
  standalone: true,
})
export class InputUppercaseDirective {
  constructor(private htmlElement: ElementRef<HTMLInputElement>) {
    this.htmlElement.nativeElement.style.textTransform = "uppercase";
  }
}
