import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Dish, Opinion } from 'src/app/restaurant/dishes';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {
  nickname: boolean = false
  opinionLength: boolean = false
  private routeSub!: Subscription;
  name: string = ""

  constructor(private route: ActivatedRoute, private dishService: DishesService){}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.name = params['name']
    });
  }

  onSubmit(opinion: any, form: NgForm){
    this.nickname = false
    this.opinionLength = false
    if(opinion.nickname === '') this.nickname = true
    if(opinion.opinion.toString().length < 50 || opinion.opinion.toString().length > 500) this.opinionLength = true
    if(this.nickname || this.opinionLength) return

    const newOpinion: Opinion = {
      nickname: opinion.nickname,
      date: opinion.data,
      opinion: opinion.opinion
    }
    this.dishService.addOpinion(newOpinion, this.name)

    form.reset()
  }
}
