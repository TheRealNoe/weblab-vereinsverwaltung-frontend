import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Event } from "../../interfaces/Event";
import { EventService } from "../../services/event.service";
import { NotificationService } from "../../services/notification.service";
import { SpinnerService } from "../../services/spinner.service";
import { BreakpointObserver } from "@angular/cdk/layout";
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
		private notificationService: NotificationService,
		private breakpointObserver: BreakpointObserver
	) {
		spinnerService.spinnerOn();
	}

	ngOnInit() {
		this.getEvents();
		this.breakpointObserver
			.observe("(min-width: 1000px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(min-width: 1000px)")) {
					this.displayedColumns = [
						"name",
						"location",
						"starttime",
						"endtime",
						"actions",
					];
				}
			});
		this.breakpointObserver
			.observe("(max-width: 1000px) and (min-width: 800px)")
			.subscribe((result) => {
				if (
					this.breakpointObserver.isMatched(
						"(max-width: 1000px) and (min-width: 800px)"
					)
				) {
					this.displayedColumns = [
						"name",
						"location",
						"starttime",
						"actions",
					];
				}
			});
		this.breakpointObserver
			.observe("(max-width: 800px) and (min-width: 500px)")
			.subscribe((result) => {
				if (
					this.breakpointObserver.isMatched(
						"(max-width: 800px) and (min-width: 500px)"
					)
				) {
					this.displayedColumns = ["name", "location", "actions"];
				}
			});

		this.breakpointObserver
			.observe("(max-width: 500px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(max-width: 500px)")) {
					this.displayedColumns = ["name", "actions"];
				}
			});
	}

	async getEvents() {
		this.memberService.getEvents().subscribe(
			(response) => {
				for (const elm of response) {
					elm.starttime = moment(elm.starttime).format(
						"DD.MM.YYYY HH:mm"
					);
					elm.endtime = moment(elm.endtime).format(
						"DD.MM.YYYY HH:mm"
					);
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
