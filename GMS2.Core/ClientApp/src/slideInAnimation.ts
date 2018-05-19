import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

export const slideInAnimation = trigger('slideAnim', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)'
    }),
    animate(350, style({ transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    animate('1s ease', style({
        opacity: 0
      }))
  ])
]);
