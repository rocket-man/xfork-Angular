export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
//get and set will act as properties
//So when we do => user.token //getter gets called
//user.token=abcd //setter gets called

//in contructor when we declare the params, they automatically become properties of class
