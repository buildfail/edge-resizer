import{_ as o,r as i,c as n,e as s,w as a,b as e,d as t,a as h,o as c}from"./app.2733a36c.js";const V='{"title":"\u26F3 Use Cases","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u26F3 Use Cases","slug":"\u26F3-use-cases"},{"level":3,"title":"Stripping the searchParams","slug":"stripping-the-searchparams"},{"level":2,"title":"Worker and image in the same host","slug":"worker-and-image-in-the-same-host"}],"relativePath":"use_cases.md","lastUpdated":1639962934403}',p={},l=e("h2",{id:"\u26F3-use-cases",tabindex:"-1"},[t("\u26F3 Use Cases "),e("a",{class:"header-anchor",href:"#\u26F3-use-cases","aria-hidden":"true"},"#")],-1),u=e("h3",{id:"stripping-the-searchparams",tabindex:"-1"},[t("Stripping the searchParams "),e("a",{class:"header-anchor",href:"#stripping-the-searchparams","aria-hidden":"true"},"#")],-1),d=e("p",null,": this worker is all about tidy URLs. There was a particular situation for which having clean urls was crucial.",-1),m=e("p",null,[t("So... "),e("strong",null,"Story time")],-1),g=e("blockquote",null,[e("p",null,"It turns out I had a mobile app in whose banner Google Play and App Store were promoted, side to side.")],-1),_=e("code",null,"https://resizer.pictures/_/riff.one/images/banner_lysto.png",-1),f=e("p",null,[t("It turns out this was an "),e("em",null,"unforgivable sin"),t(", for which the app was stopped from publishing further updates.")],-1),w=e("hr",null,null,-1),b=e("p",null,"Technically, it should have been as easy as modifying all banners using query string parameters. Don't you think?",-1),k=e("code",null,"https://resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250",-1),y=e("p",null,"But we were dealing with an automated image verification system, which outright dismissed the searchstring altogether.",-1),v=e("p",null,"By implementing our current routing logic that encodes the query parameters as part of the pathname, we achieved an output with a clean URL that the robot found to be fully compliant.",-1),z=e("code",null,"https://resizer.pictures/ch=250/riff.one/images/banner_lysto.png",-1),q=h('',20);function x(T,S,I,U,C,N){const r=i("labeled-image");return c(),n("div",null,[l,u,d,m,g,s(r,{src:"https://resizer.pictures/_/riff.one/images/banner_lysto.png"},{default:a(()=>[_]),_:1}),f,w,b,s(r,{src:"https://resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250"},{default:a(()=>[k]),_:1}),y,v,s(r,{src:"https://resizer.pictures/ch=250/riff.one/images/banner_lysto.png"},{default:a(()=>[z]),_:1}),q])}var B=o(p,[["render",x]]);export{V as __pageData,B as default};
