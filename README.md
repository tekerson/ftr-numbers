# FTR Numbers

This is a demo project for FTR.

## How to run

### Live

The application is deployed to GitHub Pages and can be accessed at [`http://tekerson.github.io/ftr-numbers/`](http://tekerson.github.io/ftr-numbers/).

### Tests

1. Install dependencies

```bash
npm install
```

2. Run tests

```bash
npm run test
```

### Local Development

1. Install dependencies

```bash
npm install
```

2. Run in development mode

```bash
npm run dev
```

## Questions

1. The application is written so that the majority of the logic is exposed from the `packages/app.ts` file.
This is independent of the interface and should allow for easy implmentation of alternative interfaces, such as a CLI or TUI.

I would not necessarily extract the application logic to this extent unless it was clear that having multiple interfaces would be a requirement as the wiring to adapt this to the react application is not trivial.

2. For a start, the application is in need of a facelift.
The interface is very minimal and not particularly user friendly, some simple CSS would go a long way but it would probably benefit from reconsidering the UX more holistically as it is currently a fairly straightforward port of the example CLI application.

From the technical side, I would probably consider splitting the `packages` into separate packages, either within the repository in a monorepo structure or possibly seperate repositories depending on factors such as the organisation structure and ownership rules, and the complexity and change frequency of the packages.

Deployment wise, it is currently deployed to GitHub Pages via GitHub Actions which is a reasonable start for a small project, but deploying to another service is probably advisable.
Given it is currently a static page, something like Amazon S3 or Cloudflare could be a good option, if backend services become required then a more full-stack solution would need to be considered.
The process is also currently simple and GitHub Actions is sufficient, but if it became more complex a more robust CI process may be advisable.

3. The task was interesting, the basic application - evaluating input for a given criteria - is very simple, but the addition of the pausable timer adds some complexity.
I think that either choosing to follow the example and implement a CLI or to tie the implementation to React more tightly would have been much easier.
The approach of impementing the application in plain TypeScript and then wrapping it in React increased the difficulty significantly and I'm still not super happy with the result.
