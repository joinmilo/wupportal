# Wooportal client

## Re-generate schema

Everytime a graphql file is written, the services need to be re-generated:

1. Pull latest server and run via docker-compose
2. Generate the Typescript `schema.ts`:

  ```bash
  npm run generate
  ```

Or within the docker service:

```bash
docker compose run 

```

## Use generated services
After generating the schema.ts file you will see all services generated in that file. You can then inject them as normal services in Angular.

**Example**:

```graphql
query myFancyQuery($param: String!) {
  someQuery(param: $param) {
    result {
      id
      name
      etc
    }
  }
}
```

This will generate something like `MyFancyQueryGQL` in the `schema.ts` file. This can now be imported as usual:

```typescript
...

constructor(
  private myFancyQueryService: MyFancyQueryGQL,
) {

  this.myFancyQueryService.watch({
    param: 'SomeParam',
  }).valueChanges.subscribe(response => console.log(response));
}

...

```
