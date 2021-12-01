# ♻️ Transformations

Our routing logic expects the transformation part to come right before the target image hostname. This part of the variation url will be translated -under the hood- to searchParams as expected by [images.weserv.nl API](https://images.weserv.nl/). 

e.g resize to 150x150

```html
https://img.ctohm.com/w=150_h=150/riff.one/images/designcue-unsplash.jpg`
```

<ShowCase>
<template v-slot:first_paragraph>
Except for the very first time they are requested (and inmediately cached), variations will answer from the edge at blazing speed, and will even survive for a few months if the original image is deleted. The image to the right doesn't exist but in Cloudflare's Cache.
</template>
<template v-slot:second_paragraph>The response headers will also hint the browser not to request this same asset for a year. While this isn't much of a feature, your browser will hopefully not need requesting it anytime soon and that will shave a couple of ms off.

</template>
<template v-slot:table>

 | w=150 h=150 |
|----------|
|![150x150](https://img.ctohm.com/w=150_h=150/riff.one/images/designcue-unsplash.jpg)

</template>
</ShowCase>

In this section we enumerate supported transformations such as resizing, optimizing, compression, changing format, cropping and changing hue. Other transformations can be passed directly as searchParams to the variation URL (not ideal, but :shrug:)

----------
## Available Transformations



### Width and Height


-    w: [Width](https://images.weserv.nl/docs/size.html#width),
-    h: [Height](https://images.weserv.nl/docs/size.html#height)
- dpr: [Device Pixel Ratio](https://images.weserv.nl/docs/size.html#device-pixel-ratio)

```html
https://img.ctohm.com/w=150_h=150/riff.one/images/dice.png
```

| dpr=2 w=200 l=0 | dpr=2 w=200 l=6 af | dpr=2 w=200 q=100   | dpr=2 w=200 q=5 il |
|----------|------|---------|  --  |
| png 481kB | png 102kB | jpg 148kB| jpg 3.8kB  |
|![original](https://img.ctohm.com/dpr=2_w=200_png_l=0/riff.one/images/dice.png) |![jpg](https://img.ctohm.com/dpr=4_w=200_png_l=6_af/riff.one/images/dice.png) |  ![af](https://img.ctohm.com/dpr=2_w=200_jpg_q=100/riff.one/images/designcue-unsplash.jpg)  |  ![webp](https://img.ctohm.com/dpr=2_w=200_jpg_q=5/riff.one/images/designcue-unsplash.jpg) |  



### Fit/Colorize/Sharpen

 - fit: [Fit](https://images.weserv.nl/docs/fit.html) (contain, cover, inside, outside, fill)
 - bg: [Background Color](https://images.weserv.nl/docs/adjustment.html#background) (eg  fit=contain&cbg=0f0)
 - cbg: Background Color for Fit=Contain (eg  fit=contain&cbg=0f0)
 - hue: [Hue Rotation (0 to 360) ](https://images.weserv.nl/docs/adjustment.html#hue-rotation)
 - sharp: [Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - n: [Number of Pages](https://images.weserv.nl/docs/format.html#number-of-pages) (is multipage images still a thing?)

| w=100 hue=160 | w=160 h=100 cbg=green |  w=150 h=100 fit=cover sharp=4  |
|----------|------|---------|  
|![original](https://img.ctohm.com/w=100_hue=160/riff.one/images/designcue-unsplash.jpg) |![fit and cbg](https://img.ctohm.com/w=160_h=100_cbg=green/riff.one/images/designcue-unsplash.jpg) |  ![fit and cbg](https://img.ctohm.com/w=150_h=100_fit=cover&sharp=4/riff.one/images/designcue-unsplash.jpg) |  

 ### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter) (only works on *png*)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level) (number between 0 and 9. Only works on *png*, default 6)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality) (only works on *jpg*, *tiff* and *webp*. number between 0 and 100, default 80)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)


| dpr=2 w=200 l=0 | dpr=2 w=200 l=6 af | dpr=2 w=200 q=100   | dpr=2 w=200 q=5 il |
|----------|------|---------|  --  |
| png 481kB | png 102kB | jpg 148kB| jpg 3.8kB  |
|![original](https://img.ctohm.com/dpr=2_w=200_png_l=0/riff.one/images/dice.png) |![jpg](https://img.ctohm.com/dpr=2_w=200_png_l=6_af/riff.one/images/dice.png) |  ![af](https://img.ctohm.com/dpr=2_w=200_jpg_q=100/riff.one/images/designcue-unsplash.jpg)  |  ![webp](https://img.ctohm.com/dpr=2_w=200_jpg_q=5/riff.one/images/designcue-unsplash.jpg) |  



### Output Format and naming

- output: [Output](https://images.weserv.nl/docs/format.html#output)
- filename: [Filename](https://images.weserv.nl/docs/format.html#filename)

```html
https://img.ctohm.com/w=150_output=gif/riff.one/images/designcue-unsplash.jpg
```

| Original (png) | JPEG |   GIF   | WEBP |
|----------|------|---------|  --  |
|![original](https://img.ctohm.com/w=150_png/riff.one/images/designcue-unsplash.jpg) |![jpg](https://img.ctohm.com/hue=90_w=150_jpg/riff.one/images/designcue-unsplash.jpg) |  ![gif](https://img.ctohm.com/hue=180_w=150_gif/riff.one/images/designcue-unsplash.jpg) |  ![webp](https://img.ctohm.com/hue=270_w=150_output=webp/riff.one/images/designcue-unsplash.jpg) |  


### Crop

[Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop) is achieved through 4 parameters

-  cw: 'Crop width',
-  cy: 'Crop y',
-  cx: 'Crop x',
-  ch: 'Crop height',

This one is tricky to get it right, but you can see an example on the story of [my use case](use_cases.md).

| original w=200 h=150 | w=200 h=150 | w=200 h=150 |  w=400 h=300  |
|----------|------|---------|  --  |
|  | cx=20 cy=20 fit=cover| cx=20 cy=20 ch=54 fit=cover| cx=82 cy=67 ch=137 cw=224 fit=cover|
|![original](https://img.ctohm.com/w=200_h=150/riff.one/images/printable_chart.png) |![jpg](https://img.ctohm.com/w=200_h=150_cx=20_cy=20_fit=cover/riff.one/images/printable_chart.png) |  ![af](https://img.ctohm.com/w=200_h=150_cx=20_cy=20_ch=54_fit=cover/riff.one/images/printable_chart.png)  |  ![webp](https://img.ctohm.com/w=400_h=300_cx=82_cy=67_ch=137_cw=224_fit=cover/riff.one/images/printable_chart.png) |  


--------------



## TODO

- [x] basic tests
- [ ] more tests
- [ ] deploy with workers
- [ ] enable using Edge-Resizer as a dependency
- [x] fix a handful of embarassing bugs after announcing what-i-built
- [ ] use vary to deliver WEBP, then AVIF to everyone except iOS
- [ ] figure out a way to receive device pixel ratio and deliver retina images
- [ ] other transformations
- [ ] get absorbed by Cloudflare
- [ ] don't get absorbed but have massive adoption
  - [ ] lots of issues 
  - [x] anxiety
  - [ ] abandon project