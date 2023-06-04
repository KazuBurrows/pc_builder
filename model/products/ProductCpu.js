String.prototype.format = function () {
  var a = this;
  if (a == undefined) {
    a = null;
  }
  for (var k in arguments) {
      a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
  }
  return a
}


class MyCpu
{
  constructor(name, brand, core_count, core_clock, tdp, link_ID) {
    this.type = "CPU";
    this.name = name;
    this.brand = brand;
    this.core_count = core_count;
    this.core_clock = core_clock;
    this.tdp = tdp;
    this.link_ID = link_ID;
  }


  static class(obj) {
    return new MyCpu(
      obj.name,
      obj.brand,
      obj.core_count,
      obj.core_clock,
      obj.tdp, obj.tdp,
      obj.link_ID);
  }


  /**
   * "Format cpu object to string"
   * @returns {string} "Cpu object formatted for sql insert query"
   */
  sql_format()
  {

    return "'{0}', '{1}', '{2}', '{3}', '{4}', '{5}'".format(
      this.name,
      this.brand,
      this.core_count,
      this.core_clock,
      this.tdp,
      this.link_ID
    );
  }

}


exports.MyCpu = MyCpu;
