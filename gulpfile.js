const gulp = require('gulp');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();
require('dotenv').config(); // Lê o .env automaticamente

// 🧹 Limpa a pasta dist
async function clean() {
  const del = (await import('del')).deleteAsync;
  return del(['dist']);
}

// 📂 Copia arquivos estáticos da pasta src para dist
function copyFiles() {
  return gulp.src(['src/**/*', '!src/**/*.html', '!src/**/*.js']) // copia tudo menos HTML e JS (vamos processar eles à parte)
    .pipe(gulp.dest('dist'));
}

// 🔄 Substitui variáveis do .env nos arquivos HTML
function processHTML() {
  return gulp.src('src/**/*.html')
    .pipe(replace(/\(([A-Z0-9_]+)\)/g, (_, key) => process.env[key] || ''))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// 🔄 Substitui variáveis do .env nos arquivos JS
function processJS() {
  return gulp.src('src/**/*.js')
    .pipe(replace(/\(([A-Z0-9_]+)\)/g, (_, key) => process.env[key] || ''))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// 🚀 Inicia o servidor local e observa mudanças
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 8080,
  });

  // Observa mudanças nos arquivos HTML e JS
  gulp.watch('src/**/*.html', gulp.series(processHTML));
  gulp.watch('src/**/*.js', gulp.series(processJS));

  // Observa outros arquivos (imagens, CSS, etc.)
  gulp.watch(['src/**/*', '!src/**/*.html', '!src/**/*.js'], gulp.series(copyFiles, (done) => {
    browserSync.reload();
    done();
  }));

  // Se o .env mudar, reprocessa HTML e JS
  gulp.watch('.env', gulp.series(processHTML, processJS));
}

// 🧩 Pipeline principal
exports.build = gulp.series(clean, copyFiles, processHTML, processJS);
exports.serve = gulp.series(clean, copyFiles, processHTML, processJS, serve);
exports.default = exports.serve;