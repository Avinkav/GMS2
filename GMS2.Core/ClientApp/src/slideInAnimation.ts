import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

export const slideInAnimation = [ trigger('flyInOut', [
    transition(':enter', [
      style({ position: 'relative', transform: 'translateX(100%)'}),
      animate(150, style({transform: 'translateX(0%)', opacity: 1}))
    ]),
    transition(':leave', [
      style({ position: 'relative'}),
      animate(150, style({transform: 'translateX(100%)'}))
    ])
  ])
];
