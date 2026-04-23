import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class PlayListDot extends DDDSuper(LitElement) {
  static properties = {
    active: { type: Boolean },
    index: { type: Number },
  };

  static styles = [
    super.styles,
    css`
      button {
        width: 14px;
        height: 14px;
        border-radius: var(--ddd-radius-circle);
        border: none;
        margin: 0 var(--ddd-spacing-3);
        background: var(--ddd-theme-default-slateMaxLight);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      button.active {
        background: orange;
      }
    `,
  ];

  render() {
    return html`
      <button
        class=${this.active ? "active" : ""}
        @click=${this._click}
      ></button>
    `;
  }

  _click() {
    this.dispatchEvent(
      new CustomEvent("dot-click", {
        bubbles: true,
        composed: true,
        detail: { index: this.index },
      })
    );
  }
}

customElements.define("play-list-dot", PlayListDot);