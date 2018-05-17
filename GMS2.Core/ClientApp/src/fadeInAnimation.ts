import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeAnim', [
  transition(':enter', [
    style({
      opacity: 1
    }),
    animate(350)
  ]),
  transition(':leave', [
    animate('0.2s ease', style({
        opacity: 0
      }))
  ])
]);
