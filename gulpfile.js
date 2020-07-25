const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp')
const sass = require('gulp-sass')
const autoprefix = require('gulp-autoprefixer')
const browsersync = require('browser-sync')

// Directories
var paths = {
  scss: './styles/',
  data: './data/',
  js: './js/'
};

// Handle changes to .scss files
function css(cb) {
  return src('styles/*.scss')
    .pipe(sass({
      includePaths: [paths.scss],
      outputStyle: 'compressed'
    })
    )
    .pipe(
      autoprefix(['> .5%'])
    )
    .pipe(dest('styles/'))
    cb()
};

// On changes to scss or js files, reload the page in browser
function watchFiles(cb) {
  watch(paths.scss + '**/*.scss', parallel(css))
    .on('change', browsersync.reload)
  watch(paths.js + '**/*.js')
    .on('change', browsersync.reload)
  cb()
}

// BrowserSync configuration
function browserSync(cb) {
  browsersync({
    server: {
      baseDir: './'
    },
    notify: false,
    browser: "google chrome"
  })
  cb()
}

const watching = series(watchFiles, browserSync);

exports.default = watching;
