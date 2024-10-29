import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ExceptionResponse } from '../exception/exception.exception';

export class CustomInterceptors implements NestInterceptor {

    constructor(private readonly exceptRes: ExceptionResponse) { }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        console.log('Before...');
        // console.log("context : ",context.getArgs()[0].socket);
        return handler.handle().pipe(
            map((data) => {
                console.log('response: ', data)
                // console.log({ statusCode: data.statusCode ? data.statusCode : 500 })

                if (data.statusCode) {
                    switch (data.statusCode) {
                        case 200:
                            this.exceptRes.ok(data)
                            break;
                        case 400:
                            this.exceptRes.badRequest(data)
                            break;
                        case 401:
                            this.exceptRes.unAuth(data)
                            break;
                        case 403:
                            this.exceptRes.forbiden(data)
                            break;
                        case 404:
                            this.exceptRes.notFound(data)
                            break;
                        default:
                            this.exceptRes.serverError()
                    }
                }
                else {
                    return data
                }

            }
            ),
        );
    }
}