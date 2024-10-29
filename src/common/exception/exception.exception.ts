import { HttpException, HttpStatus } from "@nestjs/common";


export class ExceptionResponse {

    ok(extraParams: { [key: string]: any }) {
        throw new HttpException(
            { ...extraParams },
            HttpStatus.OK
        )
    }

    badRequest(extraParams: { [key: string]: any }) {

        throw new HttpException(
            extraParams,
            HttpStatus.BAD_REQUEST
        )
    }

    unAuth(extraParams: { [key: string]: any }) {
        throw new HttpException(
            { ...extraParams },
            HttpStatus.UNAUTHORIZED
        )
    }

    forbiden(extraParams: { [key: string]: any }) {
        throw new HttpException(
            { ...extraParams },
            HttpStatus.FORBIDDEN
        )
    }

    notFound(extraParams: { [key: string]: any }) {
        throw new HttpException(
            { ...extraParams },
            HttpStatus.NOT_FOUND
        )
    }

    serverError() {
        throw new HttpException(
            {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                messageEn: "internal server error",
                messageTh: "เกิดข้อผิดพลาดจาก server",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

}