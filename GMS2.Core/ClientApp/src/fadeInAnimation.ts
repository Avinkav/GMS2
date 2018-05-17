import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeAnim', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.3s', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.2s ease', style({
        opacity: 0
      }))
  ])
]);
