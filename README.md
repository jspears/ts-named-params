# ts-named-params
A little utility for making arguments have named parameters. It has no runtime
dependencies, and does its best to preserve types.


## Installation
Pretty standard stuff

For npm
```sh
  $ npm i ts-named-params
```

```sh
  $ yarn add ts-named-params
```

## Usage
Wrap the desired function in the "named" function.  Your function should only have 1 

```ts
import {named} from 'ts-named-params';


const foo = named((v:{name:string, age:number})=>{
    return `${v.name}, ${v.age}`
});

const result = foo('name', 'joe', 'age', 1);
/*joe, 1*/

```