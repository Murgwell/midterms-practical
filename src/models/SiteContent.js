export class NavItem {
  constructor({ label, to, icon }) {
    this.label = label
    this.to = to
    this.icon = icon
  }
}

export class Option {
  constructor({ value, label }) {
    this.value = value
    this.label = label
  }
}

export class FormField {
  constructor({ name, label, placeholder, type = 'text', errorMessage, autoComplete, span = 1 }) {
    this.name = name
    this.label = label
    this.placeholder = placeholder
    this.type = type
    this.errorMessage = errorMessage
    this.autoComplete = autoComplete
    this.span = span
  }
}

export class SiteContent {
  constructor(config) {
    Object.assign(this, config)
  }

  static fromObject(raw) {
    return new SiteContent({
      brand: { ...raw.brand },
      nav: raw.nav.map((item) => new NavItem(item)),
      hero: { ...raw.hero },
      home: { ...raw.home },
      menuPage: {
        ...raw.menuPage,
        sortOptions: raw.menuPage.sortOptions.map((o) => new Option(o)),
      },
      fullMenuPage: { ...raw.fullMenuPage },
      dishPage: { ...raw.dishPage },
      cartPage: { ...raw.cartPage },
      checkoutPage: {
        ...raw.checkoutPage,
        fields: raw.checkoutPage.fields.map((f) => new FormField(f)),
        paymentOptions: raw.checkoutPage.paymentOptions.map((o) => new Option(o)),
      },
      confirmationPage: { ...raw.confirmationPage },
      footer: { ...raw.footer },
      statusLabels: { ...raw.statusLabels },
      taxLabels: { ...raw.taxLabels },
      themeToggle: { ...raw.themeToggle },
    })
  }
}
