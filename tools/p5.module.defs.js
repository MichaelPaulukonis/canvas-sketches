module.exports = {
  describe: {
    name: 'describe',
    params: [
      {
        name: 'text',
        description: '<p>description of the canvas</p>\n',
        type: 'String'
      },
      {
        name: 'display',
        description: '<p>either LABEL or FALLBACK</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  describeElement: {
    name: 'describeElement',
    params: [
      {
        name: 'name',
        description: '<p>name of the element</p>\n',
        type: 'String'
      },
      {
        name: 'text',
        description: '<p>description of the element</p>\n',
        type: 'String'
      },
      {
        name: 'display',
        description: '<p>either LABEL or FALLBACK</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  textOutput: {
    name: 'textOutput',
    params: [
      {
        name: 'display',
        description: '<p>either FALLBACK or LABEL</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  gridOutput: {
    name: 'gridOutput',
    params: [
      {
        name: 'display',
        description: '<p>either FALLBACK or LABEL</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  alpha: {
    name: 'alpha',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  blue: {
    name: 'blue',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  brightness: {
    name: 'brightness',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  color: {
    name: 'color',
    class: 'p5',
    module: 'Color',
    overloads: [
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between white and black.</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current color range\n                                (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>a color string</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ]
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color'
          }
        ]
      }
    ]
  },
  green: {
    name: 'green',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  hue: {
    name: 'hue',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  lerpColor: {
    name: 'lerpColor',
    params: [
      {
        name: 'c1',
        description: '<p>interpolate from this color</p>\n',
        type: 'p5.Color'
      },
      {
        name: 'c2',
        description: '<p>interpolate to this color</p>\n',
        type: 'p5.Color'
      },
      {
        name: 'amt',
        description: '<p>number between 0 and 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  lightness: {
    name: 'lightness',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  red: {
    name: 'red',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  saturation: {
    name: 'saturation',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  background: {
    name: 'background',
    class: 'p5',
    module: 'Color',
    overloads: [
      {
        params: [
          {
            name: 'color',
            description:
              '<p>any value created by the <a href="#/p5/color">color()</a> function</p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'colorstring',
            description:
              '<p>color string, possible formats include: integer\n                        rgb() or rgba(), percentage rgb() or rgba(),\n                        3-digit hex, 6-digit hex</p>\n',
            type: 'String'
          },
          {
            name: 'a',
            description:
              '<p>opacity of the background relative to current\n                            color range (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description: '<p>specifies a value between white and black</p>\n',
            type: 'Number'
          },
          {
            name: 'a',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value (depending on the current color\n                       mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value (depending on the current\n                       color mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value (depending on the current\n                       color mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'a',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red, green, blue\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'image',
            description:
              '<p>image created with <a href="#/p5/loadImage">loadImage()</a> or <a href="#/p5/createImage">createImage()</a>,\n                            to set as background\n                            (must be same size as the sketch window)</p>\n',
            type: 'p5.Image'
          },
          {
            name: 'a',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  clear: {
    name: 'clear',
    params: [
      {
        name: 'r',
        description: '<p>normalized red val.</p>\n',
        type: 'Number'
      },
      {
        name: 'g',
        description: '<p>normalized green val.</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>normalized blue val.</p>\n',
        type: 'Number'
      },
      {
        name: 'a',
        description: '<p>normalized alpha val.</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  colorMode: {
    name: 'colorMode',
    class: 'p5',
    module: 'Color',
    overloads: [
      {
        params: [
          {
            name: 'mode',
            description:
              '<p>either RGB, HSB or HSL, corresponding to\n                         Red/Green/Blue and Hue/Saturation/Brightness\n                         (or Lightness)</p>\n',
            type: 'Constant'
          },
          {
            name: 'max',
            description: '<p>range for all values</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'mode',
            description: '',
            type: 'Constant'
          },
          {
            name: 'max1',
            description:
              '<p>range for the red or hue depending on the\n                             current color mode</p>\n',
            type: 'Number'
          },
          {
            name: 'max2',
            description:
              '<p>range for the green or saturation depending\n                             on the current color mode</p>\n',
            type: 'Number'
          },
          {
            name: 'max3',
            description:
              '<p>range for the blue or brightness/lightness\n                             depending on the current color mode</p>\n',
            type: 'Number'
          },
          {
            name: 'maxA',
            description: '<p>range for the alpha</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  fill: {
    name: 'fill',
    class: 'p5',
    module: 'Color',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>a color string</p>\n',
            type: 'String'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description: '<p>a gray value</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description: '<p>the fill color</p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  noFill: {
    name: 'noFill',
    class: 'p5',
    module: 'Color'
  },
  noStroke: {
    name: 'noStroke',
    class: 'p5',
    module: 'Color'
  },
  stroke: {
    name: 'stroke',
    class: 'p5',
    module: 'Color',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>a color string</p>\n',
            type: 'String'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description: '<p>a gray value</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description: '<p>the stroke color</p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  erase: {
    name: 'erase',
    params: [
      {
        name: 'strengthFill',
        description:
          "<p>A number (0-255) for the strength of erasing for a shape's fill.\n                                       This will default to 255 when no argument is given, which\n                                       is full strength.</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'strengthStroke',
        description:
          "<p>A number (0-255) for the strength of erasing for a shape's stroke.\n                                       This will default to 255 when no argument is given, which\n                                       is full strength.</p>\n",
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Color'
  },
  noErase: {
    name: 'noErase',
    class: 'p5',
    module: 'Color'
  },
  arc: {
    name: 'arc',
    params: [
      {
        name: 'x',
        description: "<p>x-coordinate of the arc's ellipse</p>\n",
        type: 'Number'
      },
      {
        name: 'y',
        description: "<p>y-coordinate of the arc's ellipse</p>\n",
        type: 'Number'
      },
      {
        name: 'w',
        description: "<p>width of the arc's ellipse by default</p>\n",
        type: 'Number'
      },
      {
        name: 'h',
        description: "<p>height of the arc's ellipse by default</p>\n",
        type: 'Number'
      },
      {
        name: 'start',
        description: '<p>angle to start the arc, specified in radians</p>\n',
        type: 'Number'
      },
      {
        name: 'stop',
        description: '<p>angle to stop the arc, specified in radians</p>\n',
        type: 'Number'
      },
      {
        name: 'mode',
        description:
          '<p>optional parameter to determine the way of drawing\n                        the arc. either CHORD, PIE or OPEN</p>\n',
        type: 'Constant',
        optional: true
      },
      {
        name: 'detail',
        description:
          "<p>optional parameter for WebGL mode only. This is to\n                        specify the number of vertices that makes up the\n                        perimeter of the arc. Default value is 25. Won't\n                        draw a stroke for a detail of more than 50.</p>\n",
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  ellipse: {
    name: 'ellipse',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>x-coordinate of the center of the ellipse.</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y-coordinate of the center of the ellipse.</p>\n',
            type: 'Number'
          },
          {
            name: 'w',
            description: '<p>width of the ellipse.</p>\n',
            type: 'Number'
          },
          {
            name: 'h',
            description: '<p>height of the ellipse.</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'w',
            description: '',
            type: 'Number'
          },
          {
            name: 'h',
            description: '',
            type: 'Number'
          },
          {
            name: 'detail',
            description:
              "<p>optional parameter for WEBGL mode only. This is to\n                        specify the number of vertices that makes up the\n                        perimeter of the ellipse. Default value is 25. Won't\n                        draw a stroke for a detail of more than 50.</p>\n",
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  circle: {
    name: 'circle',
    params: [
      {
        name: 'x',
        description: '<p>x-coordinate of the center of the circle.</p>\n',
        type: 'Number'
      },
      {
        name: 'y',
        description: '<p>y-coordinate of the center of the circle.</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>diameter of the circle.</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  line: {
    name: 'line',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x1',
            description: '<p>the x-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '<p>the y-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '<p>the x-coordinate of the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>the y-coordinate of the second point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x1',
            description: '',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '',
            type: 'Number'
          },
          {
            name: 'z1',
            description: '<p>the z-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description: '<p>the z-coordinate of the second point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  point: {
    name: 'point',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>the x-coordinate</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>the y-coordinate</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>the z-coordinate (for WebGL mode)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'coordinate_vector',
            description: '<p>the coordinate vector</p>\n',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      }
    ]
  },
  quad: {
    name: 'quad',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x1',
            description: '<p>the x-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '<p>the y-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '<p>the x-coordinate of the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>the y-coordinate of the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '<p>the x-coordinate of the third point</p>\n',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '<p>the y-coordinate of the third point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '<p>the x-coordinate of the fourth point</p>\n',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '<p>the y-coordinate of the fourth point</p>\n',
            type: 'Number'
          },
          {
            name: 'detailX',
            description: '<p>number of segments in the x-direction</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'detailY',
            description: '<p>number of segments in the y-direction</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x1',
            description: '',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '',
            type: 'Number'
          },
          {
            name: 'z1',
            description: '<p>the z-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description: '<p>the z-coordinate of the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '',
            type: 'Number'
          },
          {
            name: 'z3',
            description: '<p>the z-coordinate of the third point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '',
            type: 'Number'
          },
          {
            name: 'z4',
            description: '<p>the z-coordinate of the fourth point</p>\n',
            type: 'Number'
          },
          {
            name: 'detailX',
            description: '',
            type: 'Integer',
            optional: true
          },
          {
            name: 'detailY',
            description: '',
            type: 'Integer',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  rect: {
    name: 'rect',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>x-coordinate of the rectangle.</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y-coordinate of the rectangle.</p>\n',
            type: 'Number'
          },
          {
            name: 'w',
            description: '<p>width of the rectangle.</p>\n',
            type: 'Number'
          },
          {
            name: 'h',
            description: '<p>height of the rectangle.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'tl',
            description: '<p>optional radius of top-left corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'tr',
            description: '<p>optional radius of top-right corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'br',
            description: '<p>optional radius of bottom-right corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'bl',
            description: '<p>optional radius of bottom-left corner.</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'w',
            description: '',
            type: 'Number'
          },
          {
            name: 'h',
            description: '',
            type: 'Number'
          },
          {
            name: 'detailX',
            description:
              '<p>number of segments in the x-direction (for WebGL mode)</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'detailY',
            description:
              '<p>number of segments in the y-direction (for WebGL mode)</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  square: {
    name: 'square',
    params: [
      {
        name: 'x',
        description: '<p>x-coordinate of the square.</p>\n',
        type: 'Number'
      },
      {
        name: 'y',
        description: '<p>y-coordinate of the square.</p>\n',
        type: 'Number'
      },
      {
        name: 's',
        description: '<p>side size of the square.</p>\n',
        type: 'Number'
      },
      {
        name: 'tl',
        description: '<p>optional radius of top-left corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'tr',
        description: '<p>optional radius of top-right corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'br',
        description: '<p>optional radius of bottom-right corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'bl',
        description: '<p>optional radius of bottom-left corner.</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  triangle: {
    name: 'triangle',
    params: [
      {
        name: 'x1',
        description: '<p>x-coordinate of the first point</p>\n',
        type: 'Number'
      },
      {
        name: 'y1',
        description: '<p>y-coordinate of the first point</p>\n',
        type: 'Number'
      },
      {
        name: 'x2',
        description: '<p>x-coordinate of the second point</p>\n',
        type: 'Number'
      },
      {
        name: 'y2',
        description: '<p>y-coordinate of the second point</p>\n',
        type: 'Number'
      },
      {
        name: 'x3',
        description: '<p>x-coordinate of the third point</p>\n',
        type: 'Number'
      },
      {
        name: 'y3',
        description: '<p>y-coordinate of the third point</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  ellipseMode: {
    name: 'ellipseMode',
    params: [
      {
        name: 'mode',
        description: '<p>either CENTER, RADIUS, CORNER, or CORNERS</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  noSmooth: {
    name: 'noSmooth',
    class: 'p5',
    module: 'Shape'
  },
  rectMode: {
    name: 'rectMode',
    params: [
      {
        name: 'mode',
        description: '<p>either CORNER, CORNERS, CENTER, or RADIUS</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  smooth: {
    name: 'smooth',
    class: 'p5',
    module: 'Shape'
  },
  strokeCap: {
    name: 'strokeCap',
    params: [
      {
        name: 'cap',
        description: '<p>either ROUND, SQUARE or PROJECT</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  strokeJoin: {
    name: 'strokeJoin',
    params: [
      {
        name: 'join',
        description: '<p>either MITER, BEVEL, ROUND</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  strokeWeight: {
    name: 'strokeWeight',
    params: [
      {
        name: 'weight',
        description: '<p>the weight of the stroke (in pixels)</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  bezier: {
    name: 'bezier',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x1',
            description: '<p>x-coordinate for the first anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '<p>y-coordinate for the first anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '<p>x-coordinate for the first control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>y-coordinate for the first control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '<p>x-coordinate for the second control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '<p>y-coordinate for the second control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '<p>x-coordinate for the second anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '<p>y-coordinate for the second anchor point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x1',
            description: '',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '',
            type: 'Number'
          },
          {
            name: 'z1',
            description: '<p>z-coordinate for the first anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description: '<p>z-coordinate for the first control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '',
            type: 'Number'
          },
          {
            name: 'z3',
            description: '<p>z-coordinate for the second control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '',
            type: 'Number'
          },
          {
            name: 'z4',
            description: '<p>z-coordinate for the second anchor point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  bezierDetail: {
    name: 'bezierDetail',
    params: [
      {
        name: 'detail',
        description: '<p>resolution of the curves</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  bezierPoint: {
    name: 'bezierPoint',
    params: [
      {
        name: 'a',
        description: '<p>coordinate of first point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>coordinate of first control point</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description: '<p>coordinate of second control point</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>coordinate of second point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 't',
        description: '<p>value between 0 and 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  bezierTangent: {
    name: 'bezierTangent',
    params: [
      {
        name: 'a',
        description: '<p>coordinate of first point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>coordinate of first control point</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description: '<p>coordinate of second control point</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>coordinate of second point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 't',
        description: '<p>value between 0 and 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  curve: {
    name: 'curve',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x1',
            description:
              '<p>x-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description:
              '<p>y-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '<p>x-coordinate for the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>y-coordinate for the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '<p>x-coordinate for the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '<p>y-coordinate for the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '<p>x-coordinate for the ending control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '<p>y-coordinate for the ending control point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x1',
            description: '',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '',
            type: 'Number'
          },
          {
            name: 'z1',
            description:
              '<p>z-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description: '<p>z-coordinate for the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '',
            type: 'Number'
          },
          {
            name: 'z3',
            description: '<p>z-coordinate for the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '',
            type: 'Number'
          },
          {
            name: 'z4',
            description: '<p>z-coordinate for the ending control point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  curveDetail: {
    name: 'curveDetail',
    params: [
      {
        name: 'resolution',
        description: '<p>resolution of the curves</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  curveTightness: {
    name: 'curveTightness',
    params: [
      {
        name: 'amount',
        description:
          '<p>amount of deformation from the original vertices</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  curvePoint: {
    name: 'curvePoint',
    params: [
      {
        name: 'a',
        description: '<p>coordinate of first control point of the curve</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>coordinate of first point</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description: '<p>coordinate of second point</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>coordinate of second control point</p>\n',
        type: 'Number'
      },
      {
        name: 't',
        description: '<p>value between 0 and 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  curveTangent: {
    name: 'curveTangent',
    params: [
      {
        name: 'a',
        description: '<p>coordinate of first control point</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>coordinate of first point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description: '<p>coordinate of second point on the curve</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>coordinate of second conrol point</p>\n',
        type: 'Number'
      },
      {
        name: 't',
        description: '<p>value between 0 and 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  beginContour: {
    name: 'beginContour',
    class: 'p5',
    module: 'Shape'
  },
  beginShape: {
    name: 'beginShape',
    params: [
      {
        name: 'kind',
        description:
          '<p>either POINTS, LINES, TRIANGLES, TRIANGLE_FAN\n                               TRIANGLE_STRIP, QUADS, QUAD_STRIP or TESS</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  bezierVertex: {
    name: 'bezierVertex',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x2',
            description: '<p>x-coordinate for the first control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>y-coordinate for the first control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '<p>x-coordinate for the second control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '<p>y-coordinate for the second control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '<p>x-coordinate for the anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '<p>y-coordinate for the anchor point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description:
              '<p>z-coordinate for the first control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '',
            type: 'Number'
          },
          {
            name: 'z3',
            description:
              '<p>z-coordinate for the second control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'x4',
            description: '',
            type: 'Number'
          },
          {
            name: 'y4',
            description: '',
            type: 'Number'
          },
          {
            name: 'z4',
            description:
              '<p>z-coordinate for the anchor point (for WebGL mode)</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  curveVertex: {
    name: 'curveVertex',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>x-coordinate of the vertex</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y-coordinate of the vertex</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>z-coordinate of the vertex (for WebGL mode)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  endContour: {
    name: 'endContour',
    class: 'p5',
    module: 'Shape'
  },
  endShape: {
    name: 'endShape',
    params: [
      {
        name: 'mode',
        description: '<p>use CLOSE to close the shape</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  quadraticVertex: {
    name: 'quadraticVertex',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'cx',
            description: '<p>x-coordinate for the control point</p>\n',
            type: 'Number'
          },
          {
            name: 'cy',
            description: '<p>y-coordinate for the control point</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '<p>x-coordinate for the anchor point</p>\n',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '<p>y-coordinate for the anchor point</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'cx',
            description: '',
            type: 'Number'
          },
          {
            name: 'cy',
            description: '',
            type: 'Number'
          },
          {
            name: 'cz',
            description:
              '<p>z-coordinate for the control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'x3',
            description: '',
            type: 'Number'
          },
          {
            name: 'y3',
            description: '',
            type: 'Number'
          },
          {
            name: 'z3',
            description:
              '<p>z-coordinate for the anchor point (for WebGL mode)</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  vertex: {
    name: 'vertex',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>x-coordinate of the vertex</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y-coordinate of the vertex</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description:
              '<p>z-coordinate of the vertex.\n                      Defaults to 0 if not specified.</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'u',
            description: "<p>the vertex's texture u-coordinate</p>\n",
            type: 'Number',
            optional: true
          },
          {
            name: 'v',
            description: "<p>the vertex's texture v-coordinate</p>\n",
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  normal: {
    name: 'normal',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'vector',
            description: '<p>A p5.Vector representing the vertex normal.</p>\n',
            type: 'Vector'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'x',
            description: '<p>The x component of the vertex normal.</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>The y component of the vertex normal.</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>The z component of the vertex normal.</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  VERSION: {
    name: 'VERSION',
    class: 'p5',
    module: 'Constants'
  },
  P2D: {
    name: 'P2D',
    class: 'p5',
    module: 'Constants'
  },
  WEBGL: {
    name: 'WEBGL',
    class: 'p5',
    module: 'Constants'
  },
  ARROW: {
    name: 'ARROW',
    class: 'p5',
    module: 'Constants'
  },
  CROSS: {
    name: 'CROSS',
    class: 'p5',
    module: 'Constants'
  },
  HAND: {
    name: 'HAND',
    class: 'p5',
    module: 'Constants'
  },
  MOVE: {
    name: 'MOVE',
    class: 'p5',
    module: 'Constants'
  },
  TEXT: {
    name: 'TEXT',
    class: 'p5',
    module: 'Constants'
  },
  WAIT: {
    name: 'WAIT',
    class: 'p5',
    module: 'Constants'
  },
  HALF_PI: {
    name: 'HALF_PI',
    class: 'p5',
    module: 'Constants'
  },
  PI: {
    name: 'PI',
    class: 'p5',
    module: 'Constants'
  },
  QUARTER_PI: {
    name: 'QUARTER_PI',
    class: 'p5',
    module: 'Constants'
  },
  TAU: {
    name: 'TAU',
    class: 'p5',
    module: 'Constants'
  },
  TWO_PI: {
    name: 'TWO_PI',
    class: 'p5',
    module: 'Constants'
  },
  DEGREES: {
    name: 'DEGREES',
    class: 'p5',
    module: 'Constants'
  },
  RADIANS: {
    name: 'RADIANS',
    class: 'p5',
    module: 'Constants'
  },
  CORNER: {
    name: 'CORNER',
    class: 'p5',
    module: 'Constants'
  },
  CORNERS: {
    name: 'CORNERS',
    class: 'p5',
    module: 'Constants'
  },
  RADIUS: {
    name: 'RADIUS',
    class: 'p5',
    module: 'Constants'
  },
  RIGHT: {
    name: 'RIGHT',
    class: 'p5',
    module: 'Constants'
  },
  LEFT: {
    name: 'LEFT',
    class: 'p5',
    module: 'Constants'
  },
  CENTER: {
    name: 'CENTER',
    class: 'p5',
    module: 'Constants'
  },
  TOP: {
    name: 'TOP',
    class: 'p5',
    module: 'Constants'
  },
  BOTTOM: {
    name: 'BOTTOM',
    class: 'p5',
    module: 'Constants'
  },
  BASELINE: {
    name: 'BASELINE',
    class: 'p5',
    module: 'Constants'
  },
  POINTS: {
    name: 'POINTS',
    class: 'p5',
    module: 'Constants'
  },
  LINES: {
    name: 'LINES',
    class: 'p5',
    module: 'Constants'
  },
  LINE_STRIP: {
    name: 'LINE_STRIP',
    class: 'p5',
    module: 'Constants'
  },
  LINE_LOOP: {
    name: 'LINE_LOOP',
    class: 'p5',
    module: 'Constants'
  },
  TRIANGLES: {
    name: 'TRIANGLES',
    class: 'p5',
    module: 'Constants'
  },
  TRIANGLE_FAN: {
    name: 'TRIANGLE_FAN',
    class: 'p5',
    module: 'Constants'
  },
  TRIANGLE_STRIP: {
    name: 'TRIANGLE_STRIP',
    class: 'p5',
    module: 'Constants'
  },
  QUADS: {
    name: 'QUADS',
    class: 'p5',
    module: 'Constants'
  },
  QUAD_STRIP: {
    name: 'QUAD_STRIP',
    class: 'p5',
    module: 'Constants'
  },
  TESS: {
    name: 'TESS',
    class: 'p5',
    module: 'Constants'
  },
  CLOSE: {
    name: 'CLOSE',
    class: 'p5',
    module: 'Constants'
  },
  OPEN: {
    name: 'OPEN',
    class: 'p5',
    module: 'Constants'
  },
  CHORD: {
    name: 'CHORD',
    class: 'p5',
    module: 'Constants'
  },
  PIE: {
    name: 'PIE',
    class: 'p5',
    module: 'Constants'
  },
  PROJECT: {
    name: 'PROJECT',
    class: 'p5',
    module: 'Constants'
  },
  SQUARE: {
    name: 'SQUARE',
    class: 'p5',
    module: 'Constants'
  },
  ROUND: {
    name: 'ROUND',
    class: 'p5',
    module: 'Constants'
  },
  BEVEL: {
    name: 'BEVEL',
    class: 'p5',
    module: 'Constants'
  },
  MITER: {
    name: 'MITER',
    class: 'p5',
    module: 'Constants'
  },
  RGB: {
    name: 'RGB',
    class: 'p5',
    module: 'Constants'
  },
  HSB: {
    name: 'HSB',
    class: 'p5',
    module: 'Constants'
  },
  HSL: {
    name: 'HSL',
    class: 'p5',
    module: 'Constants'
  },
  AUTO: {
    name: 'AUTO',
    class: 'p5',
    module: 'Constants'
  },
  ALT: {
    name: 'ALT',
    class: 'p5',
    module: 'Constants'
  },
  BACKSPACE: {
    name: 'BACKSPACE',
    class: 'p5',
    module: 'Constants'
  },
  CONTROL: {
    name: 'CONTROL',
    class: 'p5',
    module: 'Constants'
  },
  DELETE: {
    name: 'DELETE',
    class: 'p5',
    module: 'Constants'
  },
  DOWN_ARROW: {
    name: 'DOWN_ARROW',
    class: 'p5',
    module: 'Constants'
  },
  ENTER: {
    name: 'ENTER',
    class: 'p5',
    module: 'Constants'
  },
  ESCAPE: {
    name: 'ESCAPE',
    class: 'p5',
    module: 'Constants'
  },
  LEFT_ARROW: {
    name: 'LEFT_ARROW',
    class: 'p5',
    module: 'Constants'
  },
  OPTION: {
    name: 'OPTION',
    class: 'p5',
    module: 'Constants'
  },
  RETURN: {
    name: 'RETURN',
    class: 'p5',
    module: 'Constants'
  },
  RIGHT_ARROW: {
    name: 'RIGHT_ARROW',
    class: 'p5',
    module: 'Constants'
  },
  SHIFT: {
    name: 'SHIFT',
    class: 'p5',
    module: 'Constants'
  },
  TAB: {
    name: 'TAB',
    class: 'p5',
    module: 'Constants'
  },
  UP_ARROW: {
    name: 'UP_ARROW',
    class: 'p5',
    module: 'Constants'
  },
  BLEND: {
    name: 'BLEND',
    class: 'p5',
    module: 'Constants'
  },
  REMOVE: {
    name: 'REMOVE',
    class: 'p5',
    module: 'Constants'
  },
  ADD: {
    name: 'ADD',
    class: 'p5',
    module: 'Constants'
  },
  DARKEST: {
    name: 'DARKEST',
    class: 'p5',
    module: 'Constants'
  },
  LIGHTEST: {
    name: 'LIGHTEST',
    class: 'p5',
    module: 'Constants'
  },
  DIFFERENCE: {
    name: 'DIFFERENCE',
    class: 'p5',
    module: 'Constants'
  },
  SUBTRACT: {
    name: 'SUBTRACT',
    class: 'p5',
    module: 'Constants'
  },
  EXCLUSION: {
    name: 'EXCLUSION',
    class: 'p5',
    module: 'Constants'
  },
  MULTIPLY: {
    name: 'MULTIPLY',
    class: 'p5',
    module: 'Constants'
  },
  SCREEN: {
    name: 'SCREEN',
    class: 'p5',
    module: 'Constants'
  },
  REPLACE: {
    name: 'REPLACE',
    class: 'p5',
    module: 'Constants'
  },
  OVERLAY: {
    name: 'OVERLAY',
    class: 'p5',
    module: 'Constants'
  },
  HARD_LIGHT: {
    name: 'HARD_LIGHT',
    class: 'p5',
    module: 'Constants'
  },
  SOFT_LIGHT: {
    name: 'SOFT_LIGHT',
    class: 'p5',
    module: 'Constants'
  },
  DODGE: {
    name: 'DODGE',
    class: 'p5',
    module: 'Constants'
  },
  BURN: {
    name: 'BURN',
    class: 'p5',
    module: 'Constants'
  },
  THRESHOLD: {
    name: 'THRESHOLD',
    class: 'p5',
    module: 'Constants'
  },
  GRAY: {
    name: 'GRAY',
    class: 'p5',
    module: 'Constants'
  },
  OPAQUE: {
    name: 'OPAQUE',
    class: 'p5',
    module: 'Constants'
  },
  INVERT: {
    name: 'INVERT',
    class: 'p5',
    module: 'Constants'
  },
  POSTERIZE: {
    name: 'POSTERIZE',
    class: 'p5',
    module: 'Constants'
  },
  DILATE: {
    name: 'DILATE',
    class: 'p5',
    module: 'Constants'
  },
  ERODE: {
    name: 'ERODE',
    class: 'p5',
    module: 'Constants'
  },
  BLUR: {
    name: 'BLUR',
    class: 'p5',
    module: 'Constants'
  },
  NORMAL: {
    name: 'NORMAL',
    class: 'p5',
    module: 'Constants'
  },
  ITALIC: {
    name: 'ITALIC',
    class: 'p5',
    module: 'Constants'
  },
  BOLD: {
    name: 'BOLD',
    class: 'p5',
    module: 'Constants'
  },
  BOLDITALIC: {
    name: 'BOLDITALIC',
    class: 'p5',
    module: 'Constants'
  },
  CHAR: {
    name: 'CHAR',
    class: 'p5',
    module: 'Constants'
  },
  WORD: {
    name: 'WORD',
    class: 'p5',
    module: 'Constants'
  },
  LINEAR: {
    name: 'LINEAR',
    class: 'p5',
    module: 'Constants'
  },
  QUADRATIC: {
    name: 'QUADRATIC',
    class: 'p5',
    module: 'Constants'
  },
  BEZIER: {
    name: 'BEZIER',
    class: 'p5',
    module: 'Constants'
  },
  CURVE: {
    name: 'CURVE',
    class: 'p5',
    module: 'Constants'
  },
  STROKE: {
    name: 'STROKE',
    class: 'p5',
    module: 'Constants'
  },
  FILL: {
    name: 'FILL',
    class: 'p5',
    module: 'Constants'
  },
  TEXTURE: {
    name: 'TEXTURE',
    class: 'p5',
    module: 'Constants'
  },
  IMMEDIATE: {
    name: 'IMMEDIATE',
    class: 'p5',
    module: 'Constants'
  },
  IMAGE: {
    name: 'IMAGE',
    class: 'p5',
    module: 'Constants'
  },
  NEAREST: {
    name: 'NEAREST',
    class: 'p5',
    module: 'Constants'
  },
  REPEAT: {
    name: 'REPEAT',
    class: 'p5',
    module: 'Constants'
  },
  CLAMP: {
    name: 'CLAMP',
    class: 'p5',
    module: 'Constants'
  },
  MIRROR: {
    name: 'MIRROR',
    class: 'p5',
    module: 'Constants'
  },
  LANDSCAPE: {
    name: 'LANDSCAPE',
    class: 'p5',
    module: 'Constants'
  },
  PORTRAIT: {
    name: 'PORTRAIT',
    class: 'p5',
    module: 'Constants'
  },
  GRID: {
    name: 'GRID',
    class: 'p5',
    module: 'Constants'
  },
  AXES: {
    name: 'AXES',
    class: 'p5',
    module: 'Constants'
  },
  LABEL: {
    name: 'LABEL',
    class: 'p5',
    module: 'Constants'
  },
  FALLBACK: {
    name: 'FALLBACK',
    class: 'p5',
    module: 'Constants'
  },
  print: {
    name: 'print',
    params: [
      {
        name: 'contents',
        description:
          '<p>any combination of Number, String, Object, Boolean,\n                      Array to print</p>\n',
        type: 'Any'
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  frameCount: {
    name: 'frameCount',
    class: 'p5',
    module: 'Environment'
  },
  deltaTime: {
    name: 'deltaTime',
    class: 'p5',
    module: 'Environment'
  },
  focused: {
    name: 'focused',
    class: 'p5',
    module: 'Environment'
  },
  cursor: {
    name: 'cursor',
    params: [
      {
        name: 'type',
        description:
          "<p>Built-In: either ARROW, CROSS, HAND, MOVE, TEXT and WAIT\n                              Native CSS properties: 'grab', 'progress', 'cell' etc.\n                              External: path for cursor's images\n                              (Allowed File extensions: .cur, .gif, .jpg, .jpeg, .png)\n                              For more information on Native CSS cursors and url visit:\n                              <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor\">https://developer.mozilla.org/en-US/docs/Web/CSS/cursor</a></p>\n",
        type: 'String|Constant'
      },
      {
        name: 'x',
        description:
          '<p>the horizontal active spot of the cursor (must be less than 32)</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description:
          '<p>the vertical active spot of the cursor (must be less than 32)</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  frameRate: {
    name: 'frameRate',
    class: 'p5',
    module: 'Environment',
    overloads: [
      {
        params: [
          {
            name: 'fps',
            description:
              '<p>number of frames to be displayed every second</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  noCursor: {
    name: 'noCursor',
    class: 'p5',
    module: 'Environment'
  },
  displayWidth: {
    name: 'displayWidth',
    class: 'p5',
    module: 'Environment'
  },
  displayHeight: {
    name: 'displayHeight',
    class: 'p5',
    module: 'Environment'
  },
  windowWidth: {
    name: 'windowWidth',
    class: 'p5',
    module: 'Environment'
  },
  windowHeight: {
    name: 'windowHeight',
    class: 'p5',
    module: 'Environment'
  },
  windowResized: {
    name: 'windowResized',
    params: [
      {
        name: 'event',
        description: '<p>optional Event callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  width: {
    name: 'width',
    class: 'p5',
    module: 'Environment'
  },
  height: {
    name: 'height',
    class: 'p5',
    module: 'Environment'
  },
  fullscreen: {
    name: 'fullscreen',
    params: [
      {
        name: 'val',
        description:
          '<p>whether the sketch should be in fullscreen mode\nor not</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Environment'
  },
  pixelDensity: {
    name: 'pixelDensity',
    class: 'p5',
    module: 'Environment',
    overloads: [
      {
        params: [
          {
            name: 'val',
            description: '<p>whether or how much the sketch should scale</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  displayDensity: {
    name: 'displayDensity',
    class: 'p5',
    module: 'Environment'
  },
  getURL: {
    name: 'getURL',
    class: 'p5',
    module: 'Environment'
  },
  getURLPath: {
    name: 'getURLPath',
    class: 'p5',
    module: 'Environment'
  },
  getURLParams: {
    name: 'getURLParams',
    class: 'p5',
    module: 'Environment'
  },
  preload: {
    name: 'preload',
    class: 'p5',
    module: 'Structure'
  },
  setup: {
    name: 'setup',
    class: 'p5',
    module: 'Structure'
  },
  draw: {
    name: 'draw',
    class: 'p5',
    module: 'Structure'
  },
  remove: {
    name: 'remove',
    class: 'p5',
    module: 'Structure'
  },
  disableFriendlyErrors: {
    name: 'disableFriendlyErrors',
    class: 'p5',
    module: 'Structure'
  },
  let: {
    name: 'let',
    class: 'p5',
    module: 'Foundation'
  },
  const: {
    name: 'const',
    class: 'p5',
    module: 'Foundation'
  },
  '===': {
    name: '===',
    class: 'p5',
    module: 'Foundation'
  },
  '>': {
    name: '>',
    class: 'p5',
    module: 'Foundation'
  },
  '>=': {
    name: '>=',
    class: 'p5',
    module: 'Foundation'
  },
  '<': {
    name: '<',
    class: 'p5',
    module: 'Foundation'
  },
  '<=': {
    name: '<=',
    class: 'p5',
    module: 'Foundation'
  },
  'if-else': {
    name: 'if-else',
    class: 'p5',
    module: 'Foundation'
  },
  function: {
    name: 'function',
    class: 'p5',
    module: 'Foundation'
  },
  return: {
    name: 'return',
    class: 'p5',
    module: 'Foundation'
  },
  boolean: {
    name: 'boolean',
    params: [
      {
        name: 'n',
        description: '<p>value to parse</p>\n',
        type: 'String|Boolean|Number|Array'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  string: {
    name: 'string',
    class: 'p5',
    module: 'Foundation'
  },
  number: {
    name: 'number',
    class: 'p5',
    module: 'Foundation'
  },
  object: {
    name: 'object',
    class: 'p5',
    module: 'Foundation'
  },
  class: {
    name: 'class',
    class: 'p5',
    module: 'Foundation'
  },
  for: {
    name: 'for',
    class: 'p5',
    module: 'Foundation'
  },
  while: {
    name: 'while',
    class: 'p5',
    module: 'Foundation'
  },
  createCanvas: {
    name: 'createCanvas',
    params: [
      {
        name: 'w',
        description: '<p>width of the canvas</p>\n',
        type: 'Number'
      },
      {
        name: 'h',
        description: '<p>height of the canvas</p>\n',
        type: 'Number'
      },
      {
        name: 'renderer',
        description: '<p>either P2D or WEBGL</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Rendering'
  },
  resizeCanvas: {
    name: 'resizeCanvas',
    params: [
      {
        name: 'w',
        description: '<p>width of the canvas</p>\n',
        type: 'Number'
      },
      {
        name: 'h',
        description: '<p>height of the canvas</p>\n',
        type: 'Number'
      },
      {
        name: 'noRedraw',
        description: "<p>don't redraw the canvas immediately</p>\n",
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Rendering'
  },
  noCanvas: {
    name: 'noCanvas',
    class: 'p5',
    module: 'Rendering'
  },
  createGraphics: {
    name: 'createGraphics',
    params: [
      {
        name: 'w',
        description: '<p>width of the offscreen graphics buffer</p>\n',
        type: 'Number'
      },
      {
        name: 'h',
        description: '<p>height of the offscreen graphics buffer</p>\n',
        type: 'Number'
      },
      {
        name: 'renderer',
        description:
          '<p>either P2D or WEBGL\n                              undefined defaults to p2d</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Rendering'
  },
  blendMode: {
    name: 'blendMode',
    params: [
      {
        name: 'mode',
        description:
          '<p>blend mode to set for canvas.\n               either BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY,\n               EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT,\n               SOFT_LIGHT, DODGE, BURN, ADD, REMOVE or SUBTRACT</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Rendering'
  },
  drawingContext: {
    name: 'drawingContext',
    class: 'p5',
    module: 'Rendering'
  },
  noLoop: {
    name: 'noLoop',
    class: 'p5',
    module: 'Structure'
  },
  loop: {
    name: 'loop',
    class: 'p5',
    module: 'Structure'
  },
  isLooping: {
    name: 'isLooping',
    class: 'p5',
    module: 'Structure'
  },
  push: {
    name: 'push',
    class: 'p5',
    module: 'Structure'
  },
  pop: {
    name: 'pop',
    class: 'p5',
    module: 'Structure'
  },
  redraw: {
    name: 'redraw',
    params: [
      {
        name: 'n',
        description: '<p>Redraw for n-times. The default value is 1.</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Structure'
  },
  p5: {
    name: 'p5',
    params: [
      {
        name: 'sketch',
        description: '<p>a function containing a p5.js sketch</p>\n',
        type: 'Object'
      },
      {
        name: 'node',
        description:
          '<p>ID or pointer to HTML DOM node to contain sketch in</p>\n',
        type: 'String|Object'
      }
    ],
    class: 'p5',
    module: 'Structure'
  },
  applyMatrix: {
    name: 'applyMatrix',
    class: 'p5',
    module: 'Transform',
    overloads: [
      {
        params: [
          {
            name: 'arr',
            description:
              '<p>an array of numbers - should be 6 or 16 length (2<em>3 or 4</em>4 matrix values)</p>\n',
            type: 'Array'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'a',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'b',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'c',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'd',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'e',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'f',
            description:
              '<p>numbers which define the 2×3 or 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'a',
            description: '',
            type: 'Number'
          },
          {
            name: 'b',
            description: '',
            type: 'Number'
          },
          {
            name: 'c',
            description: '',
            type: 'Number'
          },
          {
            name: 'd',
            description: '',
            type: 'Number'
          },
          {
            name: 'e',
            description: '',
            type: 'Number'
          },
          {
            name: 'f',
            description: '',
            type: 'Number'
          },
          {
            name: 'g',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'h',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'i',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'j',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'k',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'l',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'm',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'n',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'o',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          },
          {
            name: 'p',
            description:
              '<p>numbers which define the 4x4 matrix to be multiplied</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  resetMatrix: {
    name: 'resetMatrix',
    class: 'p5',
    module: 'Transform'
  },
  rotate: {
    name: 'rotate',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      },
      {
        name: 'axis',
        description: '<p>(in 3d) the axis to rotate around</p>\n',
        type: 'p5.Vector|Number[]',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  rotateX: {
    name: 'rotateX',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  rotateY: {
    name: 'rotateY',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  rotateZ: {
    name: 'rotateZ',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  scale: {
    name: 'scale',
    class: 'p5',
    module: 'Transform',
    overloads: [
      {
        params: [
          {
            name: 's',
            description:
              '<p>percent to scale the object, or percentage to\n                     scale the object in the x-axis if multiple arguments\n                     are given</p>\n',
            type: 'Number|p5.Vector|Number[]'
          },
          {
            name: 'y',
            description: '<p>percent to scale the object in the y-axis</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'z',
            description:
              '<p>percent to scale the object in the z-axis (webgl only)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'scales',
            description: '<p>per-axis percents to scale the object</p>\n',
            type: 'p5.Vector|Number[]'
          }
        ],
        chainable: 1
      }
    ]
  },
  shearX: {
    name: 'shearX',
    params: [
      {
        name: 'angle',
        description:
          '<p>angle of shear specified in radians or degrees,\n                       depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  shearY: {
    name: 'shearY',
    params: [
      {
        name: 'angle',
        description:
          '<p>angle of shear specified in radians or degrees,\n                       depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Transform'
  },
  translate: {
    name: 'translate',
    class: 'p5',
    module: 'Transform',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>left/right translation</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>up/down translation</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>forward/backward translation (WEBGL only)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'vector',
            description: '<p>the vector to translate by</p>\n',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      }
    ]
  },
  storeItem: {
    name: 'storeItem',
    params: [
      {
        name: 'key',
        description: '',
        type: 'String'
      },
      {
        name: 'value',
        description: '',
        type: 'String|Number|Object|Boolean|p5.Color|p5.Vector'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  getItem: {
    name: 'getItem',
    params: [
      {
        name: 'key',
        description:
          '<p>name that you wish to use to store in local storage</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  clearStorage: {
    name: 'clearStorage',
    class: 'p5',
    module: 'Data'
  },
  removeItem: {
    name: 'removeItem',
    params: [
      {
        name: 'key',
        description: '',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  createStringDict: {
    name: 'createStringDict',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'key',
            description: '',
            type: 'String'
          },
          {
            name: 'value',
            description: '',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'object',
            description: '<p>object</p>\n',
            type: 'Object'
          }
        ]
      }
    ]
  },
  createNumberDict: {
    name: 'createNumberDict',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'key',
            description: '',
            type: 'Number'
          },
          {
            name: 'value',
            description: '',
            type: 'Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'object',
            description: '<p>object</p>\n',
            type: 'Object'
          }
        ]
      }
    ]
  },
  select: {
    name: 'select',
    params: [
      {
        name: 'selectors',
        description: '<p>CSS selector string of element to search for</p>\n',
        type: 'String'
      },
      {
        name: 'container',
        description:
          '<p>CSS selector string, <a href="#/p5.Element">p5.Element</a>, or\n                                            HTML element to search within</p>\n',
        type: 'String|p5.Element|HTMLElement',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  selectAll: {
    name: 'selectAll',
    params: [
      {
        name: 'selectors',
        description: '<p>CSS selector string of elements to search for</p>\n',
        type: 'String'
      },
      {
        name: 'container',
        description:
          '<p>CSS selector string, <a href="#/p5.Element">p5.Element</a>\n                                            , or HTML element to search within</p>\n',
        type: 'String|p5.Element|HTMLElement',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  removeElements: {
    name: 'removeElements',
    class: 'p5',
    module: 'DOM'
  },
  changed: {
    name: 'changed',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when the value of\n                               an element changes.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  input: {
    name: 'input',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when any user input is\n                               detected within the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createDiv: {
    name: 'createDiv',
    params: [
      {
        name: 'html',
        description: '<p>inner HTML for element created</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createP: {
    name: 'createP',
    params: [
      {
        name: 'html',
        description: '<p>inner HTML for element created</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createSpan: {
    name: 'createSpan',
    params: [
      {
        name: 'html',
        description: '<p>inner HTML for element created</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createImg: {
    name: 'createImg',
    class: 'p5',
    module: 'DOM',
    overloads: [
      {
        params: [
          {
            name: 'src',
            description: '<p>src path or url for image</p>\n',
            type: 'String'
          },
          {
            name: 'alt',
            description:
              '<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#Attributes">alternate text</a> to be used if image does not load. You can use also an empty string (<code>""</code>) if that an image is not intended to be viewed.</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'src',
            description: '',
            type: 'String'
          },
          {
            name: 'alt',
            description: '',
            type: 'String'
          },
          {
            name: 'crossOrigin',
            description:
              '<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes">crossOrigin property</a> of the <code>img</code> element; use either \'anonymous\' or \'use-credentials\' to retrieve the image with cross-origin access (for later use with <code>canvas</code>. if an empty string(<code>""</code>) is passed, CORS is not used</p>\n',
            type: 'String'
          },
          {
            name: 'successCallback',
            description:
              '<p>callback to be called once image data is loaded with the <a href="#/p5.Element">p5.Element</a> as argument</p>\n',
            type: 'Function',
            optional: true
          }
        ]
      }
    ]
  },
  createA: {
    name: 'createA',
    params: [
      {
        name: 'href',
        description: '<p>url of page to link to</p>\n',
        type: 'String'
      },
      {
        name: 'html',
        description: '<p>inner html of link element to display</p>\n',
        type: 'String'
      },
      {
        name: 'target',
        description:
          '<p>target where new link should open,\n                            could be _blank, _self, _parent, _top.</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createSlider: {
    name: 'createSlider',
    params: [
      {
        name: 'min',
        description: '<p>minimum value of the slider</p>\n',
        type: 'Number'
      },
      {
        name: 'max',
        description: '<p>maximum value of the slider</p>\n',
        type: 'Number'
      },
      {
        name: 'value',
        description: '<p>default value of the slider</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'step',
        description:
          '<p>step size for each tick of the slider (if step is set to 0, the slider will move continuously from the minimum to the maximum value)</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createButton: {
    name: 'createButton',
    params: [
      {
        name: 'label',
        description: '<p>label displayed on the button</p>\n',
        type: 'String'
      },
      {
        name: 'value',
        description: '<p>value of the button</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createCheckbox: {
    name: 'createCheckbox',
    params: [
      {
        name: 'label',
        description: '<p>label displayed after checkbox</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'value',
        description:
          '<p>value of the checkbox; checked is true, unchecked is false</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createSelect: {
    name: 'createSelect',
    class: 'p5',
    module: 'DOM',
    overloads: [
      {
        params: [
          {
            name: 'multiple',
            description:
              '<p>true if dropdown should support multiple selections</p>\n',
            type: 'Boolean',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'existing',
            description: '<p>DOM select element</p>\n',
            type: 'Object'
          }
        ]
      }
    ]
  },
  createRadio: {
    name: 'createRadio',
    class: 'p5',
    module: 'DOM',
    overloads: [
      {
        params: [
          {
            name: 'containerElement',
            description:
              '<p>A container HTML Element, either a div\nor span, inside which all existing radio inputs will be considered as options.</p>\n',
            type: 'Object'
          },
          {
            name: 'name',
            description: '<p>A name parameter for each Input Element.</p>\n',
            type: 'String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'name',
            description: '',
            type: 'String'
          }
        ]
      },
      {
        params: []
      }
    ]
  },
  createColorPicker: {
    name: 'createColorPicker',
    params: [
      {
        name: 'value',
        description: '<p>default color of element</p>\n',
        type: 'String|p5.Color',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createInput: {
    name: 'createInput',
    class: 'p5',
    module: 'DOM',
    overloads: [
      {
        params: [
          {
            name: 'value',
            description: '<p>default value of the input box</p>\n',
            type: 'String'
          },
          {
            name: 'type',
            description:
              '<p>type of text, ie text, password etc. Defaults to text.\n  Needs a value to be specified first.</p>\n',
            type: 'String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'value',
            description: '',
            type: 'String',
            optional: true
          }
        ]
      }
    ]
  },
  createFileInput: {
    name: 'createFileInput',
    params: [
      {
        name: 'callback',
        description: '<p>callback function for when a file is loaded</p>\n',
        type: 'Function'
      },
      {
        name: 'multiple',
        description:
          '<p>optional, to allow multiple files to be selected</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createVideo: {
    name: 'createVideo',
    params: [
      {
        name: 'src',
        description:
          '<p>path to a video file, or array of paths for\n                            supporting different browsers</p>\n',
        type: 'String|String[]'
      },
      {
        name: 'callback',
        description:
          "<p>callback function to be called upon\n                            'canplaythrough' event fire, that is, when the\n                            browser can play the media, and estimates that\n                            enough data has been loaded to play the media\n                            up to its end without having to stop for\n                            further buffering of content</p>\n",
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createAudio: {
    name: 'createAudio',
    params: [
      {
        name: 'src',
        description:
          '<p>path to an audio file, or array of paths\n                            for supporting different browsers</p>\n',
        type: 'String|String[]',
        optional: true
      },
      {
        name: 'callback',
        description:
          "<p>callback function to be called upon\n                            'canplaythrough' event fire, that is, when the\n                            browser can play the media, and estimates that\n                            enough data has been loaded to play the media\n                            up to its end without having to stop for\n                            further buffering of content</p>\n",
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  VIDEO: {
    name: 'VIDEO',
    class: 'p5',
    module: 'DOM'
  },
  AUDIO: {
    name: 'AUDIO',
    class: 'p5',
    module: 'DOM'
  },
  createCapture: {
    name: 'createCapture',
    params: [
      {
        name: 'type',
        description:
          '<p>type of capture, either VIDEO or\n                                  AUDIO if none specified, default both,\n                                  or a Constraints object</p>\n',
        type: 'String|Constant|Object'
      },
      {
        name: 'callback',
        description:
          '<p>function to be called once\n                                  stream has loaded</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  createElement: {
    name: 'createElement',
    params: [
      {
        name: 'tag',
        description: '<p>tag for the new element</p>\n',
        type: 'String'
      },
      {
        name: 'content',
        description: '<p>html content to be inserted into the element</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'DOM'
  },
  deviceOrientation: {
    name: 'deviceOrientation',
    class: 'p5',
    module: 'Events'
  },
  accelerationX: {
    name: 'accelerationX',
    class: 'p5',
    module: 'Events'
  },
  accelerationY: {
    name: 'accelerationY',
    class: 'p5',
    module: 'Events'
  },
  accelerationZ: {
    name: 'accelerationZ',
    class: 'p5',
    module: 'Events'
  },
  pAccelerationX: {
    name: 'pAccelerationX',
    class: 'p5',
    module: 'Events'
  },
  pAccelerationY: {
    name: 'pAccelerationY',
    class: 'p5',
    module: 'Events'
  },
  pAccelerationZ: {
    name: 'pAccelerationZ',
    class: 'p5',
    module: 'Events'
  },
  rotationX: {
    name: 'rotationX',
    class: 'p5',
    module: 'Events'
  },
  rotationY: {
    name: 'rotationY',
    class: 'p5',
    module: 'Events'
  },
  rotationZ: {
    name: 'rotationZ',
    class: 'p5',
    module: 'Events'
  },
  pRotationX: {
    name: 'pRotationX',
    class: 'p5',
    module: 'Events'
  },
  pRotationY: {
    name: 'pRotationY',
    class: 'p5',
    module: 'Events'
  },
  pRotationZ: {
    name: 'pRotationZ',
    class: 'p5',
    module: 'Events'
  },
  turnAxis: {
    name: 'turnAxis',
    class: 'p5',
    module: 'Events'
  },
  setMoveThreshold: {
    name: 'setMoveThreshold',
    params: [
      {
        name: 'value',
        description: '<p>The threshold value</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  setShakeThreshold: {
    name: 'setShakeThreshold',
    params: [
      {
        name: 'value',
        description: '<p>The threshold value</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  deviceMoved: {
    name: 'deviceMoved',
    class: 'p5',
    module: 'Events'
  },
  deviceTurned: {
    name: 'deviceTurned',
    class: 'p5',
    module: 'Events'
  },
  deviceShaken: {
    name: 'deviceShaken',
    class: 'p5',
    module: 'Events'
  },
  keyIsPressed: {
    name: 'keyIsPressed',
    class: 'p5',
    module: 'Events'
  },
  key: {
    name: 'key',
    class: 'p5',
    module: 'Events'
  },
  keyCode: {
    name: 'keyCode',
    class: 'p5',
    module: 'Events'
  },
  keyPressed: {
    name: 'keyPressed',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  keyReleased: {
    name: 'keyReleased',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  keyTyped: {
    name: 'keyTyped',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  keyIsDown: {
    name: 'keyIsDown',
    params: [
      {
        name: 'code',
        description: '<p>The key to check for.</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  movedX: {
    name: 'movedX',
    class: 'p5',
    module: 'Events'
  },
  movedY: {
    name: 'movedY',
    class: 'p5',
    module: 'Events'
  },
  mouseX: {
    name: 'mouseX',
    class: 'p5',
    module: 'Events'
  },
  mouseY: {
    name: 'mouseY',
    class: 'p5',
    module: 'Events'
  },
  pmouseX: {
    name: 'pmouseX',
    class: 'p5',
    module: 'Events'
  },
  pmouseY: {
    name: 'pmouseY',
    class: 'p5',
    module: 'Events'
  },
  winMouseX: {
    name: 'winMouseX',
    class: 'p5',
    module: 'Events'
  },
  winMouseY: {
    name: 'winMouseY',
    class: 'p5',
    module: 'Events'
  },
  pwinMouseX: {
    name: 'pwinMouseX',
    class: 'p5',
    module: 'Events'
  },
  pwinMouseY: {
    name: 'pwinMouseY',
    class: 'p5',
    module: 'Events'
  },
  mouseButton: {
    name: 'mouseButton',
    class: 'p5',
    module: 'Events'
  },
  mouseIsPressed: {
    name: 'mouseIsPressed',
    class: 'p5',
    module: 'Events'
  },
  mouseMoved: {
    name: 'mouseMoved',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  mouseDragged: {
    name: 'mouseDragged',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  mousePressed: {
    name: 'mousePressed',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  mouseReleased: {
    name: 'mouseReleased',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  mouseClicked: {
    name: 'mouseClicked',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  doubleClicked: {
    name: 'doubleClicked',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  mouseWheel: {
    name: 'mouseWheel',
    params: [
      {
        name: 'event',
        description: '<p>optional WheelEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  requestPointerLock: {
    name: 'requestPointerLock',
    class: 'p5',
    module: 'Events'
  },
  exitPointerLock: {
    name: 'exitPointerLock',
    class: 'p5',
    module: 'Events'
  },
  touches: {
    name: 'touches',
    class: 'p5',
    module: 'Events'
  },
  touchStarted: {
    name: 'touchStarted',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  touchMoved: {
    name: 'touchMoved',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  touchEnded: {
    name: 'touchEnded',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Events'
  },
  createImage: {
    name: 'createImage',
    params: [
      {
        name: 'width',
        description: '<p>width in pixels</p>\n',
        type: 'Integer'
      },
      {
        name: 'height',
        description: '<p>height in pixels</p>\n',
        type: 'Integer'
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  saveCanvas: {
    name: 'saveCanvas',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'selectedCanvas',
            description:
              '<p>a variable\n                                representing a specific html5 canvas (optional)</p>\n',
            type: 'p5.Element|HTMLCanvasElement'
          },
          {
            name: 'filename',
            description: '',
            type: 'String',
            optional: true
          },
          {
            name: 'extension',
            description: "<p>'jpg' or 'png'</p>\n",
            type: 'String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'filename',
            description: '',
            type: 'String',
            optional: true
          },
          {
            name: 'extension',
            description: '',
            type: 'String',
            optional: true
          }
        ]
      }
    ]
  },
  saveFrames: {
    name: 'saveFrames',
    params: [
      {
        name: 'filename',
        description: '',
        type: 'String'
      },
      {
        name: 'extension',
        description: "<p>'jpg' or 'png'</p>\n",
        type: 'String'
      },
      {
        name: 'duration',
        description:
          '<p>Duration in seconds to save the frames for. This parameter will be constrained to be less or equal to 15.</p>\n',
        type: 'Number'
      },
      {
        name: 'framerate',
        description:
          '<p>Framerate to save the frames in. This parameter will be constrained to be less or equal to 22.</p>\n',
        type: 'Number'
      },
      {
        name: 'callback',
        description:
          '<p>A callback function that will be executed\n                                to handle the image data. This function\n                                should accept an array as argument. The\n                                array will contain the specified number of\n                                frames of objects. Each object has three\n                                properties: imageData - an\n                                image/octet-stream, filename and extension.</p>\n',
        type: 'Function(Array)',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  loadImage: {
    name: 'loadImage',
    params: [
      {
        name: 'path',
        description: '<p>Path of the image to be loaded</p>\n',
        type: 'String'
      },
      {
        name: 'successCallback',
        description:
          '<p>Function to be called once\n                               the image is loaded. Will be passed the\n                               <a href="#/p5.Image">p5.Image</a>.</p>\n',
        type: 'function(p5.Image)',
        optional: true
      },
      {
        name: 'failureCallback',
        description:
          '<p>called with event error if\n                               the image fails to load.</p>\n',
        type: 'Function(Event)',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  image: {
    name: 'image',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'img',
            description: '<p>the image to display</p>\n',
            type: 'p5.Image|p5.Element|p5.Texture'
          },
          {
            name: 'x',
            description:
              '<p>the x-coordinate of the top-left corner of the image</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description:
              '<p>the y-coordinate of the top-left corner of the image</p>\n',
            type: 'Number'
          },
          {
            name: 'width',
            description: '<p>the width to draw the image</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'height',
            description: '<p>the height to draw the image</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'img',
            description: '',
            type: 'p5.Image|p5.Element|p5.Texture'
          },
          {
            name: 'dx',
            description:
              '<p>the x-coordinate of the destination\n                          rectangle in which to draw the source image</p>\n',
            type: 'Number'
          },
          {
            name: 'dy',
            description:
              '<p>the y-coordinate of the destination\n                          rectangle in which to draw the source image</p>\n',
            type: 'Number'
          },
          {
            name: 'dWidth',
            description: '<p>the width of the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'dHeight',
            description: '<p>the height of the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sx',
            description:
              '<p>the x-coordinate of the subsection of the source\nimage to draw into the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sy',
            description:
              '<p>the y-coordinate of the subsection of the source\nimage to draw into the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sWidth',
            description:
              '<p>the width of the subsection of the\n                          source image to draw into the destination\n                          rectangle</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'sHeight',
            description:
              '<p>the height of the subsection of the\n                           source image to draw into the destination rectangle</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      }
    ]
  },
  tint: {
    name: 'tint',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>a color string</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'gray',
            description: '<p>a gray value</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ]
      },
      {
        params: [
          {
            name: 'color',
            description: '<p>the tint color</p>\n',
            type: 'p5.Color'
          }
        ]
      }
    ]
  },
  noTint: {
    name: 'noTint',
    class: 'p5',
    module: 'Image'
  },
  imageMode: {
    name: 'imageMode',
    params: [
      {
        name: 'mode',
        description: '<p>either CORNER, CORNERS, or CENTER</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  pixels: {
    name: 'pixels',
    class: 'p5',
    module: 'Image'
  },
  blend: {
    name: 'blend',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'srcImage',
            description: '<p>source image</p>\n',
            type: 'p5.Image'
          },
          {
            name: 'sx',
            description:
              "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description:
              "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sw',
            description: '<p>source image width</p>\n',
            type: 'Integer'
          },
          {
            name: 'sh',
            description: '<p>source image height</p>\n',
            type: 'Integer'
          },
          {
            name: 'dx',
            description:
              "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description:
              "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dw',
            description: '<p>destination image width</p>\n',
            type: 'Integer'
          },
          {
            name: 'dh',
            description: '<p>destination image height</p>\n',
            type: 'Integer'
          },
          {
            name: 'blendMode',
            description:
              '<p>the blend mode. either\n    BLEND, DARKEST, LIGHTEST, DIFFERENCE,\n    MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT,\n    SOFT_LIGHT, DODGE, BURN, ADD or NORMAL.</p>\n',
            type: 'Constant'
          }
        ]
      },
      {
        params: [
          {
            name: 'sx',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sy',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sw',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sh',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dx',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dy',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dw',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dh',
            description: '',
            type: 'Integer'
          },
          {
            name: 'blendMode',
            description: '',
            type: 'Constant'
          }
        ]
      }
    ]
  },
  copy: {
    name: 'copy',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'srcImage',
            description: '<p>source image</p>\n',
            type: 'p5.Image|p5.Element'
          },
          {
            name: 'sx',
            description:
              "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description:
              "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sw',
            description: '<p>source image width</p>\n',
            type: 'Integer'
          },
          {
            name: 'sh',
            description: '<p>source image height</p>\n',
            type: 'Integer'
          },
          {
            name: 'dx',
            description:
              "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description:
              "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dw',
            description: '<p>destination image width</p>\n',
            type: 'Integer'
          },
          {
            name: 'dh',
            description: '<p>destination image height</p>\n',
            type: 'Integer'
          }
        ]
      },
      {
        params: [
          {
            name: 'sx',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sy',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sw',
            description: '',
            type: 'Integer'
          },
          {
            name: 'sh',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dx',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dy',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dw',
            description: '',
            type: 'Integer'
          },
          {
            name: 'dh',
            description: '',
            type: 'Integer'
          }
        ]
      }
    ]
  },
  filter: {
    name: 'filter',
    params: [
      {
        name: 'filterType',
        description:
          '<p>either THRESHOLD, GRAY, OPAQUE, INVERT,\n                               POSTERIZE, BLUR, ERODE, DILATE or BLUR.\n                               See Filters.js for docs on\n                               each available filter</p>\n',
        type: 'Constant'
      },
      {
        name: 'filterParam',
        description:
          '<p>an optional parameter unique\n                               to each filter, see above</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  get: {
    name: 'get',
    class: 'p5',
    module: 'Image',
    overloads: [
      {
        params: [
          {
            name: 'x',
            description: '<p>x-coordinate of the pixel</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y-coordinate of the pixel</p>\n',
            type: 'Number'
          },
          {
            name: 'w',
            description: '<p>width</p>\n',
            type: 'Number'
          },
          {
            name: 'h',
            description: '<p>height</p>\n',
            type: 'Number'
          }
        ]
      },
      {
        params: []
      },
      {
        params: [
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          }
        ]
      }
    ]
  },
  loadPixels: {
    name: 'loadPixels',
    class: 'p5',
    module: 'Image'
  },
  set: {
    name: 'set',
    params: [
      {
        name: 'x',
        description: '<p>x-coordinate of the pixel</p>\n',
        type: 'Number'
      },
      {
        name: 'y',
        description: '<p>y-coordinate of the pixel</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description:
          '<p>insert a grayscale value | a pixel array |\n                               a <a href="#/p5.Color">p5.Color</a> object | a <a href="#/p5.Image">p5.Image</a> to copy</p>\n',
        type: 'Number|Number[]|Object'
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  updatePixels: {
    name: 'updatePixels',
    params: [
      {
        name: 'x',
        description:
          '<p>x-coordinate of the upper-left corner of region\n                        to update</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description:
          '<p>y-coordinate of the upper-left corner of region\n                        to update</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'w',
        description: '<p>width of region to update</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'h',
        description: '<p>height of region to update</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Image'
  },
  loadJSON: {
    name: 'loadJSON',
    class: 'p5',
    module: 'IO',
    overloads: [
      {
        params: [
          {
            name: 'path',
            description: '<p>name of the file or url to load</p>\n',
            type: 'String'
          },
          {
            name: 'jsonpOptions',
            description: '<p>options object for jsonp related settings</p>\n',
            type: 'Object',
            optional: true
          },
          {
            name: 'datatype',
            description: '<p>"json" or "jsonp"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/loadJSON">loadJSON()</a> completes, data is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'datatype',
            description: '',
            type: 'String'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function'
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      }
    ]
  },
  loadStrings: {
    name: 'loadStrings',
    params: [
      {
        name: 'filename',
        description: '<p>name of the file or url to load</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadStrings">loadStrings()</a>\n                              completes, Array is passed in as first\n                              argument</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                              there is an error, response is passed\n                              in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  loadTable: {
    name: 'loadTable',
    params: [
      {
        name: 'filename',
        description: '<p>name of the file or URL to load</p>\n',
        type: 'String'
      },
      {
        name: 'extension',
        description:
          '<p>parse the table by comma-separated values "csv", semicolon-separated\n                                     values "ssv", or tab-separated values "tsv"</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'header',
        description: '<p>"header" to indicate table has header row</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after\n                                     <a href="#/p5/loadTable">loadTable()</a> completes. On success, the\n                                     <a href="#/p5.Table">Table</a> object is passed in as the\n                                     first argument.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                                     there is an error, response is passed\n                                     in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  loadXML: {
    name: 'loadXML',
    params: [
      {
        name: 'filename',
        description: '<p>name of the file or URL to load</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadXML">loadXML()</a>\n                              completes, XML object is passed in as\n                              first argument</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                              there is an error, response is passed\n                              in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  loadBytes: {
    name: 'loadBytes',
    params: [
      {
        name: 'file',
        description: '<p>name of the file or URL to load</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadBytes">loadBytes()</a>\n                                   completes</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if there\n                                   is an error</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  httpGet: {
    name: 'httpGet',
    class: 'p5',
    module: 'IO',
    overloads: [
      {
        params: [
          {
            name: 'path',
            description: '<p>name of the file or url to load</p>\n',
            type: 'String'
          },
          {
            name: 'datatype',
            description:
              '<p>"json", "jsonp", "binary", "arrayBuffer",\n                                   "xml", or "text"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object|Boolean',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpGet">httpGet()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'data',
            description: '',
            type: 'Object|Boolean'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function'
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      }
    ]
  },
  httpPost: {
    name: 'httpPost',
    class: 'p5',
    module: 'IO',
    overloads: [
      {
        params: [
          {
            name: 'path',
            description: '<p>name of the file or url to load</p>\n',
            type: 'String'
          },
          {
            name: 'datatype',
            description:
              '<p>"json", "jsonp", "xml", or "text".\n                                   If omitted, <a href="#/p5/httpPost">httpPost()</a> will guess.</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object|Boolean',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpPost">httpPost()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'data',
            description: '',
            type: 'Object|Boolean'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function'
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      }
    ]
  },
  httpDo: {
    name: 'httpDo',
    class: 'p5',
    module: 'IO',
    overloads: [
      {
        params: [
          {
            name: 'path',
            description: '<p>name of the file or url to load</p>\n',
            type: 'String'
          },
          {
            name: 'method',
            description:
              '<p>either "GET", "POST", or "PUT",\n                                   defaults to "GET"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'datatype',
            description: '<p>"json", "jsonp", "xml", or "text"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpGet">httpGet()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'options',
            description:
              '<p>Request object options as documented in the\n                                   "fetch" API\n<a href="https://developer.mozilla.org/en/docs/Web/API/Fetch_API">reference</a></p>\n',
            type: 'Object'
          },
          {
            name: 'callback',
            description: '',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description: '',
            type: 'Function',
            optional: true
          }
        ]
      }
    ]
  },
  createWriter: {
    name: 'createWriter',
    params: [
      {
        name: 'name',
        description: '<p>name of the file to be created</p>\n',
        type: 'String'
      },
      {
        name: 'extension',
        description: '',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  save: {
    name: 'save',
    params: [
      {
        name: 'objectOrFilename',
        description:
          '<p>If filename is provided, will\n                                           save canvas as an image with\n                                           either png or jpg extension\n                                           depending on the filename.\n                                           If object is provided, will\n                                           save depending on the object\n                                           and filename (see examples\n                                           above).</p>\n',
        type: 'Object|String',
        optional: true
      },
      {
        name: 'filename',
        description:
          '<p>If an object is provided as the first\n                             parameter, then the second parameter\n                             indicates the filename,\n                             and should include an appropriate\n                             file extension (see examples above).</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'options',
        description:
          '<p>Additional options depend on\n                          filetype. For example, when saving JSON,\n                          <code>true</code> indicates that the\n                          output will be optimized for filesize,\n                          rather than readability.</p>\n',
        type: 'Boolean|String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  saveJSON: {
    name: 'saveJSON',
    params: [
      {
        name: 'json',
        description: '',
        type: 'Array|Object'
      },
      {
        name: 'filename',
        description: '',
        type: 'String'
      },
      {
        name: 'optimize',
        description:
          '<p>If true, removes line breaks\n                               and spaces from the output\n                               file to optimize filesize\n                               (but not readability).</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  saveStrings: {
    name: 'saveStrings',
    params: [
      {
        name: 'list',
        description: '<p>string array to be written</p>\n',
        type: 'String[]'
      },
      {
        name: 'filename',
        description: '<p>filename for output</p>\n',
        type: 'String'
      },
      {
        name: 'extension',
        description: "<p>the filename's extension</p>\n",
        type: 'String',
        optional: true
      },
      {
        name: 'isCRLF',
        description: '<p>if true, change line-break to CRLF</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  saveTable: {
    name: 'saveTable',
    params: [
      {
        name: 'Table',
        description:
          '<p>the <a href="#/p5.Table">Table</a> object to save to a file</p>\n',
        type: 'p5.Table'
      },
      {
        name: 'filename',
        description: '<p>the filename to which the Table should be saved</p>\n',
        type: 'String'
      },
      {
        name: 'options',
        description: '<p>can be one of "tsv", "csv", or "html"</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'IO'
  },
  abs: {
    name: 'abs',
    params: [
      {
        name: 'n',
        description: '<p>number to compute</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  ceil: {
    name: 'ceil',
    params: [
      {
        name: 'n',
        description: '<p>number to round up</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  constrain: {
    name: 'constrain',
    params: [
      {
        name: 'n',
        description: '<p>number to constrain</p>\n',
        type: 'Number'
      },
      {
        name: 'low',
        description: '<p>minimum limit</p>\n',
        type: 'Number'
      },
      {
        name: 'high',
        description: '<p>maximum limit</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  dist: {
    name: 'dist',
    class: 'p5',
    module: 'Math',
    overloads: [
      {
        params: [
          {
            name: 'x1',
            description: '<p>x-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '<p>y-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '<p>x-coordinate of the second point</p>\n',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '<p>y-coordinate of the second point</p>\n',
            type: 'Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'x1',
            description: '',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '',
            type: 'Number'
          },
          {
            name: 'z1',
            description: '<p>z-coordinate of the first point</p>\n',
            type: 'Number'
          },
          {
            name: 'x2',
            description: '',
            type: 'Number'
          },
          {
            name: 'y2',
            description: '',
            type: 'Number'
          },
          {
            name: 'z2',
            description: '<p>z-coordinate of the second point</p>\n',
            type: 'Number'
          }
        ]
      }
    ]
  },
  exp: {
    name: 'exp',
    params: [
      {
        name: 'n',
        description: '<p>exponent to raise</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  floor: {
    name: 'floor',
    params: [
      {
        name: 'n',
        description: '<p>number to round down</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  lerp: {
    name: 'lerp',
    params: [
      {
        name: 'start',
        description: '<p>first value</p>\n',
        type: 'Number'
      },
      {
        name: 'stop',
        description: '<p>second value</p>\n',
        type: 'Number'
      },
      {
        name: 'amt',
        description: '<p>number</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  log: {
    name: 'log',
    params: [
      {
        name: 'n',
        description: '<p>number greater than 0</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  mag: {
    name: 'mag',
    params: [
      {
        name: 'a',
        description: '<p>first value</p>\n',
        type: 'Number'
      },
      {
        name: 'b',
        description: '<p>second value</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  map: {
    name: 'map',
    params: [
      {
        name: 'value',
        description: '<p>the incoming value to be converted</p>\n',
        type: 'Number'
      },
      {
        name: 'start1',
        description: "<p>lower bound of the value's current range</p>\n",
        type: 'Number'
      },
      {
        name: 'stop1',
        description: "<p>upper bound of the value's current range</p>\n",
        type: 'Number'
      },
      {
        name: 'start2',
        description: "<p>lower bound of the value's target range</p>\n",
        type: 'Number'
      },
      {
        name: 'stop2',
        description: "<p>upper bound of the value's target range</p>\n",
        type: 'Number'
      },
      {
        name: 'withinBounds',
        description: '<p>constrain the value to the newly mapped range</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  max: {
    name: 'max',
    class: 'p5',
    module: 'Math',
    overloads: [
      {
        params: [
          {
            name: 'n0',
            description: '<p>Number to compare</p>\n',
            type: 'Number'
          },
          {
            name: 'n1',
            description: '<p>Number to compare</p>\n',
            type: 'Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>Numbers to compare</p>\n',
            type: 'Number[]'
          }
        ]
      }
    ]
  },
  min: {
    name: 'min',
    class: 'p5',
    module: 'Math',
    overloads: [
      {
        params: [
          {
            name: 'n0',
            description: '<p>Number to compare</p>\n',
            type: 'Number'
          },
          {
            name: 'n1',
            description: '<p>Number to compare</p>\n',
            type: 'Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>Numbers to compare</p>\n',
            type: 'Number[]'
          }
        ]
      }
    ]
  },
  norm: {
    name: 'norm',
    params: [
      {
        name: 'value',
        description: '<p>incoming value to be normalized</p>\n',
        type: 'Number'
      },
      {
        name: 'start',
        description: "<p>lower bound of the value's current range</p>\n",
        type: 'Number'
      },
      {
        name: 'stop',
        description: "<p>upper bound of the value's current range</p>\n",
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  pow: {
    name: 'pow',
    params: [
      {
        name: 'n',
        description: '<p>base of the exponential expression</p>\n',
        type: 'Number'
      },
      {
        name: 'e',
        description: '<p>power by which to raise the base</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  round: {
    name: 'round',
    params: [
      {
        name: 'n',
        description: '<p>number to round</p>\n',
        type: 'Number'
      },
      {
        name: 'decimals',
        description:
          '<p>number of decimal places to round to, default is 0</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  sq: {
    name: 'sq',
    params: [
      {
        name: 'n',
        description: '<p>number to square</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  sqrt: {
    name: 'sqrt',
    params: [
      {
        name: 'n',
        description: '<p>non-negative number to square root</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  fract: {
    name: 'fract',
    params: [
      {
        name: 'num',
        description:
          '<p>Number whose fractional part needs to be found out</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  createVector: {
    name: 'createVector',
    params: [
      {
        name: 'x',
        description: '<p>x component of the vector</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description: '<p>y component of the vector</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'z',
        description: '<p>z component of the vector</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  noise: {
    name: 'noise',
    params: [
      {
        name: 'x',
        description: '<p>x-coordinate in noise space</p>\n',
        type: 'Number'
      },
      {
        name: 'y',
        description: '<p>y-coordinate in noise space</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'z',
        description: '<p>z-coordinate in noise space</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  noiseDetail: {
    name: 'noiseDetail',
    params: [
      {
        name: 'lod',
        description: '<p>number of octaves to be used by the noise</p>\n',
        type: 'Number'
      },
      {
        name: 'falloff',
        description: '<p>falloff factor for each octave</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  noiseSeed: {
    name: 'noiseSeed',
    params: [
      {
        name: 'seed',
        description: '<p>the seed value</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  randomSeed: {
    name: 'randomSeed',
    params: [
      {
        name: 'seed',
        description: '<p>the seed value</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  random: {
    name: 'random',
    class: 'p5',
    module: 'Math',
    overloads: [
      {
        params: [
          {
            name: 'min',
            description: '<p>the lower bound (inclusive)</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'max',
            description: '<p>the upper bound (exclusive)</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'choices',
            description: '<p>the array to choose from</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  randomGaussian: {
    name: 'randomGaussian',
    params: [
      {
        name: 'mean',
        description: '<p>the mean</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'sd',
        description: '<p>the standard deviation</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  acos: {
    name: 'acos',
    params: [
      {
        name: 'value',
        description: '<p>the value whose arc cosine is to be returned</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  asin: {
    name: 'asin',
    params: [
      {
        name: 'value',
        description: '<p>the value whose arc sine is to be returned</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  atan: {
    name: 'atan',
    params: [
      {
        name: 'value',
        description: '<p>the value whose arc tangent is to be returned</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  atan2: {
    name: 'atan2',
    params: [
      {
        name: 'y',
        description: '<p>y-coordinate of the point</p>\n',
        type: 'Number'
      },
      {
        name: 'x',
        description: '<p>x-coordinate of the point</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  cos: {
    name: 'cos',
    params: [
      {
        name: 'angle',
        description: '<p>the angle</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  sin: {
    name: 'sin',
    params: [
      {
        name: 'angle',
        description: '<p>the angle</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  tan: {
    name: 'tan',
    params: [
      {
        name: 'angle',
        description: '<p>the angle</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  degrees: {
    name: 'degrees',
    params: [
      {
        name: 'radians',
        description: '<p>the radians value to convert to degrees</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  radians: {
    name: 'radians',
    params: [
      {
        name: 'degrees',
        description: '<p>the degree value to convert to radians</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'Math'
  },
  angleMode: {
    name: 'angleMode',
    class: 'p5',
    module: 'Math',
    overloads: [
      {
        params: [
          {
            name: 'mode',
            description: '<p>either RADIANS or DEGREES</p>\n',
            type: 'Constant'
          }
        ]
      },
      {
        params: []
      }
    ]
  },
  textAlign: {
    name: 'textAlign',
    class: 'p5',
    module: 'Typography',
    overloads: [
      {
        params: [
          {
            name: 'horizAlign',
            description:
              '<p>horizontal alignment, either LEFT,\n                           CENTER, or RIGHT</p>\n',
            type: 'Constant'
          },
          {
            name: 'vertAlign',
            description:
              '<p>vertical alignment, either TOP,\n                           BOTTOM, CENTER, or BASELINE</p>\n',
            type: 'Constant',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  textLeading: {
    name: 'textLeading',
    class: 'p5',
    module: 'Typography',
    overloads: [
      {
        params: [
          {
            name: 'leading',
            description:
              '<p>the size in pixels for spacing between lines</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  textSize: {
    name: 'textSize',
    class: 'p5',
    module: 'Typography',
    overloads: [
      {
        params: [
          {
            name: 'theSize',
            description: '<p>the size of the letters in units of pixels</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  textStyle: {
    name: 'textStyle',
    class: 'p5',
    module: 'Typography',
    overloads: [
      {
        params: [
          {
            name: 'theStyle',
            description:
              '<p>styling for text, either NORMAL,\n                           ITALIC, BOLD or BOLDITALIC</p>\n',
            type: 'Constant'
          }
        ],
        chainable: 1
      },
      {
        params: []
      }
    ]
  },
  textWidth: {
    name: 'textWidth',
    params: [
      {
        name: 'theText',
        description: '<p>the String of characters to measure</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Typography'
  },
  textAscent: {
    name: 'textAscent',
    class: 'p5',
    module: 'Typography'
  },
  textDescent: {
    name: 'textDescent',
    class: 'p5',
    module: 'Typography'
  },
  textWrap: {
    name: 'textWrap',
    params: [
      {
        name: 'wrapStyle',
        description: '<p>text wrapping style, either WORD or CHAR</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: 'Typography'
  },
  loadFont: {
    name: 'loadFont',
    params: [
      {
        name: 'path',
        description: '<p>name of the file or url to load</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after\n                                   <a href="#/p5/loadFont">loadFont()</a> completes</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'onError',
        description:
          '<p>function to be executed if\n                                   an error occurs</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Typography'
  },
  text: {
    name: 'text',
    params: [
      {
        name: 'str',
        description:
          '<p>the alphanumeric\n                                            symbols to be displayed</p>\n',
        type: 'String|Object|Array|Number|Boolean'
      },
      {
        name: 'x',
        description: '<p>x-coordinate of text</p>\n',
        type: 'Number'
      },
      {
        name: 'y',
        description: '<p>y-coordinate of text</p>\n',
        type: 'Number'
      },
      {
        name: 'x2',
        description:
          '<p>by default, the width of the text box,\n                    see <a href="#/p5/rectMode">rectMode()</a> for more info</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y2',
        description:
          '<p>by default, the height of the text box,\n                    see <a href="#/p5/rectMode">rectMode()</a> for more info</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Typography'
  },
  textFont: {
    name: 'textFont',
    class: 'p5',
    module: 'Typography',
    overloads: [
      {
        params: []
      },
      {
        params: [
          {
            name: 'font',
            description:
              '<p>a font loaded via <a href="#/p5/loadFont">loadFont()</a>,\nor a String representing a <a href="https://mzl.la/2dOw8WD">web safe font</a>\n(a font that is generally available across all systems)</p>\n',
            type: 'Object|String'
          },
          {
            name: 'size',
            description: '<p>the font size to use</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  append: {
    name: 'append',
    params: [
      {
        name: 'array',
        description: '<p>Array to append</p>\n',
        type: 'Array'
      },
      {
        name: 'value',
        description: '<p>to be added to the Array</p>\n',
        type: 'Any'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  arrayCopy: {
    name: 'arrayCopy',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'src',
            description: '<p>the source Array</p>\n',
            type: 'Array'
          },
          {
            name: 'srcPosition',
            description: '<p>starting position in the source Array</p>\n',
            type: 'Integer'
          },
          {
            name: 'dst',
            description: '<p>the destination Array</p>\n',
            type: 'Array'
          },
          {
            name: 'dstPosition',
            description: '<p>starting position in the destination Array</p>\n',
            type: 'Integer'
          },
          {
            name: 'length',
            description: '<p>number of Array elements to be copied</p>\n',
            type: 'Integer'
          }
        ]
      },
      {
        params: [
          {
            name: 'src',
            description: '',
            type: 'Array'
          },
          {
            name: 'dst',
            description: '',
            type: 'Array'
          },
          {
            name: 'length',
            description: '',
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  concat: {
    name: 'concat',
    params: [
      {
        name: 'a',
        description: '<p>first Array to concatenate</p>\n',
        type: 'Array'
      },
      {
        name: 'b',
        description: '<p>second Array to concatenate</p>\n',
        type: 'Array'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  reverse: {
    name: 'reverse',
    params: [
      {
        name: 'list',
        description: '<p>Array to reverse</p>\n',
        type: 'Array'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  shorten: {
    name: 'shorten',
    params: [
      {
        name: 'list',
        description: '<p>Array to shorten</p>\n',
        type: 'Array'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  shuffle: {
    name: 'shuffle',
    params: [
      {
        name: 'array',
        description: '<p>Array to shuffle</p>\n',
        type: 'Array'
      },
      {
        name: 'bool',
        description: '<p>modify passed array</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  sort: {
    name: 'sort',
    params: [
      {
        name: 'list',
        description: '<p>Array to sort</p>\n',
        type: 'Array'
      },
      {
        name: 'count',
        description: '<p>number of elements to sort, starting from 0</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  splice: {
    name: 'splice',
    params: [
      {
        name: 'list',
        description: '<p>Array to splice into</p>\n',
        type: 'Array'
      },
      {
        name: 'value',
        description: '<p>value to be spliced in</p>\n',
        type: 'Any'
      },
      {
        name: 'position',
        description: '<p>in the array from which to insert data</p>\n',
        type: 'Integer'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  subset: {
    name: 'subset',
    params: [
      {
        name: 'list',
        description: '<p>Array to extract from</p>\n',
        type: 'Array'
      },
      {
        name: 'start',
        description: '<p>position to begin</p>\n',
        type: 'Integer'
      },
      {
        name: 'count',
        description: '<p>number of values to extract</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  float: {
    name: 'float',
    params: [
      {
        name: 'str',
        description: '<p>float string to parse</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  int: {
    name: 'int',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'String|Boolean|Number'
          },
          {
            name: 'radix',
            description: '<p>the radix to convert to (default: 10)</p>\n',
            type: 'Integer',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>values to parse</p>\n',
            type: 'Array'
          },
          {
            name: 'radix',
            description: '',
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  str: {
    name: 'str',
    params: [
      {
        name: 'n',
        description: '<p>value to parse</p>\n',
        type: 'String|Boolean|Number|Array'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  byte: {
    name: 'byte',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'String|Boolean|Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>values to parse</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  char: {
    name: 'char',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'String|Number'
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>values to parse</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  unchar: {
    name: 'unchar',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>values to parse</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  hex: {
    name: 'hex',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'Number'
          },
          {
            name: 'digits',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>array of values to parse</p>\n',
            type: 'Number[]'
          },
          {
            name: 'digits',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      }
    ]
  },
  unhex: {
    name: 'unhex',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'n',
            description: '<p>value to parse</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'ns',
            description: '<p>values to parse</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  join: {
    name: 'join',
    params: [
      {
        name: 'list',
        description: '<p>array of Strings to be joined</p>\n',
        type: 'Array'
      },
      {
        name: 'separator',
        description: '<p>String to be placed between each item</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  match: {
    name: 'match',
    params: [
      {
        name: 'str',
        description: '<p>the String to be searched</p>\n',
        type: 'String'
      },
      {
        name: 'regexp',
        description: '<p>the regexp to be used for matching</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  matchAll: {
    name: 'matchAll',
    params: [
      {
        name: 'str',
        description: '<p>the String to be searched</p>\n',
        type: 'String'
      },
      {
        name: 'regexp',
        description: '<p>the regexp to be used for matching</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  nf: {
    name: 'nf',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'num',
            description: '<p>the Number to format</p>\n',
            type: 'Number|String'
          },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the\n                               decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>the Numbers to format</p>\n',
            type: 'Array'
          },
          {
            name: 'left',
            description: '',
            type: 'Integer|String',
            optional: true
          },
          {
            name: 'right',
            description: '',
            type: 'Integer|String',
            optional: true
          }
        ]
      }
    ]
  },
  nfc: {
    name: 'nfc',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'num',
            description: '<p>the Number to format</p>\n',
            type: 'Number|String'
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                                 decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>the Numbers to format</p>\n',
            type: 'Array'
          },
          {
            name: 'right',
            description: '',
            type: 'Integer|String',
            optional: true
          }
        ]
      }
    ]
  },
  nfp: {
    name: 'nfp',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'num',
            description: '<p>the Number to format</p>\n',
            type: 'Number'
          },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the decimal\n                               point</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>the Numbers to format</p>\n',
            type: 'Number[]'
          },
          {
            name: 'left',
            description: '',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description: '',
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  nfs: {
    name: 'nfs',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'num',
            description: '<p>the Number to format</p>\n',
            type: 'Number'
          },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the decimal\n                               point</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'nums',
            description: '<p>the Numbers to format</p>\n',
            type: 'Array'
          },
          {
            name: 'left',
            description: '',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description: '',
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  split: {
    name: 'split',
    params: [
      {
        name: 'value',
        description: '<p>the String to be split</p>\n',
        type: 'String'
      },
      {
        name: 'delim',
        description: '<p>the String used to separate the data</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  splitTokens: {
    name: 'splitTokens',
    params: [
      {
        name: 'value',
        description: '<p>the String to be split</p>\n',
        type: 'String'
      },
      {
        name: 'delim',
        description:
          '<p>list of individual Strings that will be used as\n                         separators</p>\n',
        type: 'String',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Data'
  },
  trim: {
    name: 'trim',
    class: 'p5',
    module: 'Data',
    overloads: [
      {
        params: [
          {
            name: 'str',
            description: '<p>a String to be trimmed</p>\n',
            type: 'String'
          }
        ]
      },
      {
        params: [
          {
            name: 'strs',
            description: '<p>an Array of Strings to be trimmed</p>\n',
            type: 'Array'
          }
        ]
      }
    ]
  },
  day: {
    name: 'day',
    class: 'p5',
    module: 'IO'
  },
  hour: {
    name: 'hour',
    class: 'p5',
    module: 'IO'
  },
  minute: {
    name: 'minute',
    class: 'p5',
    module: 'IO'
  },
  millis: {
    name: 'millis',
    class: 'p5',
    module: 'IO'
  },
  month: {
    name: 'month',
    class: 'p5',
    module: 'IO'
  },
  second: {
    name: 'second',
    class: 'p5',
    module: 'IO'
  },
  year: {
    name: 'year',
    class: 'p5',
    module: 'IO'
  },
  plane: {
    name: 'plane',
    params: [
      {
        name: 'width',
        description: '<p>width of the plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'height',
        description: '<p>height of the plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>Optional number of triangle\n                            subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>Optional number of triangle\n                            subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  box: {
    name: 'box',
    params: [
      {
        name: 'width',
        description: '<p>width of the box</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'Height',
        description: '<p>height of the box</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'depth',
        description: '<p>depth of the box</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>Optional number of triangle\n                           subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>Optional number of triangle\n                           subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  sphere: {
    name: 'sphere',
    params: [
      {
        name: 'radius',
        description: '<p>radius of circle</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description: '<p>optional number of subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description: '<p>optional number of subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  cylinder: {
    name: 'cylinder',
    params: [
      {
        name: 'radius',
        description: '<p>radius of the surface</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'height',
        description: '<p>height of the cylinder</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>number of subdivisions in x-dimension;\n                              default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of subdivisions in y-dimension;\n                              default is 1</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'bottomCap',
        description: '<p>whether to draw the bottom of the cylinder</p>\n',
        type: 'Boolean',
        optional: true
      },
      {
        name: 'topCap',
        description: '<p>whether to draw the top of the cylinder</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  cone: {
    name: 'cone',
    params: [
      {
        name: 'radius',
        description: '<p>radius of the bottom surface</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'height',
        description: '<p>height of the cone</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>number of segments,\n                            the more segments the smoother geometry\n                            default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments,\n                            the more segments the smoother geometry\n                            default is 1</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'cap',
        description: '<p>whether to draw the base of the cone</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  ellipsoid: {
    name: 'ellipsoid',
    params: [
      {
        name: 'radiusx',
        description: '<p>x-radius of ellipsoid</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'radiusy',
        description: '<p>y-radius of ellipsoid</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'radiusz',
        description: '<p>z-radius of ellipsoid</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>number of segments,\n                                   the more segments the smoother geometry\n                                   default is 24. Avoid detail number above\n                                   150, it may crash the browser.</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments,\n                                   the more segments the smoother geometry\n                                   default is 16. Avoid detail number above\n                                   150, it may crash the browser.</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  torus: {
    name: 'torus',
    params: [
      {
        name: 'radius',
        description: '<p>radius of the whole ring</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'tubeRadius',
        description: '<p>radius of the tube</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'detailX',
        description:
          '<p>number of segments in x-dimension,\n                               the more segments the smoother geometry\n                               default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments in y-dimension,\n                               the more segments the smoother geometry\n                               default is 16</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  orbitControl: {
    name: 'orbitControl',
    params: [
      {
        name: 'sensitivityX',
        description: '<p>sensitivity to mouse movement along X axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'sensitivityY',
        description: '<p>sensitivity to mouse movement along Y axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'sensitivityZ',
        description: '<p>sensitivity to scroll movement along Z axis</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  debugMode: {
    name: 'debugMode',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: []
      },
      {
        params: [
          {
            name: 'mode',
            description: '<p>either GRID or AXES</p>\n',
            type: 'Constant'
          }
        ]
      },
      {
        params: [
          {
            name: 'mode',
            description: '',
            type: 'Constant'
          },
          {
            name: 'gridSize',
            description: '<p>size of one side of the grid</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridDivisions',
            description: '<p>number of divisions in the grid</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'xOff',
            description: '<p>X axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'yOff',
            description: '<p>Y axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'zOff',
            description: '<p>Z axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'mode',
            description: '',
            type: 'Constant'
          },
          {
            name: 'axesSize',
            description: '<p>size of axes icon</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'xOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'yOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'zOff',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'gridSize',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridDivisions',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridXOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridYOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridZOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'axesSize',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'axesXOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'axesYOff',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'axesZOff',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      }
    ]
  },
  noDebugMode: {
    name: 'noDebugMode',
    class: 'p5',
    module: '3D'
  },
  ambientLight: {
    name: 'ambientLight',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                  the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                  relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                  relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current\n                                  color range (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between\n                                 white and black</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>a color string</p>\n',
            type: 'String'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                 and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a></p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  specularColor: {
    name: 'specularColor',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                 the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                 relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                 relative to the current color range</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between\n                                 white and black</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'value',
            description: '<p>color as a CSS string</p>\n',
            type: 'String'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'values',
            description:
              '<p>color as an array containing the\n                                 red, green, and blue components</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a></p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  directionalLight: {
    name: 'directionalLight',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to the current\n                                color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value relative to the\n                                current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value relative to the\n                                current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'x',
            description:
              '<p>x component of direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description:
              '<p>y component of direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description:
              '<p>z component of direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'v1',
            description: '',
            type: 'Number'
          },
          {
            name: 'v2',
            description: '',
            type: 'Number'
          },
          {
            name: 'v3',
            description: '',
            type: 'Number'
          },
          {
            name: 'direction',
            description:
              '<p>direction of light as a\n                                <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n                                           as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'direction',
            description: '',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      }
    ]
  },
  pointLight: {
    name: 'pointLight',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to the current\n                         color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value relative to the\n                         current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value relative to the\n                         current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'x',
            description: '<p>x component of position</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y component of position</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>z component of position</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'v1',
            description: '',
            type: 'Number'
          },
          {
            name: 'v2',
            description: '',
            type: 'Number'
          },
          {
            name: 'v3',
            description: '',
            type: 'Number'
          },
          {
            name: 'position',
            description:
              '<p>of light as a <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n                                           as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'position',
            description: '',
            type: 'p5.Vector'
          }
        ],
        chainable: 1
      }
    ]
  },
  lights: {
    name: 'lights',
    class: 'p5',
    module: '3D'
  },
  lightFalloff: {
    name: 'lightFalloff',
    params: [
      {
        name: 'constant',
        description: '<p>CONSTANT value for determining falloff</p>\n',
        type: 'Number'
      },
      {
        name: 'linear',
        description: '<p>LINEAR value for determining falloff</p>\n',
        type: 'Number'
      },
      {
        name: 'quadratic',
        description: '<p>QUADRATIC value for determining falloff</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  spotLight: {
    name: 'spotLight',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'x',
            description: '<p>x component of position</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>y component of position</p>\n',
            type: 'Number'
          },
          {
            name: 'z',
            description: '<p>z component of position</p>\n',
            type: 'Number'
          },
          {
            name: 'rx',
            description:
              '<p>x component of light direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          },
          {
            name: 'ry',
            description:
              '<p>y component of light direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          },
          {
            name: 'rz',
            description:
              '<p>z component of light direction (inclusive range of -1 to 1)</p>\n',
            type: 'Number'
          },
          {
            name: 'angle',
            description: '<p>angle of cone. Defaults to PI/3</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '<p>concentration of cone. Defaults to 100</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n                                                    as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'position',
            description:
              '<p>position of light as a <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          },
          {
            name: 'direction',
            description:
              '<p>direction of light as a <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'v1',
            description: '',
            type: 'Number'
          },
          {
            name: 'v2',
            description: '',
            type: 'Number'
          },
          {
            name: 'v3',
            description: '',
            type: 'Number'
          },
          {
            name: 'position',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'direction',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number'
          },
          {
            name: 'direction',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'position',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'rx',
            description: '',
            type: 'Number'
          },
          {
            name: 'ry',
            description: '',
            type: 'Number'
          },
          {
            name: 'rz',
            description: '',
            type: 'Number'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'v1',
            description: '',
            type: 'Number'
          },
          {
            name: 'v2',
            description: '',
            type: 'Number'
          },
          {
            name: 'v3',
            description: '',
            type: 'Number'
          },
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number'
          },
          {
            name: 'direction',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'v1',
            description: '',
            type: 'Number'
          },
          {
            name: 'v2',
            description: '',
            type: 'Number'
          },
          {
            name: 'v3',
            description: '',
            type: 'Number'
          },
          {
            name: 'position',
            description: '',
            type: 'p5.Vector'
          },
          {
            name: 'rx',
            description: '',
            type: 'Number'
          },
          {
            name: 'ry',
            description: '',
            type: 'Number'
          },
          {
            name: 'rz',
            description: '',
            type: 'Number'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'color',
            description: '',
            type: 'p5.Color|Number[]|String'
          },
          {
            name: 'x',
            description: '',
            type: 'Number'
          },
          {
            name: 'y',
            description: '',
            type: 'Number'
          },
          {
            name: 'z',
            description: '',
            type: 'Number'
          },
          {
            name: 'rx',
            description: '',
            type: 'Number'
          },
          {
            name: 'ry',
            description: '',
            type: 'Number'
          },
          {
            name: 'rz',
            description: '',
            type: 'Number'
          },
          {
            name: 'angle',
            description: '',
            type: 'Number',
            optional: true
          },
          {
            name: 'concentration',
            description: '',
            type: 'Number',
            optional: true
          }
        ]
      }
    ]
  },
  noLights: {
    name: 'noLights',
    class: 'p5',
    module: '3D'
  },
  loadModel: {
    name: 'loadModel',
    class: 'p5',
    module: 'Shape',
    overloads: [
      {
        params: [
          {
            name: 'path',
            description: '<p>Path of the model to be loaded</p>\n',
            type: 'String'
          },
          {
            name: 'normalize',
            description:
              '<p>If true, scale the model to a\n                                     standardized size when loading</p>\n',
            type: 'Boolean'
          },
          {
            name: 'successCallback',
            description:
              '<p>Function to be called\n                                    once the model is loaded. Will be passed\n                                    the 3D model object.</p>\n',
            type: 'function(p5.Geometry)',
            optional: true
          },
          {
            name: 'failureCallback',
            description:
              '<p>called with event error if\n                                        the model fails to load.</p>\n',
            type: 'Function(Event)',
            optional: true
          },
          {
            name: 'fileType',
            description:
              '<p>The file extension of the model\n                                     (<code>.stl</code>, <code>.obj</code>).</p>\n',
            type: 'String',
            optional: true
          }
        ]
      },
      {
        params: [
          {
            name: 'path',
            description: '',
            type: 'String'
          },
          {
            name: 'successCallback',
            description: '',
            type: 'function(p5.Geometry)',
            optional: true
          },
          {
            name: 'failureCallback',
            description: '',
            type: 'Function(Event)',
            optional: true
          },
          {
            name: 'fileType',
            description: '',
            type: 'String',
            optional: true
          }
        ]
      }
    ]
  },
  model: {
    name: 'model',
    params: [
      {
        name: 'model',
        description: '<p>Loaded 3d model to be rendered</p>\n',
        type: 'p5.Geometry'
      }
    ],
    class: 'p5',
    module: 'Shape'
  },
  loadShader: {
    name: 'loadShader',
    params: [
      {
        name: 'vertFilename',
        description:
          '<p>path to file containing vertex shader\nsource code</p>\n',
        type: 'String'
      },
      {
        name: 'fragFilename',
        description:
          '<p>path to file containing fragment shader\nsource code</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>callback to be executed after loadShader\ncompletes. On success, the p5.Shader object is passed as the first argument.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>callback to be executed when an error\noccurs inside loadShader. On error, the error is passed as the first\nargument.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  createShader: {
    name: 'createShader',
    params: [
      {
        name: 'vertSrc',
        description: '<p>source code for the vertex shader</p>\n',
        type: 'String'
      },
      {
        name: 'fragSrc',
        description: '<p>source code for the fragment shader</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  shader: {
    name: 'shader',
    params: [
      {
        name: 's',
        description:
          '<p>the <a href="#/p5.Shader">p5.Shader</a> object\nto use for rendering shapes.</p>\n',
        type: 'p5.Shader'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  resetShader: {
    name: 'resetShader',
    class: 'p5',
    module: '3D'
  },
  texture: {
    name: 'texture',
    params: [
      {
        name: 'tex',
        description: '<p>image to use as texture</p>\n',
        type: 'p5.Image|p5.MediaElement|p5.Graphics|p5.Texture'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  textureMode: {
    name: 'textureMode',
    params: [
      {
        name: 'mode',
        description: '<p>either IMAGE or NORMAL</p>\n',
        type: 'Constant'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  textureWrap: {
    name: 'textureWrap',
    params: [
      {
        name: 'wrapX',
        description: '<p>either CLAMP, REPEAT, or MIRROR</p>\n',
        type: 'Constant'
      },
      {
        name: 'wrapY',
        description: '<p>either CLAMP, REPEAT, or MIRROR</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  normalMaterial: {
    name: 'normalMaterial',
    class: 'p5',
    module: '3D'
  },
  ambientMaterial: {
    name: 'ambientMaterial',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to the current\n                      color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value relative to the\n                      current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value relative to the\n                      current color range</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between\n                        white and black</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n           as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          }
        ],
        chainable: 1
      }
    ]
  },
  emissiveMaterial: {
    name: 'emissiveMaterial',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to the current\n                           color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value relative to the\n                           current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value relative to the\n                           current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current color\n                           range (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between\n                        white and black</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n           as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          }
        ],
        chainable: 1
      }
    ]
  },
  specularMaterial: {
    name: 'specularMaterial',
    class: 'p5',
    module: '3D',
    overloads: [
      {
        params: [
          {
            name: 'gray',
            description:
              '<p>number specifying value between white and black.</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current color range\n                                (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description: '',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        params: [
          {
            name: 'color',
            description:
              '<p>color as a <a href="#/p5.Color">p5.Color</a>,\n           as an array, or as a CSS string</p>\n',
            type: 'p5.Color|Number[]|String'
          }
        ],
        chainable: 1
      }
    ]
  },
  shininess: {
    name: 'shininess',
    params: [
      {
        name: 'shine',
        description: '<p>degree of shininess</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  camera: {
    name: 'camera',
    params: [
      {
        name: 'x',
        description: '<p>camera position value on x axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description: '<p>camera position value on y axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'z',
        description: '<p>camera position value on z axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'centerX',
        description: '<p>x coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'centerY',
        description: '<p>y coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'centerZ',
        description: '<p>z coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'upX',
        description: "<p>x component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'upY',
        description: "<p>y component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'upZ',
        description: "<p>z component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  perspective: {
    name: 'perspective',
    params: [
      {
        name: 'fovy',
        description:
          '<p>camera frustum vertical field of view,\n                          from bottom to top of view, in <a href="#/p5/angleMode">angleMode</a> units</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'aspect',
        description: '<p>camera frustum aspect ratio</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'near',
        description: '<p>frustum near plane length</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'far',
        description: '<p>frustum far plane length</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  ortho: {
    name: 'ortho',
    params: [
      {
        name: 'left',
        description: '<p>camera frustum left plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'right',
        description: '<p>camera frustum right plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'bottom',
        description: '<p>camera frustum bottom plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'top',
        description: '<p>camera frustum top plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'near',
        description: '<p>camera frustum near plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'far',
        description: '<p>camera frustum far plane</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  frustum: {
    name: 'frustum',
    params: [
      {
        name: 'left',
        description: '<p>camera frustum left plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'right',
        description: '<p>camera frustum right plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'bottom',
        description: '<p>camera frustum bottom plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'top',
        description: '<p>camera frustum top plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'near',
        description: '<p>camera frustum near plane</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'far',
        description: '<p>camera frustum far plane</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: '3D'
  },
  createCamera: {
    name: 'createCamera',
    class: 'p5',
    module: '3D'
  },
  setCamera: {
    name: 'setCamera',
    params: [
      {
        name: 'cam',
        description: '<p>p5.Camera object</p>\n',
        type: 'p5.Camera'
      }
    ],
    class: 'p5',
    module: '3D'
  },
  setAttributes: {
    name: 'setAttributes',
    class: 'p5',
    module: 'Rendering',
    overloads: [
      {
        params: [
          {
            name: 'key',
            description: '<p>Name of attribute</p>\n',
            type: 'String'
          },
          {
            name: 'value',
            description: '<p>New value of named attribute</p>\n',
            type: 'Boolean'
          }
        ]
      },
      {
        params: [
          {
            name: 'obj',
            description: '<p>object with key-value pairs</p>\n',
            type: 'Object'
          }
        ]
      }
    ]
  },
  getAudioContext: {
    name: 'getAudioContext',
    class: 'p5',
    module: 'p5.sound'
  },
  userStartAudio: {
    params: [
      {
        name: 'elements',
        description:
          '<p>This argument can be an Element,\n                              Selector String, NodeList, p5.Element,\n                              jQuery Element, or an Array of any of those.</p>\n',
        type: 'Element|Array',
        optional: true
      },
      {
        name: 'callback',
        description:
          '<p>Callback to invoke when the AudioContext\n                              has started</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    name: 'userStartAudio',
    class: 'p5',
    module: 'p5.sound'
  },
  getOutputVolume: {
    name: 'getOutputVolume',
    class: 'p5',
    module: 'p5.sound'
  },
  outputVolume: {
    name: 'outputVolume',
    params: [
      {
        name: 'volume',
        description:
          '<p>Volume (amplitude) between 0.0\n                                   and 1.0 or modulating signal/oscillator</p>\n',
        type: 'Number|Object'
      },
      {
        name: 'rampTime',
        description: '<p>Fade for t seconds</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'timeFromNow',
        description:
          '<p>Schedule this event to happen at\n                               t seconds in the future</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  soundOut: {
    name: 'soundOut',
    class: 'p5',
    module: 'p5.sound'
  },
  sampleRate: {
    name: 'sampleRate',
    class: 'p5',
    module: 'p5.sound'
  },
  freqToMidi: {
    name: 'freqToMidi',
    params: [
      {
        name: 'frequency',
        description:
          '<p>A freqeuncy, for example, the "A"\n                           above Middle C is 440Hz</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  midiToFreq: {
    name: 'midiToFreq',
    params: [
      {
        name: 'midiNote',
        description: '<p>The number of a MIDI note</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  soundFormats: {
    name: 'soundFormats',
    params: [
      {
        name: 'formats',
        description: "<p>i.e. 'mp3', 'wav', 'ogg'</p>\n",
        type: 'String',
        optional: true,
        multiple: true
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  saveSound: {
    name: 'saveSound',
    params: [
      {
        name: 'soundFile',
        description: '<p>p5.SoundFile that you wish to save</p>\n',
        type: 'p5.SoundFile'
      },
      {
        name: 'fileName',
        description: '<p>name of the resulting .wav file.</p>\n',
        type: 'String'
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  loadSound: {
    name: 'loadSound',
    params: [
      {
        name: 'path',
        description:
          "<p>Path to the sound file, or an array with\n                                  paths to soundfiles in multiple formats\n                                  i.e. ['sound.ogg', 'sound.mp3'].\n                                  Alternately, accepts an object: either\n                                  from the HTML5 File API, or a p5.File.</p>\n",
        type: 'String|Array'
      },
      {
        name: 'successCallback',
        description: '<p>Name of a function to call once file loads</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>Name of a function to call if there is\n                                    an error loading the file.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'whileLoading',
        description:
          '<p>Name of a function to call while file is loading.\n                               This function will receive the percentage loaded\n                               so far, from 0.0 to 1.0.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  createConvolver: {
    name: 'createConvolver',
    params: [
      {
        name: 'path',
        description: '<p>path to a sound file</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>function to call if loading is successful.\n                              The object will be passed in as the argument\n                              to the callback function.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to call if loading is not successful.\n                              A custom error will be passed in as the argument\n                              to the callback function.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  },
  setBPM: {
    name: 'setBPM',
    params: [
      {
        name: 'BPM',
        description: '<p>Beats Per Minute</p>\n',
        type: 'Number'
      },
      {
        name: 'rampTime',
        description: '<p>Seconds from now</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5',
    module: 'p5.sound'
  }
}
