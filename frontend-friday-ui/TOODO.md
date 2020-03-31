# Learning Build Tools

1. Remove all the build tools I have in place but keep storybook working
  - Remove .babelrc (make sure this doesnt break storybook)
  - Remove dependencies
  - Remove all deps for Jest
2. Implement a monorepo moving the example and front-end-friday-ui into it
3. Reimplement build tools for building:
  - Build javascript bundles
  - What should the output be? cjs/esm?
  - Build CSS
