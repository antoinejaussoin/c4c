import moment from 'moment';
import mean from 'lodash/mean';
import chalk from 'chalk';
import Jetty from 'jetty';

const jetty = new Jetty(process.stdout);

export default (timings, threads, current, total) => {
    const avg = mean(timings);
    const remaining = (avg / threads) * (total - current);
    const percentage = Math.round(current / total * 10000) / 100;

    const text = 
        chalk.grey('Progress: ') +
        chalk.white(current) +
        chalk.grey(' / ') +
        chalk.white(total) +
        '	' +
        progressBar(current, total, 35) +
        '	' +
        chalk.red(percentage + '%') +
        '	' +
        chalk.grey(' (estimated: ') +
        chalk.yellow(moment.duration(remaining).humanize()) +
        chalk.grey(')\n');

        
    jetty.text(text);
};

const progressBar = (current, total, length) => {
  let result = chalk.white('[');
  let bar = "=".repeat(Math.round(current/total*length));
  let whiteBar = bar.length === length ? '' : " ".repeat(length - (bar.length));
  return chalk.white('[') + chalk.green(bar+">") + whiteBar + chalk.white("]");
}

