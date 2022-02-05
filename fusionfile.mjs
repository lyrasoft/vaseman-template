/**
 * Part of Windwalker Fusion project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

import fusion, { sass, babel, parallel } from '@windwalker-io/fusion';
import { installVendors } from './build/js/install-vendors.mjs';
import proc from 'child_process';

export async function up() {
  // Watch start
  fusion.watch([
    'entries/**/*',
    'layouts/**/*',
    'assets/**/*'
  ]);
  // Watch end

  let cmd = 'vaseman up ..';

  if (process.env.NODE_ENV === 'production') {
    cmd += ' --hard';
  }

  proc.exec(cmd, (err, stdout, stderr) => {
    console.log(stdout);
  });
}

export async function css() {
  // Watch start
  fusion.watch('resources/assets/scss/**/*.scss');
  // Watch end

  // Front
  sass(
    'resources/assets/scss/main.scss',
    'assets/css/main.css'
  );
  sass(
    'resources/assets/scss/bootstrap.scss',
    'assets/css/bootstrap.css'
  );
}

export async function js() {
  // Watch start
  fusion.watch(['resources/assets/src/**/*.{js,mjs}']);
  // Watch end

  // Compile Start
  babel('resources/assets/src/**/*.{js,mjs}', 'assets/js/');
}

export async function images() {
  // Watch start
  fusion.watch('resources/assets/images/**/*');
  // Watch end

  // Compile Start
  return await fusion.copy('resources/assets/images/**/*', 'assets/images/')
  // Compile end
}

// To fix that last task watch won't work.
export async function nope() {}

export async function install() {
  return installVendors(
    [
      '@fortawesome/fontawesome-free',
      'bootstrap',
      'jquery'
    ]
  );
}

export default parallel(css, js, images, up);

/*
 * APIs
 *
 * Compile entry:
 * fusion.js(source, dest, options = {})
 * fusion.babel(source, dest, options = {})
 * fusion.module(source, dest, options = {})
 * fusion.ts(source, dest, options = {})
 * fusion.typeScript(source, dest, options = {})
 * fusion.css(source, dest, options = {})
 * fusion.sass(source, dest, options = {})
 * fusion.copy(source, dest, options = {})
 *
 * Live Reload:
 * fusion.livereload(source, dest, options = {})
 * fusion.reload(file)
 *
 * Gulp proxy:
 * fusion.src(source, options)
 * fusion.dest(path, options)
 * fusion.watch(glob, opt, fn)
 * fusion.symlink(directory, options = {})
 * fusion.lastRun(task, precision)
 * fusion.tree(options = {})
 * fusion.series(...tasks)
 * fusion.parallel(...tasks)
 *
 * Stream Helper:
 * fusion.through(handler) // Same as through2.obj()
 *
 * Config:
 * fusion.disableNotification()
 * fusion.enableNotification()
 */
