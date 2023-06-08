import { ITEM_NOT_ALLOWED, ITEM_NOT_FOUND, PRISMA_ERROR, UNIQUE_ERROR } from "./../../lib/error-codes";
import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { GlobalExceptionFilter } from "./global-exception.filter";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends GlobalExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let http_exception: HttpException;
    console.log(exception);

    switch (exception.code) {
      case "P2002": {
        http_exception = new HttpException(UNIQUE_ERROR("Item", exception.meta.target as string), HttpStatus.NOT_ACCEPTABLE);
        break;
      }
      case "P2003": {
        http_exception = new HttpException(ITEM_NOT_ALLOWED(exception.meta.field_name), HttpStatus.NOT_ACCEPTABLE);
        break;
      }
      case "P2025": {
        http_exception = new HttpException(ITEM_NOT_FOUND(), HttpStatus.NOT_FOUND);
        break;
      }
      default:
        // default 500 error code
        http_exception = new HttpException(PRISMA_ERROR(), HttpStatus.BAD_GATEWAY);
    }

    super.catch(http_exception, host);
  }
}
