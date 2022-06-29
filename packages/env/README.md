# ♻️ env

Utilities to handle environmental variables

# 📚 example

```ts
import { env } from '@pinkcig/env';

process.env.MY_ENV_VAR = 'my-env-var';
env('MY_ENV_VAR').string(); // 'my-env-var'

delete process.env.MY_ENV_VAR;
env('MY_ENV_VAR', { defaultValue: 'default' }).string(); // 'default'
env('MY_ENV_VAR', { required: true }); // throws EnvironmentalError

process.env.MY_ENV_VAR = '5';
env('MY_ENV_VAR').number(); // 5

process.env.MY_ENV_VAR = 'true';
env('MY_ENV_VAR').boolean(); // true

process.env.MY_ENV_VAR = 'hello, world';
env('MY_ENV_VAR').array(); // ['hello', 'world']
```
