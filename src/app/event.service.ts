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

	postEvent(member: Event): Observable<Event> {
		return this.http.post<Event>(this.eventUrl, member);
	}

	putEvent(member: Event): Observable<Event> {
		let memberID = member._id;
		delete member._id;
		return this.http.put<Event>(`${this.eventUrl}/${memberID}`, member);
	}

	deleteEvent(member: Event): Observable<Event> {
		return this.http.delete<Event>(`${this.eventUrl}/${member._id}`);
	}
}
