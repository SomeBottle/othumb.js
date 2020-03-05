/*simple thumbviewer -SomeBottle*/
var othumb = {
    filetype: ['png', 'jpeg', 'jpg', 'gif'],
    flag: false,
	css:'.othumb{position:absolute;background:#FAFAFA;box-shadow:0 0 5px #888;border-radius:8px;transition:1s ease;overflow:hidden;opacity:0}',
    s: function() {
		this.a();
		var o = this,
			box = document.getElementById('othumb');
			box.addEventListener('transitionend',o.boxv.bind(o)),
			x = document.getElementsByTagName('a');
        for (var i in x) {
            if (x[i] instanceof Element) {
                
                x[i].addEventListener('mouseover', function(e) {
                    if (o.filetype.indexOf(this.href.split('.').pop()) !== -1) {
                        o.flag = true;
                        var el = this,
                            img = document.getElementById('othumbimg');
						box.style.display='block';
                        setTimeout(function() {
                            if (o.flag) {
                                var bx = e.clientX + 20,
                                    by = e.clientY + 20;
                                box.style.left = bx + 'px';
                                box.style.top = by + 'px';
                                box.style.opacity = 1;
                                img.src = el.href + '?thumbnail=medium';
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
	boxv:function(){
		if(!this.flag){
		    console.log('box hidden');
		    var img = document.getElementById('othumbimg'),
		    box = document.getElementById('othumb');
		    box.style.display='none';
		}
	},
    a: function() {
        var e = document.createElement('div');
        var i = document.createElement('img');
		var c = document.createElement('style');
		c.innerHTML=this.css;
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