import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Statistic } from "../interfaces/Statistic";
import { Event } from "../interfaces/Event";

@Injectable({
	providedIn: "root",
})
export class StatsService {
	private statsUrl = "http://localhost:8000/api/v1/stats/";

	constructor(private http: HttpClient) {}

	getAmounts(): Observable<Statistic> {
		return this.http.get<Statistic>(this.statsUrl + "amounts");
	}

	getUpcomingEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(this.statsUrl + "upcomingEvents");
	}
}
