import { BehaviorSubject } from "rxjs";
import { RegisterPart1Type, RegisterPart2Type } from "../types";

export class RegistrationService {
  private part1Subject = new BehaviorSubject<RegisterPart1Type>({ id_card: "", user_email: "", password: "" });
  private part2Subject = new BehaviorSubject<RegisterPart2Type>({ first_name: "", last_name: "", city_id: "", street_name: "" });

  get part1Val() {
    return this.part1Subject.value;
  }

  get part2Val() {
    return this.part2Subject.value;
  }

  updatePart1(part1: RegisterPart1Type) {
    const { passwordConfirmation, ...rest } = part1;
    this.part1Subject.next(rest);
  }

  updatePart2(part2: RegisterPart2Type) {
    this.part2Subject.next(part2);
  }
}
