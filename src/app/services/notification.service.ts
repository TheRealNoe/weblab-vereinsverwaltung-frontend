import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	horizontalPosition: MatSnackBarHorizontalPosition = "center";
	verticalPosition: MatSnackBarVerticalPosition = "bottom";

	constructor(
		private readonly snackBar: MatSnackBar,
		public dialog: MatDialog
	) {}

	success(message: string) {
		this.openSnackBar(message, "", "success-snackbar");
	}

	error(message: string) {
		this.openSnackBar(message, "", "error-snackbar");
	}

	openSnackBar(
		message: string,
		action: string,
		className = "",
		duration = 3000
	) {
		this.snackBar.open(message, action, {
			duration: duration,
			panelClass: [className],
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
}
