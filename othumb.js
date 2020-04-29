/*simple thumbviewer -SomeBottle*/
var othumb = {
    filetype: ['png', 'jpeg', 'jpg', 'gif', 'webp'],
    flag: false,
    css: '.othumb{position:absolute;background:#FAFAFA;box-shadow:0 0 5px #888;border-radius:8px;transition:1s ease;overflow:hidden;opacity:0}',
    parser: function(hf) {
        var o = this,
            ft = o.filetype,
            rt = {
                found: false
            };
        for (var i in ft) {
            if (hf.indexOf(ft[i]) !== -1) {
                rt.found = true;
                var suffix = ft[i],
                    left = hf.split(suffix)[0];
                var u = left.split('/'),
                    fname = u.pop();
                rt.file = fname + suffix;
                var dc = u.join('/');
                rt.directory = dc + '/';
                break;
            }
        }
        return rt;
    },
    s: function() {
        this.a();
        var o = this,
            box = document.getElementById('othumb');
        box.addEventListener('transitionend', o.boxv.bind(o)),
            x = document.getElementsByTagName('a');
        for (var i in x) {
            if (x[i] instanceof Element) {
                x[i].addEventListener('mouseover', function(e) {
                    var parsed = o.parser(this.href);
                    if (parsed.found) {
                        o.flag = true;
                        var el = this,
                            img = document.getElementById('othumbimg');
                        box.style.display = 'block';
                        setTimeout(function() {
                            if (o.flag) {
                                var bx = e.clientX + window.scrollX + 20,
                                    by = e.clientY + window.scrollY + 20,
                                    rq = el.href.split('?');
                                box.style.left = bx + 'px';
                                box.style.top = by + 'px';
                                box.style.opacity = 1;
                                rq.length > 1 ? rq.pop() : rq = rq;
                                img.src = parsed.directory + parsed.file + '?thumbnail=medium';
                            }
                        }, 1500);
                    }
                });
                x[i].addEventListener('mouseout', function(e) {
                    var box = document.getElementById('othumb');
                    box.style.opacity = 0;
                    o.flag = false;
                });
            }
        }
    },
    boxv: function() {
        if (!this.flag) {
            console.log('box hidden');
            var img = document.getElementById('othumbimg'),
                box = document.getElementById('othumb');
            box.style.display = 'none';
        }
    },
    a: function() {
        var e = document.createElement('div');
        var i = document.createElement('img');
        var c = document.createElement('style');
        c.innerHTML = this.css;
        i.id = 'othumbimg';
        i.style.maxWidth = '500px';
        e.className = 'othumb';
        e.id = 'othumb';
        e.appendChild(i);
        document.body.appendChild(e);
        document.body.appendChild(c);
    }
};
othumb.s();