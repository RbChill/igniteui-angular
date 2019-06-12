import { TestBed, getTestBed, resetFakeAsyncZone, ComponentFixture } from '@angular/core/testing';

/**
 * Per https://github.com/angular/angular/issues/12409#issuecomment-391087831
 * Destroy fixtures after each, reset testing module after all
 * @hidden
 */
export const configureTestSuite = () => {
  let originReset;
  beforeAll(() => {
    originReset = TestBed.resetTestingModule;
    // TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
  });

  afterEach(() => {
    const testBedApi: any = getTestBed();
    testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
    testBedApi._instantiated = false;
    (window as any).gc();
  });

  beforeEach(() => {
    resetFakeAsyncZone();
  });

  afterAll(() => {
    TestBed.resetTestingModule = originReset;
    TestBed.resetTestingModule();
  });
};
