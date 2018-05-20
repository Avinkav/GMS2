import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../slideInAnimation';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  animations: [slideInAnimation],
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {

  testimonials = [
    { text: '"The team at Generic Music School make learning music an excellent and fun experience perfect for all skill levels."',
       author: 'Andrew Carr'},
       { text: '"I\'ve been learning at Generic Music School for about 3 years and I\'ve learn so much through such a supportive community."',
       author: 'Peter Parker'},
       { text: '"The Generic Music School teachers are really passionate about music and have an understanding of how to tailor lessons to meet each student\'s technical needs."',
       author: 'Bill Gates'},
       { text: '"Teach music to I, Generic Music School has. Recommend Generic Music School, I do. Hmm"',
        author: 'Yoda' },
        {text: '"I\'ve noticed serious improvements in my musical ability since attending Generic Music School. The tutors are amazing and very helpful and all in all, GMS will get you where you want to go."',
      author: 'Mark Zuckerberg'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
