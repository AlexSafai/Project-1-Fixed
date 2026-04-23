import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./play-list-arrow.js";
import "./play-list-dot.js";

class PlayList extends DDDSuper(LitElement) {
  static properties = {
    index: Number,
    _slideCount: { state: true }
  };

  constructor() {
    super();
    this.index = 0;
    this._slideCount = 0;
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
        position: relative;
        height: 600px;
        overflow: hidden;
        padding-right: 60px;
      }

      .slides {
        display: flex;
        flex-direction: column;
        transition: transform 0.4s ease;
        height: 100%;
      }

      ::slotted(*) {
        min-height: 100%;
      }

      .controls {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    `
  ];

  updated(changed) {
    if (changed.has("index")) {
      this.dispatchEvent(new CustomEvent("index-changed", {
        detail: { index: this.index },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div
        class="slides"
        style="transform: translateY(-${this.index * 100}%);"
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>

      <div class="controls">
        <play-list-arrow direction="up"></play-list-arrow>

        ${Array.from({ length: this._slideCount }).map(
          (_, i) => html`
            <play-list-dot .index=${i} .active=${i === this.index}></play-list-dot>
          `
        )}

        <play-list-arrow direction="down"></play-list-arrow>
      </div>
    `;
  }

  _handleSlotChange(e) {
    this._slideCount = e.target.assignedElements().length;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("arrow-click", e => {
      this.index =
        e.detail.direction === "up"
          ? (this.index - 1 + this._slideCount) % this._slideCount
          : (this.index + 1) % this._slideCount;
    });

    this.addEventListener("dot-click", e => {
      this.index = e.detail.index;
    });
  }
}

customElements.define("play-list", PlayList);