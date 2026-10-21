export class Customer {
  constructor({ fullName = '', email = '', phone = '', address = '', notes = '' } = {}) {
    this.fullName = fullName
    this.email = email
    this.phone = phone
    this.address = address
    this.notes = notes
  }

  get firstName() {
    return this.fullName.trim().split(/\s+/)[0] || ''
  }

  get isValid() {
    return Object.keys(this.validate()).length === 0
  }

  validate() {
    const errors = {}
    if (this.fullName.trim().length < 2) errors.fullName = 'required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) errors.email = 'invalid'
    if (!/^(\+63|0)9\d{9}$/.test(this.phone.replace(/[\s-]/g, ''))) errors.phone = 'invalid'
    if (this.address.trim().length < 8) errors.address = 'required'
    return errors
  }

  toJSON() {
    return {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      notes: this.notes,
    }
  }
}
