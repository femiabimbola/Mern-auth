# Handling Error in Express

There should be a universal middleware to handle error.

It should the last middleware, just right above the `app.listen` app.

In this repository, it is 

```index.ts
app.use(errorHandler);
```
The file is located in the `src/middleware/errorHandler.ts`

