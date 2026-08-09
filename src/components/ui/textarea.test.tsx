import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Textarea } from "./textarea"

describe("Textarea component", () => {
  it("renders correctly", () => {
    render(<Textarea placeholder="Type your message here." />)
    const textarea = screen.getByPlaceholderText("Type your message here.")
    expect(textarea).toBeInTheDocument()
  })

  it("applies the given class name", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />)
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveClass("custom-class")
  })

  it("passes additional props to the textarea element", () => {
    render(<Textarea disabled data-testid="textarea" />)
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toBeDisabled()
  })
})
