import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-part1',
  templateUrl: './register-part1.component.html',
  styleUrls: ['./register-part1.component.scss']
})
export class RegisterPart1Component {
  constructor(private router: Router) { }
  part1Fields = { id_card: "", email: "", password: "", passwordConfirmation: "" };
  errorMsg = "";

  goToPart2() {
    const { passwordConfirmation, ...part1 } = this.part1Fields;
    if (passwordConfirmation != part1.password)
      this.errorMsg = "The passwords dont match";
    else {
      // check in the server if there is an already existing email
      this.router.navigate(['home', 'register', 'part2'], { state: { data: part1 } });
    }
  }
}
