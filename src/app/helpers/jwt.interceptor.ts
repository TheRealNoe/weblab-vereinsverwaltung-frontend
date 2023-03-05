import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AccountService } from "../services/account.service";
import { User } from "../interfaces/User";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private accountService: AccountService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const user: User = this.accountService.getUser();

		request = request.clone({
			setHeaders: {
				"Content-Type": "application/json",
				Authorization: `JWT ${user.token}`,
			},
		});

		return next.handle(request);
	}
}
