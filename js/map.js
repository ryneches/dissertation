var w = window.innerWidth - 30;
var h = window.innerHeight - 60;
//var w = 800;
//var h = 400;

var linkDistance = Math.min(w, h) / 3;

var colors = d3.scale.ordinal().range(["#79BED9","#A7E4F2","#618C70","#BFB960","#A6A053"]);
var edgeColor = '#36454F';

var dataset = {
  nodes: [
    /*  0 */ {name: "FishPoo",         url: "https://github.com/ryneches/fishpoo"},
    /*  1 */ {name: "SuchTree",        url: "https://github.com/ryneches/SuchTree"},
    /*  2 */ {name: "DilutionPlates",  url: "https://github.com/ryneches/DilutionPlates"},
    /*  3 */ {name: "SpaceSwabs",      url: ""},
    /*  4 */ {name: "SpaceGrowth",     url: "https://peerj.com/articles/1842/"},
    /*  5 */ {name: "ShoePhone",       url: ""},
    /*  6 */ {name: "NMF",             url: "http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0043866"},
    /*  7 */ {name: "Chagos",          url: "http://www.nature.com/articles/srep15383"},
    /*  8 */ {name: "IndigoV",         url: "http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001947"},
    /*  9 */ {name: "FishJaws",        url: "http://science.sciencemag.org/content/350/6264/1077"},
    /* 10 */ {name: "uLakes",          url: "http://onlinelibrary.wiley.com/doi/10.1111/mec.13463/full"},
    /* 11 */ {name: "Pique",           url: "https://peerj.com/preprints/290/"},
    /* 12 */ {name: "SaltyBugs",       url: "http://nar.oxfordjournals.org/content/40/10/e74.full"},
    /* 13 */ {name: "SterilePrinting", url: "https://peerj.com/articles/2661/"},
    /* 14 */ {name: "Shand",           url: "https://github.com/ryneches/Shand/"}
  ],
  edges: [
    // cichlids
    {source: 0,  target: 1,  name: 'cichlids'},
    {source: 0,  target: 9,  name: 'cichlids'},
    {source: 0,  target: 10, name: 'cichlids'},
    {source: 1,  target: 10, name: 'cichlids'},
    {source: 1,  target: 9,  name: 'cichlids'},
    {source: 0,  target: 14, name: 'cichlids'},
    {source: 1,  target: 14, name: 'cichlids'},
    // trait matrixes
    {source: 1,  target: 6,  name: 'trait matrixes'},
    {source: 0,  target: 6,  name: 'trait matrixes'},
    {source: 1,  target: 0,  name: 'trait matrixes'},
    {source: 9,  target: 6,  name: 'trait matrixes'},
    {source: 9,  target: 1,  name: 'trait matrixes'},
    {source: 9,  target: 0,  name: 'trait matrixes'},
    // software tools
    {source: 1,  target: 11, name: 'software tools'},
    {source: 1,  target: 2,  name: 'software tools'},
    {source: 14, target: 1,  name: 'software tools'},
    // lab methods
    {source: 13,  target: 2, name: 'lab methods'},
    // hardware
    {source: 2,  target: 7,  name: 'hardware'},
    {source: 2,  target: 8,  name: 'hardware'},
    {source: 4,  target: 2,  name: 'hardware'},
    {source: 4,  target: 8,  name: 'hardware'},
    {source: 4,  target: 13, name: 'hardware'},
    // 3D printing
    {source: 2,  target: 13, name: '3D printing'},
    {source: 8,  target: 2,  name: '3D printing'},
    {source: 2,  target: 9,  name: '3D printing'},
    // ocean
    {source: 6,  target: 7,  name: 'ocean'},
    {source: 6,  target: 8,  name: 'ocean'},
    {source: 7,  target: 8,  name: 'ocean'},
    // ChIP-seq
    {source: 11, target: 12, name: 'ChIP-seq'},
    // genomes
    {source: 12, target: 10, name: 'genomes'},
    // space
    {source: 3,  target: 5,  name: 'space'},
    {source: 3,  target: 4,  name: 'space'},
    {source: 3,  target: 5,  name: 'space'},
    // 16S
    {source: 5,  target: 3,  name: '16S'},
    {source: 5,  target: 0,  name: '16S'},
  ]
};


var svg = d3.select("body").append("svg").attr({"width":w,"height":h});

/*
var svg = d3.select("body")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 1000")
    //class to make it responsive
    .classed("svg-content-responsive", true); 
*/

var force = d3.layout.force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([w,h])
    .linkDistance([linkDistance])
    .charge([-500])
    .theta(0.1)
    .gravity(0.05)
    .start();

var edges = svg.selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .attr("id",function(d,i) {return 'edge'+i})
    //.attr('marker-end','url(#arrowhead)')
    .style("stroke",edgeColor)
    .style("stroke-width",2)
    .style("pointer-events", "none");

var edgepaths = svg.selectAll(".edgepath")
    .data(dataset.edges)
    .enter()
    .append('path')
    .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
           'class':'edgepath',
           'fill':'blue',
           'fill-opacity':0,
           'stroke':'red',
           'stroke-opacity':0,
           'id':function(d,i) {return 'edgepath'+i}})
    .style("pointer-events", "none");

var edgelabels = svg.selectAll(".edgelabel")
    .data(dataset.edges)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr({'class':'edgelabel',
           'id':function(d,i) {return 'edgelabel'+i},
           'dx':60,
           'dy':-5,
           'font-size':'10pt',
           'fill':edgeColor});

edgelabels.append('textPath')
    .attr('xlink:href',function(d,i) {return '#edgepath'+i})
    .style("pointer-events", "none")
    .text(function(d,i){return d.name});

svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
           'viewBox':'-0 -5 10 10',
           'refX':25,
           'refY':0,
           //'markerUnits':'strokeWidth',
           'orient':'auto',
           'markerWidth':10,
           'markerHeight':10,
           'xoverflow':'visible'})
    .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#ccc')
        .attr('stroke','#ccc');
 

var nodes = svg.selectAll("circle")
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr({"r":25,
           "id":function(d,i) {return 'node'+i}, })
    .style("fill",function(d,i){return colors(i);})
    .call(force.drag)

var nodelabels = svg.selectAll(".nodelabel") 
    .data(dataset.nodes)
    .enter()
    .append("a").attr({"href":function(d){return d.url;}})
    .append("text")
    .attr({"x":function(d){return d.x;},
           "y":function(d){return d.y;},
           "dx":-5,
           "dy":4,
           "class":"nodelabel",
           "stroke":"black"})
    .text(function(d){return d.name;});

force.on("tick", function(){

    edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
    });

    nodes.attr({"cx":function(d){return d.x;},
                "cy":function(d){return d.y;}
    });

    nodelabels.attr("x", function(d) { return d.x; }) 
              .attr("y", function(d) { return d.y; });

    edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                       //console.log(d)
                                       return path});       

    edgelabels.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
            }
        else {
            return 'rotate(0)';
            }
    });
});
