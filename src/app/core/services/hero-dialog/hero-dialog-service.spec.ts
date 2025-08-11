import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { HeroDialogDetail } from "@features/home/components/hero-dialog-detail/hero-dialog-detail";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { firstValueFrom, of } from "rxjs";
import { HeroDialogService } from "./hero-dialog-service";

describe(`${HeroDialogService.name}`, () => {
  let service: HeroDialogService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    matDialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);
    TestBed.configureTestingModule({
      providers: [
        HeroDialogService,
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    });
    service = TestBed.inject(HeroDialogService);
  });

  it("should open the dialog with correct config and return the result", async () => {
    const heroData: HeroDialogData = { id: 1, name: "Test Hero" } as any;
    const afterClosedValue = {
      ...heroData,
      name: "Updated Hero",
      title: "Updated Title",
    };
    const afterClosedSpy = jasmine.createSpyObj("MatDialogRef", [
      "afterClosed",
    ]);
    afterClosedSpy.afterClosed.and.returnValue(of(afterClosedValue));
    matDialogSpy.open.and.returnValue(afterClosedSpy);

    const result = await firstValueFrom(service.open(heroData).afterClosed());

    expect(matDialogSpy.open).toHaveBeenCalledWith(
      HeroDialogDetail,
      jasmine.objectContaining({
        disableClose: true,
        autoFocus: true,
        hasBackdrop: true,
        minWidth: "300px",
        maxWidth: "600px",
        data: heroData,
        width: "600px",
      })
    );
    expect(result).toEqual(afterClosedValue);
  });

  it("should return undefined if dialog is closed without data", async () => {
    const heroData: HeroDialogData = { id: 2, name: "Another Hero" } as any;
    const afterClosedSpy = jasmine.createSpyObj("MatDialogRef", [
      "afterClosed",
    ]);
    afterClosedSpy.afterClosed.and.returnValue(of(undefined));
    matDialogSpy.open.and.returnValue(afterClosedSpy);

    const result = await firstValueFrom(service.open(heroData).afterClosed());

    expect(result).toBeUndefined();
  });
});
