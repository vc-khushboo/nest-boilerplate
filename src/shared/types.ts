import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export type RequestWithUser = Request & { user: User };
