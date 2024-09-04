1. ```npm install```
2. ```npm run subgraph1```
3. ```npm run subgraph2```
4. Get Apollo Router binary somewhere on your system and run ```router --dev --supergraph ./supergraph.graphqls```
5. Go to 127.0.0.1:4000 and run query:
```graphql
query {
  animals {
    ... on Cat {
      name
      image {
        url
        resized(width: 800, height: 600)
      }
    }
    ... on Dog {
      name
      image {
        url
        resized(width: 1000, height: 500)
      }
    }
  }
}
```
