const template = document.createElement("template");

template.innerHTML = `
  <style>
    p {
      color: white;
      background-color: #bada55;
    }
  </style>

  <p>
    <slot></slot>
  </p>
`;

export default class NeutroText extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

customElements.define("neutro-text", NeutroText);
