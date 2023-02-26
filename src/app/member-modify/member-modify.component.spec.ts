import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MemberModifyComponent } from "./member-modify.component";

describe("MemberInformationComponent", () => {
	let component: MemberModifyComponent;
	let fixture: ComponentFixture<MemberModifyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MemberModifyComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MemberModifyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
