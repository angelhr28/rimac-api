import { Response } from '../app/model/response/Response';
import { StatusCode } from '../app/model/response/StatusCode';

class Result {
    private readonly statusCode: number;
    private readonly message: string;
    private readonly data?: any;
    
    constructor( statusCode: number, message: string, data?: any ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    
    bodyToString() {
        const response = new Response();
        response.statusCode = this.statusCode;
        
        const body: any = {
            message: this.message,
        };
        
        
        if ( this.data ) body.data = this.data;
        response.body = JSON.stringify( body );
        return response;
    }
}

export class MessageUtil {
    static success( message: string, data?: object ): Response {
        const result = new Result( StatusCode.SUCCESS, message, data );
        console.log( result.bodyToString() );
        return result.bodyToString();
    }
    
    static controlledError( message: string ) {
        const result = new Result( StatusCode.BAD_REQUEST, message );
        console.log( result.bodyToString() );
        return result.bodyToString();
    }
    
    static error( message: string ) {
        const result = new Result( StatusCode.INTERNAL_SERVER_ERROR, message );
        console.log( result.bodyToString() );
        return result.bodyToString();
    }
}
