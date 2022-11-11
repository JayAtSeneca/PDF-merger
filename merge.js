const PDFMerger = require('pdf-merger-js');
var merger = new PDFMerger();

module.exports.mergePdfs = async (p1,p2) => {
  let d = new Date().getTime();
  await merger.add(p1);
  await merger.add(p2);
  await merger.save(`public/data/${d}.pdf`);
  return d;
};