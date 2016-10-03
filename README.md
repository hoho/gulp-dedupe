# gulp-dedupe [![Build Status](https://travis-ci.org/hoho/gulp-dedupe.svg?branch=master)](https://travis-ci.org/hoho/gulp-dedupe)

This plugin is checking for duplicate files (based on their name) in the stream and filter them or throw an error.


Install:

```sh
npm install gulp-dedupe --save-dev
```


Example:

```js
var dedupe = require('gulp-dedupe');

...
    .pipe(dedupe()) // Remove duplicates from previous tasks (if any).
    .pipe(concat('bundle.css')) // For example, we need to concat the result without duplicates.
    .pipe(gulp.dest('./build'));
```

`dedupe(options)` optionally accepts `options` object. The following options are
available:

+ `error` to emit an error in case of duplicate (`false` by default).
+ `same` to emit an error in case duplicates have different contents (`true` by
  default).
+ `diff` to supply duplicates with different contents error from previous option
  with actual diff (`false` by default).
