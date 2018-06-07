import { trigger, state, style, transition, animate } from '@angular/animations';

export const spin1 = trigger('spin1', [

    transition('* <=> *', [

        // css styles at start of transition
        style({ transform: 'rotate(0)' }),

        // animation and styles at end of transition
        animate('200ms', style({ transform: 'rotate(-360deg)' }))
    ]),
]);
