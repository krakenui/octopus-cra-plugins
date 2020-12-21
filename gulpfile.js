const gulp = require("gulp");

gulp.task("bundle", (done) => {
  // copy dist folder
  gulp
    .src(["package.json", "README.md"])
    .pipe(gulp.dest("dist"));

  done();
});
