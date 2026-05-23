class User {
	static userName;
	private surname;
	protected age;

	constructor(userName, surname, age) {
		User.userName = userName;
		this.age = age;
		this.surname = surname;
	}

	public setAge(age) {
		this.age = age;
	}

	public getAge() {
		return this.age;
	}
}