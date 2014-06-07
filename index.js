var request = require('request');
var cheerio = require('cheerio');
var inquirer = require('inquirer');
var chalk = require('chalk');
var open = require('open');
var _ = require('underscore');

console.log(chalk.red('( *・ω・)✄╰ひ╯正在勾搭小炖君 '));

var options = {
    url: 'http://html-js.com/article',
    headers: {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2024.2 Safari/537.36'
    }
};

request(options,function(error,response,body){
  if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      var choices = [];
      var urls = [];
      var colors = ['red','green','yellow','magenta','cyan','white','gray'];
      var colors = _.shuffle(colors)
      for(var i=1;i<6;i++){
          var title = chalk[colors[i]]($('.entry-title').eq(i).children('a').text());
          var author = chalk[colors[i]]($('.entry-foot').eq(i).find('a').eq(0).text());
          var time  = chalk[colors[i]]($('.entry-foot').eq(i).find('a').eq(1).text());
          choices.push("《"+title+'》 by. '+author+' '+time);
          urls.push('http://html-js.com'+$('.entry-title').eq(i).children('a').attr('href'));
      }
      console.log("\033[2J\033[0f")
      choices.push(chalk.red('(*･ω･) 退粗!'))
      inquirer.prompt([
        {
          type: "list",
          name: "post",
          message: chalk.bold('最近五篇文章'),
          choices: choices
        }
      ], function( answers ) {
          if(answers.post == chalk.red('(*･ω･) 退粗!')){
            console.log("\033[2J\033[0f");
            process.exit(0)
          }else{
            //console.log("\033[2J\033[0f");
            console.log(1);
            //open(urls[choices.indexOf(answers.post)]);
          }
        });
  }else{
    console.log('( •̥́ ˍ •̀ू )联系不上小炖君，客官再来玩');
    process.exit(1);
  }
});
