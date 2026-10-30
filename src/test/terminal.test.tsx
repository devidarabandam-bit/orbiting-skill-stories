import { describe, expect, it } from "vitest";
import { run } from "@/components/portfolio/Terminal";

describe("terminal commands", () => {
  it("clear returns the clear signal", () => expect(run("clear")).toBe("clear"));
  it("help returns output", () => expect(run("help")).toBeTruthy());
  it("empty input prints nothing", () => expect(run("  ")).toBeNull());
});
