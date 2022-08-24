import { expect } from "chai";
import { bound } from "ts-named-params";

type Arg = { name: string };
type OptionalArg = Arg & { opt?: string };
type Bo = OptionalArg & { boo: boolean };

describe("bound", function () {
  it("should wrap an arg", function () {
    const fn = bound((v: { name: string }) => {
      return `hello ${v.name}`;
    }, "name");
    expect(fn("world")).to.eql("hello world");
  });
  it("should wrap multiple args", function () {
    const fn = bound(
      (v: { name: string; age: number }) => {
        return `hello ${v.name} ${v.age}`;
      },
      "name",
      "age"
    );
    expect(fn("world", 10)).to.eql("hello world 10");
  });
  it("should wrap an optional arg", function () {
    const fn = bound(
      (v: { name: string; opt?: string }) => {
        return `hello ${v.name}, ${v.opt || "no opt"}`;
      },
      "name",
      "opt"
    );
    expect(fn("world")).to.eql("hello world, no opt");
    expect(fn("world", "you rock")).to.eql("hello world, you rock");
  });
});
