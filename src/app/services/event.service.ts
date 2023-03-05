import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Event } from "../interfaces/Event";

@Injectable({
	providedIn: "root",
})
export class EventService {
	private eventUrl = "http://localhost:8000/api/v1/event";

	constructor(private http: HttpClient) {}

	getEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(this.eventUrl);
	}

	getEvent(id: number): Observable<Event> {
		return this.http.get<Event>(`${this.eventUrl}/${id}`);
	}

	postEvent(event: Event): Observable<Event> {
		return this.http.post<Event>(this.eventUrl, event);
	}

	putEvent(event: Event): Observable<Event> {
		let eventID = event._id;
		delete event._id;
		return this.http.put<Event>(`${this.eventUrl}/${eventID}`, event);
	}

	deleteEvent(event: Event): Observable<Event> {
		return this.http.delete<Event>(`${this.eventUrl}/${event._id}`);
	}
}
