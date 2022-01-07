import{_ as p,r as a,c as d,e as t,w as r,b as e,a as n,o as c,d as o}from"./app.2733a36c.js";const O='{"title":"\u{1F503} Format Conversion","description":"","frontmatter":{},"headers":[{"level":3,"title":"Supported input formats","slug":"supported-input-formats"},{"level":3,"title":"Output","slug":"output"},{"level":3,"title":"Compression/Optimization","slug":"compression-optimization"}],"relativePath":"format.md","lastUpdated":1639962934391}',f={},u=n('<h1 id="\u{1F503}-format-conversion" tabindex="-1">\u{1F503} Format Conversion <a class="header-anchor" href="#\u{1F503}-format-conversion" aria-hidden="true">#</a></h1><h3 id="supported-input-formats" tabindex="-1">Supported input formats <a class="header-anchor" href="#supported-input-formats" aria-hidden="true">#</a></h3><p>As stated elsewhere, (but we can&#39;t stress it enough) Edge-Resizer delegates to <a href="https://images.weserv.nl/" target="_blank" rel="noopener noreferrer"><strong>images.weserv.nl</strong></a>&#39;s API, and because of that, we&#39;re able to read from <a href="https://github.com/weserv/images/issues/105#issuecomment-327497304" target="_blank" rel="noopener noreferrer">quite a few formats</a> including, but not limited to, JPG, PNG, AVIF, GIF, TIFF, PDF, SVG, ICO, WEBP.</p><p>The following formats can be safely read, but you cannot use them as output:</p><span class="gray"><table><thead><tr><th>ICO</th><th>PDF</th><th>HEIC</th><th>SVG</th><th>AVIF</th></tr></thead><tbody><tr><td><img src="https://resizer.pictures/w=150_page=2/riff.one/img/multi_res.ico" alt="ico"></td><td><img src="https://resizer.pictures/w=150_n=1/riff.one/img/sample_3pages.pdf" alt="pdf"></td><td><img src="https://resizer.pictures/w=150/riff.one/img/sample1.heic" alt="heig"></td><td><img src="https://resizer.pictures/w=128/resizer.pictures/favicon.svg" alt="svg"></td><td><img src="https://resizer.pictures/w=150/riff.one/img/fox.avif" alt="avif"></td></tr></tbody></table></span><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Conversion from SVG can yield unexpected results when referencing non-standard fonts and not embedding them.</p></div><h3 id="output" tabindex="-1">Output <a class="header-anchor" href="#output" aria-hidden="true">#</a></h3><p>(See <a href="https://images.weserv.nl/docs/format.html#output" target="_blank" rel="noopener noreferrer">\u{1F517} weserve&#39;s docs about output</a>)</p><p>Using the <code>output</code> parameter, you can have the outcome transformed to <code>jpg</code>, <code>png</code>, <code>gif</code>, and <code>webp</code> formats. <code>tiff</code> format is also supported, but it can&#39;t be displayed inline. <a href="https://resizer.pictures/tiff/riff.one/images/designcue-unsplash.jpg" target="_blank" rel="noopener noreferrer">click to download the tiff output</a></p><p>When not specified, it defaults to the input format as long as it&#39;s among the former. Other formats that are valid inputs will gracefully fallback to supported output formats (mostly png and jpg tbh)</p>',10),m=e("div",{class:"info custom-block"},[e("p",{class:"custom-block-title"},'The "filename" parameter'),e("p",null,[o("Though we don't support the "),e("a",{href:"https://images.weserv.nl/docs/format.html#filename",target:"_blank",rel:"noopener noreferrer"},"filename"),o(` parameter (you still can pass it as query param) we send the proper header so that "save as" on a given file offers its name instead of a generic "image.png". The extension is taken from the content type so it's consistent across format conversions.`)])],-1),h=n('<h3 id="compression-optimization" tabindex="-1">Compression/Optimization <a class="header-anchor" href="#compression-optimization" aria-hidden="true">#</a></h3><ul><li>af: <a href="https://images.weserv.nl/docs/format.html#adaptive-filter" target="_blank" rel="noopener noreferrer">Adaptative Filter</a> (only works on <em>png</em>)</li><li>l: <a href="https://images.weserv.nl/docs/format.html#compression-level" target="_blank" rel="noopener noreferrer">Compression Level</a> (number between 0 and 9. Only works on <em>png</em>, default 6)</li><li>q: <a href="https://images.weserv.nl/docs/format.html#quality" target="_blank" rel="noopener noreferrer">Quality</a> (only works on <em>jpg</em>, <em>tiff</em> and <em>webp</em>. number between 0 and 100, default 80)</li><li>il: <a href="https://images.weserv.nl/docs/format.html#interlace-progressive" target="_blank" rel="noopener noreferrer">Interlaced/Progressive</a></li></ul>',2),_=e("thead",null,[e("tr",null,[e("th",null,"png"),e("th",null,"jpg"),e("th",null,"webp")])],-1),g=o("w=400 l=0 "),w=e("strong",null,"481kB",-1),b=o("w=400 q=100 "),v=e("strong",null,"147kB",-1),k=o("webp w=400 q=100 "),y=e("strong",null,"60kB",-1),T=o("w=400 l=6 af "),C=e("strong",null,"102kB",-1),x=o("w=400 q=10 "),I=e("strong",null,"22kB",-1),z=o("webp w=400 q=10 "),S=e("strong",null,"5.2kB",-1);function V(j,q,A,P,B,F){const i=a("output-formats"),l=a("er-feature"),s=a("image-transform");return c(),d("div",null,[u,t(i,{"only-formats":["jpg","png","gif","webp"],image:"https://riff.one/images/designcue-unsplash.jpg"}),t(l,{class:"info-block"},{default:r(()=>[m]),_:1}),h,e("table",null,[_,e("tbody",null,[e("tr",null,[e("td",null,[t(s,{image:"riff.one/dice.png",transform:"w=400_l=0"},{default:r(()=>[g,w]),_:1})]),e("td",null,[t(s,{image:"riff.one/designcue-unsplash.jpg",transform:"w=400_q=100"},{default:r(()=>[b,v]),_:1})]),e("td",null,[t(s,{image:"riff.one/designcue-unsplash.jpg",transform:"cx=700_cy=500_precrop_w=400_h=300_fill_q=100_webp_flop_hue=260"},{default:r(()=>[k,y]),_:1})])]),e("tr",null,[e("td",null,[t(s,{image:"riff.one/dice.png",transform:"w=400_l=6_af"},{default:r(()=>[T,C]),_:1})]),e("td",null,[t(s,{image:"riff.one/designcue-unsplash.jpg",transform:"w=400 q=10"},{default:r(()=>[x,I]),_:1})]),e("td",null,[t(s,{image:"riff.one/designcue-unsplash.jpg",transform:"cx=700_cy=500_precrop_w=400_h=300_fill_q=10_webp_flop_hue=260"},{default:r(()=>[z,S]),_:1})])])])])])}var G=p(f,[["render",V]]);export{O as __pageData,G as default};
