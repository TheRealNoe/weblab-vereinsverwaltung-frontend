import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class SpinnerService {
	spinning = new BehaviorSubject(false);

	constructor() {}

	public spinnerOn() {
		this.spinning.next(true);
	}

	public spinnerOff() {
		this.spinning.next(false);
	}
}
