# Water Jug

To start: `npm install`
To develop: `npm run dev`
To build production version: `npm run prod`

Once on the page, press '1' to simulate a data call to a city.

## Naming Conventions

CSS naming conventions use [BEM](http://getbem.com/). Dynamic elements have a `js-some-variable` class applied to them, so that changes to the style won’t affect the logic and vice-versa. For example:

```
  <div class="js-header-frame header__frame">
  </div>
```

The class `header__frame` should be used to style this element. On the JS side, the class `.js-header-frame` should be used to query this element.
