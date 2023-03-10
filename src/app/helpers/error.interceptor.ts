import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private accountService: AccountService,
		private router: Router
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err) => {
				if ([401, 403].includes(err.status)) {
					this.accountService.logout();
					this.router.navigate(["/login"]);
				}

				return throwError(() => err);
			})
		);
	}
}
