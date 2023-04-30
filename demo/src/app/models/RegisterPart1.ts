class RegisterPart1 {
  constructor(
    public id_card: number | string = "",
    public user_email: string = "",
    public password: string = "",
    public passwordConfirmation?: string,
  ) { }
}

export default RegisterPart1
