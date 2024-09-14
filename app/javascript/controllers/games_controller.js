import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="games"
export default class extends Controller {
  connect() {
    console.log("Hello from the games controller!")
  }
}
