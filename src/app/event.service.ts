import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Event } from "./Event";

@Injectable({
	providedIn: "root",
})
export class EventService {
	private eventUrl = "http://localhost:8000/event";

	constructor(private http: HttpClient) {}

	getEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(this.eventUrl);
	}

	getEvent(id: number): Observable<Event> {
		return this.http.get<Event>(`${this.eventUrl}/${id}`);
	}
}
