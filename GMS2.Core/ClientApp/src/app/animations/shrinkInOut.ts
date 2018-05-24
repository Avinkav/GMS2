import { trigger, state, style, transition, animate } from '@angular/animations';

export const shrinkInOut = trigger('shrinkInOut', [
    state('in', style({ height: '*' })),
    transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
    ]),
    transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
    ])
]);
