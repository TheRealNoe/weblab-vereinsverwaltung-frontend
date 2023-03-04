import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Event } from "../Event";
import { EventService } from "../event.service";
import { NotificationService } from "../notification.service";
import { SpinnerService } from "../spinner.service";
import * as moment from "moment";

@Component({
	selector: "app-event-overview",
	templateUrl: "./event-overview.component.html",
	styleUrls: ["./event-overview.component.scss"],
})
export class EventOverviewComponent implements OnInit {
	displayedColumns: string[] = [
		"name",
		"location",
		"starttime",
		"endtime",
		"actions",
	];
	dataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>();

	@ViewChild("paginator") paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private memberService: EventService,
		private spinnerService: SpinnerService,
		private router: Router,
		public dialog: MatDialog,
		private notificationService: NotificationService
	) {
		spinnerService.spinnerOn();
	}

	ngOnInit() {
		this.getEvents();
	}

	async getEvents() {
		this.memberService.getEvents().subscribe(
			(response) => {
				for (const elm of response) {
					elm.starttime = moment(elm.starttime).format("DD.MM.YYYY");
					elm.endtime = moment(elm.endtime).format("DD.MM.YYYY");
				}
				this.dataSource = new MatTableDataSource(response);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.spinnerService.spinnerOff();
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Auflisten der Events ist ein Fehler aufgetreten."
				);
			}
		);
	}

	showEvent(row: Event) {
		this.router.navigate(["/event-modify", row._id]);
	}

	openDeleteDialog(row: Event) {
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				title: "Event löschen",
				content:
					"Sind Sie sich sicher, dass Sie das Event löschen wollen?",
			},
		});

		dialogRef.afterClosed().subscribe(
			(response) => {
				if (response) {
					this.spinnerService.spinnerOn();
					this.memberService
						.deleteEvent(row)
						.subscribe(async (data) => {
							this.getEvents();
							this.notificationService.success(
								"Das Event wurde erfolgreich gelöscht."
							);
						});
				}
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Löschen des Events ist ein Fehler aufgetreten."
				);
			}
		);
	}
}
