const jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const isImage = require('is-image');

const source = './source/';
const destination = './resized/';

const sizes = [
    {
        'name': 'xl',
        'w': 1920,
        'h': 1280,
        'multiplier': 2
    },{
        'name': 'lg',
        'w': 1600,
        'h': 1067,
        'multiplier': 2
    },{
        'name': 'md',
        'w': 1200,
        'h': 800,
        'multiplier': 2
    },{
        'name': 'sm',
        'w': 1025,
        'h': 683,
        'multiplier': 2
    },{
        'name': 'xs',
        'w': 768,
        'h': 1000,
        'multiplier': 3
    },{
        'name': 'xxs',
        'w': 480,
        'h': 1000,
        'multiplier': 3
    }
];

fs.readdirSync(source).forEach(file => {

    let ext = path.extname(file);
    let name = path.basename(file, ext);
    let relPath = path.join(source, file);

    if (!isImage(relPath)) return;

    sizes.forEach( size => {
        for(let i = 1; i <= size.multiplier; i++) {
            jimp.read(relPath)
                .then(img => {
                    return img
                        .cover(size.w * i, size.h * i)
                        .quality(80)
                        .write(path.join(destination, name + '-' + size.name + '@' + i + 'x.jpg'))
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });
});
