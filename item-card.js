import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class ItemCard extends DDDSuper(LitElement) {

  static properties = {
    index: { type: Number },
    image: { type: String },
    title: { type: String },
    description: { type: String },
    author: { type: String },
    avatar: { type: String },
    likes: { type: Number },
    userVote: { type: String }
  };

  static styles = [
    super.styles,
    css`
      .card {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: white;
        color: #111;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .header {
        display: flex;
        align-items: center;
        padding: 12px 14px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
      }

      .image-container {
        height: 70%;
        overflow: hidden;
        flex-shrink: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .bottom {
        height: 30%;
        padding: 14px;
        border-top: 1px solid #e5e5e5;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .actions {
        display: flex;
        gap: 18px;
        margin-bottom: 10px;
        align-items: center;
      }

      .button {
        cursor: pointer;
        user-select: none;
        font-size: 18px;
      }

      .selected-like {
        color: #1db954;
        font-weight: bold;
      }

      .share {
        margin-left: auto;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.7;
      }

      .share:hover {
        opacity: 1;
      }

      .title {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .description {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];

  render() {
    return html`
      <div class="card">
        <div class="header">
          <img class="avatar" src="${this.avatar}" alt="author avatar">
          ${this.author}
        </div>
        <div class="image-container">
          <img loading="lazy" src="${this.image}" alt="${this.title}">
        </div>
        <div class="bottom">
          <div class="actions">
            <span
              class="button ${this.userVote === "like" ? "selected-like" : ""}"
              title="Like"
              @click=${() => this.vote("like")}
            >
              ❤️ ${this.likes}
            </span>
            <span
              class="share"
              title="Copy link to this image"
              @click=${this.share}
            >
              🔗
            </span>
          </div>
          <div class="title">${this.title}</div>
          <div class="description">${this.description}</div>
        </div>
      </div>
    `;
  }

  vote(type) {
    this.dispatchEvent(new CustomEvent("vote", {
      bubbles: true,
      composed: true,
      detail: { index: this.index, type }
    }));
  }

  share() {
    const url = new URL(window.location);
    url.searchParams.set("index", this.index);
    navigator.clipboard.writeText(url.toString());
    alert("Link copied!");
  }
}

customElements.define("item-card", ItemCard);
