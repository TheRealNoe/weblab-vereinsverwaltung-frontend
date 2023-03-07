import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { SpinnerService } from "../../services/spinner.service";
import { StatsService } from "../../services/stats.service";
import { ChartComponent } from "ng-apexcharts";
import {
	ApexNonAxisChartSeries,
	ApexResponsive,
	ApexChart,
} from "ng-apexcharts";
import { MatTableDataSource } from "@angular/material/table";
import { Event } from "../../interfaces/Event";
import { BreakpointObserver } from "@angular/cdk/layout";
import * as moment from "moment";
import { Router } from "@angular/router";

export type ChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	responsive: ApexResponsive[];
	labels: any;
};

export interface TableData {
	name: string;
	value: number;
}

@Component({
	selector: "app-stats",
	templateUrl: "./stats.component.html",
	styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
	displayedColumns: string[] = ["name", "value"];
	dataSource: MatTableDataSource<TableData> =
		new MatTableDataSource<TableData>();

	@ViewChild("chart") chart: ChartComponent | any;
	public chartOptions: Partial<ChartOptions> | any;

	displayedColumns2: string[] = ["name", "location", "starttime", "endtime"];
	dataSource2: MatTableDataSource<Event> = new MatTableDataSource<Event>();

	firstCallDone: boolean = false;

	constructor(
		private statsService: StatsService,
		private notificationService: NotificationService,
		private spinnerService: SpinnerService,
		private breakpointObserver: BreakpointObserver,
		private router: Router
	) {
		this.spinnerService.spinnerOn();
		this.chartOptions = {
			series: [],
			chart: {
				width: 600,
				type: "pie",
			},
			labels: [],
			responsive: [
				{
					breakpoint: 1350,
					options: {
						chart: {
							width: 500,
						},
						legend: {
							position: "bottom",
						},
					},
				},
				{
					breakpoint: 1100,
					options: {
						chart: {
							width: "100%",
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		};
	}

	ngOnInit() {
		this.statsService.getAmounts().subscribe(
			(response) => {
				this.chartOptions.series = [
					response.amountMembers,
					response.amountEvents,
					response.amountResources,
				];
				this.chartOptions.labels = [
					"Mitglieder",
					"Events",
					"Ressourcen-Positionen",
				];

				let tableData: TableData[] = [
					{
						name: "Mitglieder",
						value: response.amountMembers,
					},
					{
						name: "Events",
						value: response.amountEvents,
					},
					{
						name: "Ressourcen-Positionen",
						value: response.amountResources,
					},
				];

				this.dataSource = new MatTableDataSource(tableData);

				if (this.firstCallDone) {
					this.spinnerService.spinnerOff();
				}
				this.firstCallDone = true;
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Laden der Statistik ist ein Fehler aufgetreten."
				);
			}
		);

		this.statsService.getUpcomingEvents().subscribe(
			(response) => {
				for (const elm of response) {
					elm.starttime = moment(elm.starttime).format(
						"DD.MM.YYYY HH:mm"
					);
					elm.endtime = moment(elm.endtime).format(
						"DD.MM.YYYY HH:mm"
					);
				}
				this.dataSource2 = new MatTableDataSource(response);

				if (this.firstCallDone) {
					this.spinnerService.spinnerOff();
				}
				this.firstCallDone = true;
			},
			(error) => {
				this.spinnerService.spinnerOff();
				this.notificationService.error(
					"Beim Laden der Statistik ist ein Fehler aufgetreten."
				);
			}
		);

		this.breakpointObserver
			.observe("(min-width: 700px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(min-width: 700px)")) {
					this.displayedColumns2 = [
						"name",
						"location",
						"starttime",
						"endtime",
					];
				}
			});

		this.breakpointObserver
			.observe("(max-width: 700px)")
			.subscribe((result) => {
				if (this.breakpointObserver.isMatched("(max-width: 700px)")) {
					this.displayedColumns2 = ["name", "location", "starttime"];
				}
			});
	}

	showPosition(row: any) {
		if (row["name"]) {
			switch (row["name"]) {
				case "Mitglieder":
					this.router.navigate(["/members"]);
					break;
				case "Events":
					this.router.navigate(["/events"]);
					break;
				case "Ressourcen-Positionen":
					this.router.navigate(["/resources"]);
					break;
			}
		}
	}

	showEvent(row: Event) {
		this.router.navigate(["/event-modify", row._id]);
	}
}
