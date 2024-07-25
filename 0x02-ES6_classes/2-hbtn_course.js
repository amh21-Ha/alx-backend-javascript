class HolbertonCourse {
  constructor(name, length, students) {
    this._name = this._validateString(name, 'Name');
    this._length = this._validateNumber(length, 'Length');
    this._students = this._validateStudentsArray(students, 'Students');
  }

  _validateString(value, attribute) {
    if (typeof value !== 'string') {
      throw new TypeError(`${attribute} must be a string`);
    }
    return value;
  }

  _validateNumber(value, attribute) {
    if (typeof value !== 'number') {
      throw new TypeError(`${attribute} must be a number`);
    }
    return value;
  }

  _validateStudentsArray(value, attribute) {
    if (!Array.isArray(value) || !value.every(student => typeof student === 'string')) {
      throw new TypeError(`${attribute} must be an array of strings`);
    }
    return value;
  }

  // Getters
  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get students() {
    return this._students;
  }

  // Setters
  set name(value) {
    this._name = this._validateString(value, 'Name');
  }

  set length(value) {
    this._length = this._validateNumber(value, 'Length');
  }

  set students(value) {
    this._students = this._validateStudentsArray(value, 'Students');
  }
}

export default HolbertonCourse;
