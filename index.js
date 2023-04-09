const { createFilter } = require("@rollup/pluginutils");
const {readFileSync} = require("fs");
const { extname }  = require('path');

const mimeTypes = {
	
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.webp':  'image/webp',
	'.svg':  'image/svg+xml',
};


function base64(opts = {}) {
  if (!opts.include) {
    throw Error("include option must be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "base64",
    transform(data, id) {
      if (filter(id)) {
 			  const mime = mimeTypes[ extname( id ) ];
        const fileData = readFileSync(id);
          return  `export default "data:${mime};base64,${fileData.toString('base64')}";`
      }
    }
  };
}

exports.base64 = base64;
