import{_ as c,r as n,c as i,b as a,d as e,t as l,e as t,w as s,a as d,o as h}from"./app.2733a36c.js";const E='{"title":"\u{1F680} Caching","description":"","frontmatter":{"title":"\u{1F680} Caching","editLink":true},"headers":[{"level":3,"title":"Canonicalizing Transformations","slug":"canonicalizing-transformations"},{"level":2,"title":"Cache Busting","slug":"cache-busting"}],"relativePath":"caching.md","lastUpdated":1640742604642}',u={},g={id:"frontmatter-title",tabindex:"-1"},m=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),f=a("hr",null,null,-1),_=a("br",null,null,-1),k=e(" Variations are generated on demand, at which point they are stored in Cloudflare's Edge Cache. "),b=a("b",null,"Ephemeral but long lived",-1),v=e(", further requests will receive a cached response at blazing speed. "),w=e("Above caching logic does Populating the edge cache this way "),z=e("w=150_h=150"),T=d(`__VP_STATIC_START__<h3 id="canonicalizing-transformations" tabindex="-1">Canonicalizing Transformations <a class="header-anchor" href="#canonicalizing-transformations" aria-hidden="true">#</a></h3><p>The order of the search parameters doesn&#39;t affect the final outcome. However, the stringified version of the URL would be different, creating two cache entries for the same image variation. To prevent this situation, the internal routing logic of Edge Resizer figures it out so you don&#39;t have to.</p><p>The next two URLs are equivalent</p><div class="language-erlang"><pre><code><span class="token atom">https</span><span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token atom">resizer</span><span class="token punctuation">.</span><span class="token atom">pictures</span><span class="token operator">/</span><span class="token atom">il_w</span><span class="token operator">=</span><span class="token number">150</span><span class="token variable">_h</span><span class="token operator">=</span><span class="token number">150</span><span class="token operator">/</span><span class="token atom">riff</span><span class="token punctuation">.</span><span class="token atom">one</span><span class="token operator">/</span><span class="token atom">images</span><span class="token operator">/</span><span class="token atom">designcue</span><span class="token operator">-</span><span class="token atom">unsplash</span><span class="token punctuation">.</span><span class="token atom">jpg</span>

<span class="token atom">https</span><span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token atom">resizer</span><span class="token punctuation">.</span><span class="token atom">pictures</span><span class="token operator">/</span><span class="token atom">h</span><span class="token operator">=</span><span class="token number">150</span><span class="token variable">_il_w</span><span class="token operator">=</span><span class="token number">150</span><span class="token operator">/</span><span class="token atom">riff</span><span class="token punctuation">.</span><span class="token atom">one</span><span class="token operator">/</span><span class="token atom">images</span><span class="token operator">/</span><span class="token atom">designcue</span><span class="token operator">-</span><span class="token atom">unsplash</span><span class="token punctuation">.</span><span class="token atom">jpg</span>

</code></pre></div><p>Regarding parameters that are provided as shortcuts for others, as in the case of <code>png</code> as a shortcut for <code>output=png</code>, canonicalization resolves those shortcuts before computing the cached entry. The next two URLs are equivalent</p><div class="language-html"><pre><code>https://resizer.pictures/output=png/riff.one/images/designcue-unsplash.jpg

https://resizer.pictures/png/riff.one/images/designcue-unsplash.jpg

</code></pre></div><p>In cases where the original image is transformed according to feature detections (as in the case of <code>webp</code> format in <code>auto</code> mode ), detected feature is merged into the canonical URL before caching. If you&#39;re using a browser with webp support, the following URLs are equivalent:</p><div class="language-html"><pre><code>https://resizer.pictures/output=auto/riff.one/images/dice.png

https://resizer.pictures/auto/riff.one/images/dice.png

https://resizer.pictures/webp/riff.one/images/dice.png

// any of the above is translated to
https://resizer.pictures/output=webp/riff.one/images/dice.png

</code></pre></div><h2 id="cache-busting" tabindex="-1">Cache Busting <a class="header-anchor" href="#cache-busting" aria-hidden="true">#</a></h2><p>TBD. For now, you can play with the <code>MAX_AGE</code> environment variable (affects the weserve request) and passing searchParam <code>nocache=1</code>. Setting <code>MAX_AGE = &#39;1d&#39;</code> and <code>nocache=1</code> isn&#39;t really real-time, but it&#39;s something.</p><p>BTW, errored responses aren&#39;t cached, so that scenario is already taken care of.</p>__VP_STATIC_END__`,11);function C(o,y,x,A,R,S){const r=n("labeled-image"),p=n("ShowCase");return h(),i("div",null,[a("h1",g,[e(l(o.$frontmatter.title)+" ",1),m]),f,t(p,null,{first_paragraph:s(()=>[_,k,b,v]),second_paragraph:s(()=>[w]),table:s(()=>[t(r,{src:"https://resizer.pictures/w=150_h=150/riff.one/images/designcue-unsplash.jpg"},{default:s(()=>[z]),_:1})]),_:1}),T])}var V=c(u,[["render",C]]);export{E as __pageData,V as default};
