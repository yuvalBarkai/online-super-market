import { BehaviorSubject } from "rxjs";
import RegisterPart1 from "../models/RegisterPart1";
import RegisterPart2 from "../models/RegisterPart2";

export class RegistrationService {
  private part1Subject = new BehaviorSubject(new RegisterPart1());
  private part2Subject = new BehaviorSubject(new RegisterPart2());

  get part1Val() {
    return this.part1Subject.value;
  }

  get part2Val() {
    return this.part2Subject.value;
  }

  updatePart1(part1: RegisterPart1) {
    const { passwordConfirmation, ...rest } = part1;
    this.part1Subject.next(rest);
  }

  updatePart2(part2: RegisterPart2) {
    this.part2Subject.next(part2);
  }
}
