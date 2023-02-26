import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Member } from "./Member";

@Injectable({
	providedIn: "root",
})
export class MemberService {
	private memberUrl = "http://localhost:8000/member";

	constructor(private http: HttpClient) {}

	getMembers(): Observable<Member[]> {
		return this.http.get<Member[]>(this.memberUrl);
	}

	getMember(id: string): Observable<Member> {
		return this.http.get<Member>(`${this.memberUrl}/${id}`);
	}

	postMember(member: Member): Observable<Member> {
		return this.http.post<Member>(this.memberUrl, member);
	}

	putMember(member: Member): Observable<Member> {
		let memberID = member._id;
		delete member._id;
		return this.http.put<Member>(`${this.memberUrl}/${memberID}`, member);
	}

	deleteMember(member: Member): Observable<Member> {
		return this.http.delete<Member>(`${this.memberUrl}/${member._id}`);
	}
}
