// import { ArgumentsHost, BadRequestException, Catch, HttpStatus } from "@nestjs/common";
// import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

// @Catch(BadRequestException)
// export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
//   catch(exception: BadRequestException, host: ArgumentsHost) {
//     const response = exception.getResponse() as { message: string[] };
//     const properException = new WsException({ status: HttpStatus.NOT_ACCEPTABLE, messages: response.message, code: 4061 });
//     super.catch(properException, host);
//   }
// }
