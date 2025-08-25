import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { HeroDialogDetail } from "@features/home/components/hero-dialog-detail/hero-dialog-detail";
import { HeroDialogEdit } from "@features/home/components/hero-dialog-edit/hero-dialog-edit";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { firstValueFrom, of } from "rxjs";
import { HeroDialogService } from "./hero-dialog-service";

describe(`${HeroDialogService.name}`, () => {
  let service: HeroDialogService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    matDialogSpy = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);
    TestBed.configureTestingModule({
      providers: [
        HeroDialogService,
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    });
    service = TestBed.inject(HeroDialogService);
  });

  describe("openDetail", () => {
    it("should open the detail dialog with correct config and return the result", async () => {
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

      const result = await firstValueFrom(
        service.openDetailHero(heroData).afterClosed(),
      );

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
        }),
      );
      expect(result).toEqual(afterClosedValue);
    });

    it("should return undefined if detail dialog is closed without data", async () => {
      const heroData: HeroDialogData = { id: 2, name: "Another Hero" } as any;
      const afterClosedSpy = jasmine.createSpyObj("MatDialogRef", [
        "afterClosed",
      ]);
      afterClosedSpy.afterClosed.and.returnValue(of(undefined));
      matDialogSpy.open.and.returnValue(afterClosedSpy);

      const result = await firstValueFrom(
        service.openDetailHero(heroData).afterClosed(),
      );

      expect(result).toBeUndefined();
    });
  });

  describe("openEdit", () => {
    it("should open the edit dialog with correct config and return the updated hero", async () => {
      const heroData: HeroDialogData = {
        id: 1,
        name: "Test Hero",
        alias: "Test Alias",
        powerLevel: 50,
      } as any;
      const updatedHero = {
        ...heroData,
        name: "Updated Hero",
        powerLevel: 75,
      };
      const afterClosedSpy = jasmine.createSpyObj("MatDialogRef", [
        "afterClosed",
      ]);
      afterClosedSpy.afterClosed.and.returnValue(of(updatedHero));
      matDialogSpy.open.and.returnValue(afterClosedSpy);

      const result = await firstValueFrom(
        service.openEditHero(heroData).afterClosed(),
      );

      expect(matDialogSpy.open).toHaveBeenCalledWith(
        HeroDialogEdit,
        jasmine.objectContaining({
          disableClose: true,
          autoFocus: true,
          hasBackdrop: true,
          minWidth: "300px",
          maxWidth: "600px",
          data: heroData,
          width: "600px",
        }),
      );
      expect(result).toEqual(updatedHero);
    });

    it("should return undefined if edit dialog is closed without saving", async () => {
      const heroData: HeroDialogData = { id: 2, name: "Another Hero" } as any;
      const afterClosedSpy = jasmine.createSpyObj("MatDialogRef", [
        "afterClosed",
      ]);
      afterClosedSpy.afterClosed.and.returnValue(of(undefined));
      matDialogSpy.open.and.returnValue(afterClosedSpy);

      const result = await firstValueFrom(
        service.openEditHero(heroData).afterClosed(),
      );

      expect(result).toBeUndefined();
    });
  });
});
