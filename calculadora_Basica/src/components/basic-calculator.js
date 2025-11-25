import { LitElement, html } from "lit";

class BasicCalculator extends LitElement {

  constructor() {
    super();
    this.display = "0";
    this.firstValue = null;
    this.operator = null;
    this.waitingNew = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const bootstrap = document.createElement("link");
    bootstrap.rel = "stylesheet";
    bootstrap.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
    this.renderRoot.appendChild(bootstrap);
  }

  addValue(value) {
    if (this.waitingNew) {
      this.display = String(value);
      this.waitingNew = false;
    } else {
      this.display =
        this.display === "0" ? String(value) : this.display + value;
    }
    this.requestUpdate();
  }

  setOperation(operation) {
    if (this.firstValue === null) {
      this.firstValue = parseFloat(this.display);
    } else if (!this.waitingNew) {
      this.calculate();
    }

    this.operator = operation;
    this.waitingNew = true;
  }

  calculate() {
    if (this.firstValue === null || this.operator === null) return;

    const a = this.firstValue;
    const b = parseFloat(this.display);
    let result = 0;

    switch (this.operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "×": result = a * b; break;
      case "÷": result = b === 0 ? "Error" : a / b; break;
    }

    this.display = String(result);
    this.firstValue = result;
    this.waitingNew = true;
    this.requestUpdate();
  }

  clearAll() {
    this.display = "0";
    this.firstValue = null;
    this.operator = null;
    this.waitingNew = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container p-3 border rounded bg-white" style="max-width: 320px">

        <!-- DISPLAY -->
        <div class="form-control text-end fs-3 mb-3 py-3">${this.display}</div>

        <!-- GRID -->
        <div class="row g-2">

          <!-- Fila 1 (todas col-3 => se alinean perfecto) -->
          <div class="col-3"><button class="btn btn-danger w-100" @click=${this.clearAll}>AC</button></div>
          <div class="col-3"><button class="btn btn-secondary w-100" @click=${() => this.setOperation("÷")}>÷</button></div>
          <div class="col-3"><button class="btn btn-secondary w-100" @click=${() => this.setOperation("×")}>×</button></div>
          <div class="col-3"><button class="btn btn-secondary w-100" @click=${() => this.setOperation("-")}>-</button></div>

          <!-- Fila 2 -->
          ${[7, 8, 9].map(
            n => html`
              <div class="col-4">
                <button class="btn btn-light w-100" @click=${() => this.addValue(n)}>${n}</button>
              </div>
            `
          )}

          <!-- Fila 3 -->
          ${[4, 5, 6].map(
            n => html`
              <div class="col-4">
                <button class="btn btn-light w-100" @click=${() => this.addValue(n)}>${n}</button>
              </div>
            `
          )}

          <!-- Fila 4 -->
          ${[1, 2, 3].map(
            n => html`
              <div class="col-4">
                <button class="btn btn-light w-100" @click=${() => this.addValue(n)}>${n}</button>
              </div>
            `
          )}

          <!-- Fila 5 -->
          <div class="col-4">
            <button class="btn btn-light w-100" @click=${() => this.addValue(0)}>0</button>
          </div>

          <div class="col-4">
            <button class="btn btn-light w-100" @click=${() => this.addValue(".")}>.</button>
          </div>

          <div class="col-4">
            <button class="btn btn-success w-100" @click=${this.calculate}>=</button>
          </div>

          <!-- Botón para mantener orden -->
          <div class="col-12">
            <button class="btn btn-secondary w-100" @click=${() => this.setOperation("+")}>+</button>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define("basic-calculator", BasicCalculator);
