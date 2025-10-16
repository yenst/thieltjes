import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sidebar", "content", "label", "collapseButton"]
  static values = {
    collapsed: Boolean
  }

  connect() {
    this.updateCollapsedState()
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener("resize", this.handleResize)
  }

  disconnect() {
    window.removeEventListener("resize", this.handleResize)
  }

  toggleMobile() {
    this.sidebarTarget.classList.toggle("hidden")
  }

  toggleCollapse() {
    this.collapsedValue = !this.collapsedValue
  }

  collapsedValueChanged() {
    this.updateCollapsedState()
  }

  updateCollapsedState() {
    const isCollapsed = this.collapsedValue
    document.body.dataset.sidebarCollapsed = isCollapsed

    const pressedValue = isCollapsed ? "true" : "false"
    this.collapseButtonTargets.forEach((button) => {
      button.setAttribute("aria-pressed", pressedValue)
      button.dataset.collapsed = pressedValue
    })
  }

  handleResize() {
    if (window.innerWidth >= 768) {
      this.sidebarTarget.classList.remove("hidden")
    }
  }
}
