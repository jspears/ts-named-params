import { expect } from "chai";
import { named } from "ts-named-parameters";

type Arg = { name: string };
type OptionalArg =Arg & { opt?: string };
type Bo = OptionalArg & { boo: boolean };

describe("named", function () {
  it("should wrap an arg", function () {
    const fn = named((v: { name: string }) => {
      return `hello ${v.name}`;
    });
    expect(fn("name", "world")).to.eql("hello world");
  });
 
  it("should wrap an arg and an object", function () {
    const fn = named((v: { name: string }) => {
      return `hello ${v.name}`;
    });
    expect(fn({"name": "world"})).to.eql("hello world");
  });

  it("should wrap an optional arg", function () {
    const fn = named((v: OptionalArg) => {
      return `hello ${v.name}, ${v.opt || 'no opt'}`;
    });
    expect(fn("name", "world")).to.eql("hello world, no opt");
    expect(fn("name", "world", "opt", "you rock")).to.eql("hello world, you rock");
  });

  it("should wrap an optional arg with an object", function () {
    const fn = named((v: OptionalArg) => {
      return `hello ${v.name}, ${v.opt || 'no opt'}`;
    });
    expect(fn({"name": "world"})).to.eql("hello world, no opt");
    expect(fn({"name": "world", "opt": "you rock"})).to.eql("hello world, you rock");
  });
  
  it("should fail when not valid", function(){
    const fn = named((v: OptionalArg) => {
        return `hello ${v.name}, ${v.opt || 'no opt'}`;
      });
      expect(()=>fn(null as any, 'what')).to.throw();
  
  })
  
});
