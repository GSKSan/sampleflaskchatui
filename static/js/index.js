var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
    returnMessage="";

$(window).load(function() {
    $messages.mCustomScrollbar();
    setTimeout(function() {
        fakeMessage();
    }, 100);
});

function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    console.log(msg)

    getMessage();
    postData(msg);
    setTimeout(function() {
        fakeMessage();
    }, 1000);
}

$('.message-submit').click(function() {
    insertMessage();
});

$(window).on('keydown', function(e) {
    if (e.which == 13) {
        insertMessage();
        return false;
    }
})

var Fake = [
    'Hi there, I\'m BATMAN and you?',
    'Do you wanna know My Secret Identity?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    'That\'s awesome',
    'Codepen is a nice place to stay',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Bye',
    ':)'
]

function fakeMessage(message) {
    var msg="";
    console.log(returnMessage)

    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="img/bat.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    if(i==0){
        msg = greeting();
    }
    else{
        msg = returnMessage.msg;
    }

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="img/bat.png" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
    }, 1000 + (Math.random() * 20) * 100);

}

var greeting = function(){
    return "Hey! I'm Batman"
}

var getMessage = function(msg){
    const url = "http://127.0.0.1:5000/hello";
    fetch(url)
        .then(res=>res.json())
        .then(json => {
            console.log(json);
        })
}



var postData = function(msg) {
    const message = { 'msg': msg };
    fetch('http://127.0.0.1:5000/getmessage', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setMessage(data);
            console.log((returnMessage))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let setMessage = function(msg){
    console.log(msg)
    returnMessage =  msg;
}
