import { Request } from '@nestjs/common';
import { AuthJWTDto } from "./auth.dto";

export interface AuthenticatedRequest extends Request {
    user: AuthJWTDto;
}