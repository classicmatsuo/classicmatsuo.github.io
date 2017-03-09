$(function() {
  var data = [{
      action: 'type',
      strings: ['npm install -g kmatsuo'],
      output: '<span class="gray">+matsuo@0.0.1 installed</span><br>&nbsp;',
      postDelay: 1000
    }, {
      action: 'type',
      strings: ['cd /resume2017'],
      output: '&nbsp;',
      postDelay: 1000
    }, {
      action: 'type',
      //clear: true,
      strings: ['npm run kmatsuo'],
      output: $('.mimik-run-output').html()
    }, {
      action: 'type',
      strings: [''],
      postDelay: 2000
    }

  ];
  runScripts(data, 0);
});

function runScripts(data, pos) {
  var prompt = $('.prompt'),
    script = data[pos];
  if (script.clear === true) {
    $('.history').html('');
  }
  switch (script.action) {
    case 'type':
      // cleanup for next execution
      prompt.removeData();
      $('.typed-cursor').text('');
      prompt.typed({
        strings: script.strings,
        typeSpeed: 20,
        callback: function() {
          var history = $('.history').html();
          history = history ? [history] : [];
          history.push('$ ' + prompt.text());
          if (script.output) {
            history.push(script.output);
            prompt.html('');
            $('.history').html(history.join('<br>'));
          }
          // scroll to bottom of screen
          $('section.terminal').scrollTop($('section.terminal').height());
          // Run next script
          pos++;
          if (pos < data.length) {
            setTimeout(function() {
              runScripts(data, pos);
            }, script.postDelay || 1000);
          }
        }
      });
      break;
    case 'view':
      break;
  }
}

var prompt = {
  window: $(".terminal-window"),
  shortcut: $(".prompt-shortcut"),
  input: $(".js-prompt-input"),
  
  init: function() {
    $(".js-minimize").click(prompt.minimize);
    $(".js-maximize").click(prompt.maximize);
    $(".js-close").click(prompt.close);
    $(".js-open").click(prompt.open);
    prompt.input.focus();
    prompt.input.blur(prompt.focus);
  },
  focus: function() {
    prompt.input.focus();
  },
  minimize: function() {
    prompt.window.removeClass("window--maximized");
    prompt.window.toggleClass("window--minimized");
  },
  maximize: function() {
    prompt.window.removeClass("window--minimized");
    prompt.window.toggleClass("window--maximized");
    prompt.focus();
  },
  close: function() {
    prompt.window.addClass("window--destroyed");
    prompt.window.removeClass("window--maximized window--minimized");
    prompt.shortcut.removeClass("hidden");
    prompt.input.val("");
  },
  open: function() {
    prompt.window.removeClass("window--destroyed");
    prompt.shortcut.addClass("hidden");
    prompt.focus();
  }
};
$(document).ready(prompt.init);