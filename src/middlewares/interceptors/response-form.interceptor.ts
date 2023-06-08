import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { map, Observable } from "rxjs";

export class ResponseFormInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const status = context.switchToHttp().getResponse<Response>().statusCode;
    return next.handle().pipe(
      map(rsp => ({
        meta: {
          error: null,
          status
        },
        data: rsp || {}
      }))
    );
  }
}
