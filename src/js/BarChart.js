import d3 from './d3.js';

export default class BarChart {

  constructor(opts) {
    const self = this;
    self.el = d3.select(opts.el);
    self.city = opts.city;
    self.data = opts.data.filter(d => d.city == self.city);
    this.margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5
    };

    this.width = parseInt(this.el.style('width')) - this.margin.left - this.margin.right;
    this.height = parseInt(this.el.style('width')) * 0.4 - this.margin.top - this.margin.bottom;

    this.draw();

    window.addEventListener("resize", () => {
      this.resize()
    })
  }
  draw() {
    // moves the 'group' element to the top left margin
    this.el.html("");
    this.svg = this.el.append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr("class", "bar-svg");

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3.scaleLinear().range([this.width, 0]);
    this.y = d3.scaleBand().rangeRound([0, this.height]).padding(0.1);


    // Scale the range of the data
    this.x.domain([0, d3.max(this.data, d => d.amount)]);
    this.y.domain(this.data.map(d => d.contribution));

    this.g.selectAll("rect")
      .data(this.data)
      .enter().append("rect")
      .attr("x", d => this.x(d.amount))
      .attr("y", d => this.y(d.contribution))
      .attr("height", this.y.bandwidth())
      .attr("width", d => this.width - this.x(d.amount))
      .attr("class", "rect")
      .style("opacity", 0.9);

    this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x).ticks(5));

    this.g.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(this.y));

    this.g.select('.y.axis')
      .selectAll('text')
      .attr('x', 10)


  }
  numberFormat(d) {
    return d3.format(',')(d);
  }
  enter(duration = 300) {

  }
  exit() {

  }
  resize() {
    this.width = parseInt(this.el.style('width')) - this.margin.left - this.margin.right;
    this.height = parseInt(this.el.style('width')) * 0.6 - this.margin.top - this.margin.bottom;

    this.draw();

  }
}