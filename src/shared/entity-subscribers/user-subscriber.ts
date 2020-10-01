import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent
} from 'typeorm';

import { User } from '../../entities/user.entity';
import { UtilsService } from '../providers/utils.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo() {
        return User;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    beforeInsert(event: InsertEvent<User>) {
        if (event.entity.password) {
            event.entity.password = UtilsService.generateHash(
                event.entity.password,
            );
        }
    }
}
