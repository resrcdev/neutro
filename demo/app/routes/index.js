const template = document.createElement("template");

template.innerHTML = `
  <neutro-text>Welcome to Neutro!</neutro-text>

  <!-- IDEA: Autoloader for components. -->
  <script type="module" src="./components/neutro-text.js"></script>
`;

export default class Home extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}
