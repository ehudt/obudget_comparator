// Generated by CoffeeScript 1.6.1
(function(){var e,t,n,r,i,s,o,u,a,f={}.hasOwnProperty,l=function(e,t){function r(){this.constructor=e}for(var n in t)f.call(t,n)&&(e[n]=t[n]);r.prototype=t.prototype;e.prototype=new r;e.__super__=t.prototype;return e};s=function(e,t){var n,r,i,s,o,u,a;a="";n="";r="";if(e<0){n=" הכנסה של";r="";e=-e}if(e>=1e12){a=" trillion";e/=1e12;t=2}else if(e>=1e9){a=" מיליארד";e/=1e9;t=1}else if(e>=1e6){a=" מיליון";e/=1e6;t=1}s="";if(t>0){e<1&&(s="0");u=String(Math.round(e*Math.pow(10,t)));if(u<10){o="0"+u.substr(u.length-t,t);i=""}else{o=u.substr(u.length-t,t);i=u.substr(0,u.length-t)}return n+s+i.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")+"."+o+a+r}u=String(Math.round(e));u=u.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");return n+u+a+r};t=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}l(t,e);t.prototype.defaults={data:[],field:""};t.prototype.initialize=function(){return this.on("change:field",function(){var e,t;t=this.get("field");e=budget_array_data[t];if(e){console.log("setting field "+t);this.set("data",budget_array_data[t].d);return this.set("title",budget_array_data[t].t)}return console.log("field "+t+" is "+e)})};return t}(Backbone.Model);e=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}l(t,e);t.prototype.getFillColor=function(e){var t;t=d3.scale.ordinal().domain([-3,-2,-1,0,1,2,3]).range(["#ddad13","#eeca7c","#e4d0ae","#AAA","#bfc3dc","#9ea5c8","#7b82c2"]);return e.isNegative?"#fff":t(e.changeCategory)};t.prototype.getStrokeColor=function(e){var t;if(e.name===this.selectedItem)return"#FF0";t=d3.scale.ordinal().domain([-3,-2,-1,0,1,2,3]).range(["#c09100","#e7bd53","#d9c292","#999","#a7aed3","#7f8ab8","#4f5fb0"]);return t(e.changeCategory)};t.prototype.strokeWidth=function(e){console.log(e.name+" <> "+this.selectedItem);return e.name===this.selectedItem?5:1};t.prototype.pctFormat=function(e){var t;t=d3.format(".1%");return e===Infinity||e===-Infinity?"N.A":t(e)};t.prototype.defaultCharge=function(e){return e.value<0?0:-Math.pow(e.radius,2)/8};t.prototype.totalSort=function(e){var t=this;return function(n){var r,i;i=0;r=0;n.isNegative&&(n.changeCategory>0?n.x=-200:n.x=1100);n.y=n.y+(i-n.y)*(t.defaultGravity+.02)*e;return n.x=n.x+(r-n.x)*(t.defaultGravity+.02)*e}};t.prototype.buoyancy=function(e){var t=this;return function(n){var r;r=-(n.changeCategory/3)*t.boundingRadius;return n.y=n.y+(r-n.y)*t.defaultGravity*e*e*e*500}};t.prototype.categorizeChange=function(e){return isNaN(e)?0:e<-0.25?-3:e<-0.05?-2:e<-0.001?-1:e<=.001?0:e<=.05?1:e<=.25?2:3};t.prototype.setOverlayed=function(e){e=e?!0:!1;return e?this.transitiontime=0:this.transitiontime=1e3};t.prototype.initialize=function(e){var t=this;this.options=e;_.bindAll(this);this.width=970;this.height=550;this.id=this.options.id;this.overlayShown=!1;console.log("BubbleChart:initialize",this.id);this.defaultGravity=.1;this.force=this.svg=this.circle=null;this.changeTickValues=[-0.25,-0.15,-0.05,.05,.15,.25];this.centerX=this.width/2;this.centerY=this.height/2;this.model.bind("change:data",function(){return t.updateData(t.model.get("data"))});d3.select(this.el).html("");this.svg=d3.select(this.el).append("svg:svg").attr("width",this.width);this.svg.append("svg:rect").attr("x",-1e3).attr("y",-1e3).attr("width",2e3).attr("height",2e3).attr("opacity",0).on("click",function(){return a()});return console.log("init done",this.id)};t.prototype.updateData=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E;s=[];this.selectedItem=null;c=0;for(p=0,g=e.length;p<g;p++){h=e[p];c+=h.b1}this.totalValue=c!=null?c:4e8;console.log("Totalvalue: "+this.totalValue);if(typeof this!="undefined"&&this!==null?this.nodes:void 0){E=this.nodes;for(d=0,y=E.length;d<y;d++){i=E[d];s.push(i)}}this.nodes=[];this.titles=[];a=d3.scale.pow().exponent(.5).domain([0,this.totalValue]).range([1,200]);f=function(e){return a(Math.abs(e))};this.boundingRadius=f(this.totalValue);n="b1";u="b0";for(v=0,b=e.length;v<b;v++){r=e[v];o=null;l=r.id;for(m=0,w=s.length;m<w;m++){i=s[m];i.sid===l&&(o=i)}o===null&&(o={x:-150+Math.random()*300,y:-150+Math.random()*300});o.sid=r.id;o.code=strings[r.c];o.radius=f(r[n]);o.group=strings[r.p];o.groupvalue=r.pv;o.change=r.c/100;o.changeCategory=this.categorizeChange(r.c/100);o.value=r[n];o.name=strings[r.n];o.isNegative=r[n]<0;o.positions=r.positions;o.drilldown=r.d;this.titles.push(o.name);if(r[n]>0&&r[u]<0){o.changestr="הפך מהכנסה להוצאה";o.changeCategory=3}if(r[n]<0&&r[u]>0){o.changestr="הפך מהוצאה להכנסה";o.changeCategory=3}if(r.c===99999){o.changestr="תוקצב מחדש";o.changeCategory=3}this.nodes.push(o)}this.titles.sort();if(e.length>0)return this.render();t=$("div[data-id='"+this.id+"']");if(this.transitiontime>0){this.circle.transition().duration(this.transitiontime).attr("r",function(e){return 0});return t.find(".overlay").css("opacity",.9).animate({opacity:0},this.transitiontime,function(){return t.remove()})}return t.remove()};t.prototype.showOverlay=function(e){var t,n,r,i,s,o,u,a;if(this.overlayShown)return;this.overlayShown=!0;t=null;a=this.nodes;for(s=0,o=a.length;s<o;s++){u=a[s];u.drilldown===e&&(t=u)}if(t===null)return;r=this.height/t.radius/3;console.log("showOverlay: ",t.radius,this.height,r);n="translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)";i="translate("+this.centerX+","+this.centerY+")rotate(120)translate("+ -t.x*r+","+ -t.y*r+")scale("+r+")";if(this.transitiontime===0)this.svg.selectAll("circle").attr("transform",i);else{this.svg.selectAll("circle").transition().duration(this.transitiontime).attrTween("transform",function(){return d3.interpolateString(n,i)});console.log("TRANSITION "+n+" -> "+i)}return $("#tooltip").hide()};t.prototype.overlayRemoved=function(){var e,t;this.setOverlayed(!1);this.overlayShown=!1;e=this.svg.select("circle").attr("transform");t="translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)";this.svg.selectAll("circle").transition().duration(this.transitiontime).attrTween("transform",function(){return d3.interpolateString(e,t)});return this.circle.attr("r",function(e){return e.radius})};t.prototype.selectItem=function(e){this.selectedItem=e;this.circle.style("stroke-width",this.strokeWidth);return this.circle.style("stroke",this.getStrokeColor)};t.prototype.render=function(){var e,t,r,i,o,u,a,f=this;u=this;a=$("div[data-id='"+this.id+"'] .search");a.typeahead({source:function(){f.selectItem(null);f.selectedItem=null;f.circle.style("stroke-width",f.strokeWidth);f.circle.style("stroke",f.getStrokeColor);return f.titles},updater:function(e){f.selectItem(e);return e}});o=$("div[data-id='"+this.id+"'] .tag");i=!1;o.mouseenter(function(){u.selectItem($(this).text());return i=!1}).mouseleave(function(){if(!i)return u.selectItem(null)}).click(function(){u.selectItem($(this).text());return i=!0});e=$("div[data-id='"+this.id+"'] .overlayContainer");r=$("div[data-id='"+this.id+"'] .overlay");t=$("div[data-id='"+this.id+"'] .frame");console.log("height",t.height());e.css("height",$(this.el).height()+"px");this.transitiontime>0?r.css("opacity",0).animate({opacity:.9},this.transitiontime):r.css("opacity",.9);this.circle=this.svg.selectAll("circle").data(this.nodes,function(e){return e.sid});u=this;this.circle.enter().append("svg:circle").attr("transform","translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)").attr("data-title",function(e){return e.name}).style("stroke-width",this.strokeWidth).style("fill",this.getFillColor).style("stroke",this.getStrokeColor).style("cursor",function(e){return budget_array_data[e.drilldown]?"pointer":"inherit"}).on("click",function(e,t){budget_array_data[e.drilldown]&&n(e.drilldown);return!1}).on("mouseover",function(e,t){var n,r,i,o,a;n=d3.select(this);i=$(u.el).find("svg").position();o=Number(n.attr("cx"))+i.left+u.centerX;a=n.attr("cy")-e.radius-10+i.top+u.centerY;n.style("stroke","#000").style("stroke-width",3);d3.select("#tooltip").style("top",a+"px").style("left",o+"px").style("display","block").classed("plus",e.changeCategory>0).classed("minus",e.changeCategory<0);d3.select("#tooltip .name").html(e.name);d3.select("#tooltip .department").text(e.group);d3.select("#tooltip .value").html(s(e.value*1e3)+" ₪");if(e!=null?e.changestr:void 0)r=e.changestr;else{r=e.change==="N.A."?"N.A":u.pctFormat(Math.abs(e.change));r+=e.change<0?"-":"+"}return d3.select("#tooltip .change").html(r)}).on("mouseout",function(e,t){d3.select(this).style("stroke-width",u.strokeWidth).style("stroke",function(e){return u.getStrokeColor(e)});return d3.select("#tooltip").style("display","none")});if(this.transitiontime>0){console.log("chart "+this.id+" transitioning radius");this.circle.transition().duration(this.transitiontime).attr("r",function(e){return e.radius}).style("fill",function(e){return f.getFillColor(e)}).style("stroke",function(e){return f.getStrokeColor(e)});this.circle.exit().transition().duration(this.transitiontime).attr("r",function(e){return 0}).remove()}else{this.circle.attr("r",function(e){return e.radius}).style("fill",function(e){return f.getFillColor(e)}).style("stroke",function(e){return f.getStrokeColor(e)});this.circle.exit().remove()}this.force!==null&&this.force.stop();return this.force=d3.layout.force().nodes(this.nodes).size([this.width,this.height]).gravity(-0.01).charge(this.defaultCharge).friction(.9).on("tick",function(e){return f.circle.each(f.totalSort(e.alpha)).each(f.buoyancy(e.alpha)).attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y})}).start()};return t}(Backbone.View);u=[];r=[];i=!0;n=function(e){u.push(e);return History.pushState(u,null,"?"+u.join("/"))};a=function(){if(u.length>1){u.pop();return History.pushState(u,null,"?"+u.join("/"))}};o=function(){var n,s,o,a,f,l,c,h,p,d,v,m,g;h=History.getState();u=h.data;console.log("state changed: ",h);for(s=d=0,m=u.length;0<=m?d<m:d>m;s=0<=m?++d:--d){c=u[s];f=u[s+1];o="id"+s;n=$("div[data-id='"+o+"'] .chart");if(n.size()===0){console.log("creating chart "+o);p=_.template($("#chart-template").html(),{id:o});$("#charts").append(p);n=$("div[data-id='"+o+"'] .chart");r[s]=new e({el:n,model:new t,id:o})}}a=u.length>r.length?u.length:r.length;console.log("max: "+a);for(s=v=g=a-1;g<=0?v<=0:v>=0;s=g<=0?++v:--v){console.log("setting field for "+s);if(s>=u.length){console.log("removing chart #"+s);r[s].updateData([]);r.pop();continue}c=u[s];l=!1;if(s<u.length-2||i&&s<u.length-1)l=!0;r[s].setOverlayed(l);r[s].model.set("field",c);s<u.length-1&&r[s].showOverlay(u[s+1])}if(a>u.length&&r.length>0){console.log("chart "+(r.length-1)+": overlay removed");r[r.length-1].overlayRemoved()}return i=!1};document.createElementNS!=null&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect!=null?$(function(){var e,t,n,r;History.Adapter.bind(window,"statechange",o);e=window.location.search.slice(1);e.length===0&&(e="plpsq1");u=e.split("/");console.log("Q",u);if(u.length===1)while(budget_array_data[u[0]]){n=budget_array_data[u[0]].u;if(!n)break;u.unshift(n)}t=History.getState();if(((r=t.data)!=null?r.length:void 0)&&t.data.length>0)o();else{console.log("xxx",t.data.length);History.replaceState(u,null,"?"+u.join("/"));console.log("pushed "+u)}return $(document).keyup(function(e){if(e.keyCode===27)return a()})}):$("#charts").hide()}).call(this);