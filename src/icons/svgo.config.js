const { extendDefaultPlugins } = require('svgo')
module.exports = {
  plugins: extendDefaultPlugins([
    { name: 'removeXMLNS' },
    { name: 'sortAttrs' },
    { name: 'removeDimensions' },
    { name: 'removeXMLNS' },
    { name: 'removeViewBox', active: true },
    { name: 'removeAttrs', params: { attrs: '(fill|fill-rule|clip-rule)' } },
    { name: 'removeUselessStrokeAndFill' },
    {
      name: 'addAttributesToSVGElement',
      params: { attributes: [{ fill: 'currentColor' }] }
    }
  ])
}

// module.exports = {
//   plugins: [
//     // "preset_default",
//     // or
//     {
//       name: "preset-default",
//       floatPrecision: 4,
//       overrides: {
//         convertPathData: {
//           applyTransforms: false,
//         },
//         addAttributesToSVGElement: {
//           params: { attrs: { fill: "currentColor" } },
//         },
//       },
//     },
//   ],
// };
